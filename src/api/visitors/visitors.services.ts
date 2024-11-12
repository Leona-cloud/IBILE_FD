import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { VisitorsEntity } from './entities/visitors.entity';
import { VisitorsFormDto } from './dtos/visitors_form.dto';
import { response } from 'express';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(VisitorsEntity)
    private visitorsRepository: Repository<VisitorsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async visitorsForm(options: VisitorsFormDto) {
    const newVisitor = await this.visitorsRepository.create({
      visitors_name: options.visitors_name,
      visitors_address: options.visitors_address,
      whom_to_see: options.whom_to_see,
      any_appointment: options.any_appointment,
      type_of_visit: options.type_of_visit,
      purpose_of_visit: options.purpose_of_visit,
      are_you_coming_back: options.are_you_coming_back,
      return_date: options.return_date,
    });

    // await this.visitorsRepository.save(newVisitor)

    // check if staff exists
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
      .getOne();

      if(!staffExists){
        throw new NotFoundException('Staff does not exist')
      }

    return {
      message: 'Email sent successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
