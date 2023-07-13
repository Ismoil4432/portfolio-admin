import { Injectable } from '@nestjs/common';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { UpdateWorkplaceDto } from './dto/update-workplace.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Workplace } from './models/workplace.model';


@Injectable()
export class WorkplaceService {
  constructor(@InjectModel(Workplace) private workPlaceRepo: typeof Workplace){}

  create(createWorkplaceDto: CreateWorkplaceDto) {
    return this.workPlaceRepo.create(createWorkplaceDto);
  }

  async findAll() {
    return await this.workPlaceRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.workPlaceRepo.findOne({where: {id}});
  }

  async update(id: number, updateWorkplaceDto: UpdateWorkplaceDto) {
    return await this.workPlaceRepo.update(updateWorkplaceDto, {
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.workPlaceRepo.destroy({where: {id}});
  }
}
