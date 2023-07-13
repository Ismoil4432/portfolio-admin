import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './models/education.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class EducationService {
  constructor(@InjectModel(Education) private educationRepo: typeof Education){}

  create(createEducationDto: CreateEducationDto) {
    return this.educationRepo.create(createEducationDto);
  }

  async findAll() {
    return await this.educationRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.educationRepo.findOne({where: {id}});
  }

  update(id: number, updateEducationDto: UpdateEducationDto) {
    return `This action updates a #${id} education`;
  }

  async remove(id: number) {
    return await this.educationRepo.destroy({where: {id}});
  }
}
