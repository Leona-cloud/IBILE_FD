import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { VisitorsService } from './visitors.services';
import { VisitorsFormDto } from './dtos/visitors_form.dto';

@Controller('visitors-form')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  async visitorsForm(@Body(ValidationPipe) visitorsFormDto: VisitorsFormDto) {
    return this.visitorsService.visitorsForm(visitorsFormDto);
  }
}
