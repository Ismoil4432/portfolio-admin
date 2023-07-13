import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './models/project.model';


@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project) private projectRepo: typeof Project){}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepo.create(createProjectDto);
  }

  async findAll() {
    return await this.projectRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.projectRepo.findOne({where: {id}});
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepo.update(updateProjectDto, {
      where:{id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.projectRepo.destroy({where: {id}});
  }
}
