import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { VisitorsEntity } from './entities/visitors.entity';
import { VisitorsFormDto } from './dtos/visitors_form.dto';
import  Mailjet from 'node-mailjet';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(VisitorsEntity)
    private visitorsRepository: Repository<VisitorsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async visitorsForm(options: VisitorsFormDto) {
    const newVisitor = this.visitorsRepository.create({
      visitors_name: options.visitors_name,
      visitors_address: options.visitors_address,
      whom_to_see: options.whom_to_see,
      any_appointment: options.any_appointment,
      type_of_visit: options.type_of_visit,
      purpose_of_visit: options.purpose_of_visit,
      are_you_coming_back: options.are_you_coming_back,
      return_date: options.return_date,
    });

    await this.visitorsRepository.save(newVisitor);

    // Check if staff exists
    const staffExists = await this.userRepository
      .createQueryBuilder('user')
      .where('user.first_name ILIKE :name', { name: `%${options.whom_to_see}%` })
      .orWhere('user.last_name ILIKE :name', { name: `%${options.whom_to_see}%` })
      .orWhere("CONCAT(user.first_name, ' ', user.last_name) ILIKE :name", {
        name: `%${options.whom_to_see}%`,
      })
      .getOne();

    if (!staffExists) {
      throw new NotFoundException('Staff does not exist');
    }

    const staffEmail = staffExists.email;
    const subject = `New Visitor Form Submission: ${newVisitor.visitors_name}`;
    const emailText = `
      A new visitor has submitted their form:
      Name: ${newVisitor.visitors_name}
      Address: ${newVisitor.visitors_address}
      Whom to see: ${newVisitor.whom_to_see}
      Appointment: ${newVisitor.any_appointment ? 'Yes' : 'No'}
      Type of visit: ${newVisitor.type_of_visit}
      Purpose: ${newVisitor.purpose_of_visit}
      Returning: ${newVisitor.are_you_coming_back ? 'Yes' : 'No'}
      Return date: ${newVisitor.return_date ? newVisitor.return_date : 'N/A'}
    `;

    // Initialize Mailjet API connection
    const mailjet = Mailjet.apiConnect(
      '1f15edd57f7f6643de3967db22315809',
      '77fd0778dba7c1ef5238765064ea5df1'
    );

    // Send email
    await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'chisom.okafor@ibileholdings.com', // Replace with verified sender email
              Name: 'Front Desk',
            },
            To: [
              {
                Email: staffEmail,
                Name: options.whom_to_see,
              },
            ],
            Subject: subject,
            TextPart: emailText,
            HTMLPart: `<p>${emailText.replace(/\n/g, '<br>')}</p>`, // Convert line breaks to <br> for HTML format
            CustomCampaign: 'SendAPI_campaign',
            DeduplicateCampaign: true,
          },
        ],
      });

    return {
      message: 'Email sent successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
