import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from './models/skill.model';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill) private skillRepo: typeof Skill){}

  create(createSkillDto: CreateSkillDto) {
    return this.skillRepo.create(createSkillDto);
  }

  async findAll() {
    return await this.skillRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.skillRepo.findOne({where: {id}});
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    return await this.skillRepo.update(updateSkillDto, {
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.skillRepo.destroy({where: {id}});
  }
}
