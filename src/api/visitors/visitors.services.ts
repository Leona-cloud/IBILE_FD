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
import { EmailService } from '../email/email.service';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(VisitorsEntity)
    private visitorsRepository: Repository<VisitorsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
  ) {}

  async visitorsForm(options: VisitorsFormDto) {
    try {
      const newVisitor = this.visitorsRepository.create({
        visitors_name: options.visitors_name,
        visitors_address: options.visitors_address,
        whom_to_see: options.whom_to_see,
        any_appointment: options.any_appointment,
        type_of_visit: options.type_of_visit,
        purpose_of_visit: options.purpose_of_visit,
      });

      await this.visitorsRepository.save(newVisitor);

      const staffExists = await this.userRepository
        .createQueryBuilder('user')
        .where('user.first_name ILIKE :name', {
          name: `%${options.whom_to_see}%`,
        })
        .orWhere('user.last_name ILIKE :name', {
          name: `%${options.whom_to_see}%`,
        })
        .orWhere("CONCAT(user.first_name, ' ', user.last_name) ILIKE :name", {
          name: `%${options.whom_to_see}%`,
        })
        .orWhere("CONCAT(user.last_name, ' ', user.first_name) ILIKE :name", {
          name: `%${options.whom_to_see}%`,
        })
        .getOne();

      console.log(staffExists.email);

      if (!staffExists) {
        throw new NotFoundException('Staff does not exist');
      }

      console.log(options, 'visitors option');

      const subject = `Visitor ${options.purpose_of_visit}`;
      const textContent = `Hello ${options.whom_to_see}, You have a visitor.`;
      const htmlContent = `
        <p>Hello,</p>
        <p>A new visitor has been recorded. Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${newVisitor.visitors_name}</li>
          <li><strong>Address:</strong> ${newVisitor.visitors_address}</li>
          <li><strong>Whom to See:</strong> ${newVisitor.whom_to_see}</li>
          <li><strong>Any Appointment:</strong> ${
            newVisitor.any_appointment ? 'Yes' : 'No'
          }</li>
          <li><strong>Type of Visit:</strong> ${newVisitor.type_of_visit}</li>
          <li><strong>Purpose of Visit:</strong> ${newVisitor.purpose_of_visit}</li>
        </ul>
        <p>Best regards,<br />IBILE FrontDesk</p>
        `;

      await this.emailService.sendMail(
        staffExists.email,
        subject,
        textContent,
        htmlContent,
      );

      return {
        message: 'Email sent successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
