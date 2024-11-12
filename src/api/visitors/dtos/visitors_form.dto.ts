import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ComingBack, TypeOfVisit } from '../entities/visitors.entity';

export class VisitorsFormDto {
  @IsNotEmpty()
  @IsString()
  visitors_name: string;

  @IsNotEmpty()
  @IsString()
  visitors_address: string;

  @IsNotEmpty()
  @IsString()
  whom_to_see: string;

  @IsNotEmpty()
  @IsBoolean()
  any_appointment: boolean;

  @IsEnum(TypeOfVisit)
  type_of_visit: TypeOfVisit;

  @IsString()
  purpose_of_visit: string;

  @IsEnum(ComingBack)
  are_you_coming_back: ComingBack;

  @IsDate()
  @IsOptional()
  return_date: Date;
}