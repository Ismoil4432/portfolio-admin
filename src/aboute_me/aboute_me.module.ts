import { Module } from '@nestjs/common';
import { AbouteMeService } from './aboute_me.service';
import { AbouteMeController } from './aboute_me.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbouteMe } from './model/aboute_me.model';

@Module({
  imports: [SequelizeModule.forFeature([AbouteMe])],
  controllers: [AbouteMeController],
  providers: [AbouteMeService]
})
export class AbouteMeModule {}
