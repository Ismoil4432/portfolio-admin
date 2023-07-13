import { Module } from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import { WorkplaceController } from './workplace.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Workplace } from './models/workplace.model';

@Module({
  imports: [SequelizeModule.forFeature([Workplace])],
  controllers: [WorkplaceController],
  providers: [WorkplaceService]
})
export class WorkplaceModule {}
