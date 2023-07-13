import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from './models/education.model';

@Module({
  imports: [SequelizeModule.forFeature([Education])],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {}
