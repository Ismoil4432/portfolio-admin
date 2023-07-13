import { Injectable } from '@nestjs/common';
import { CreateAbouteMeDto } from './dto/create-aboute_me.dto';
import { UpdateAbouteMeDto } from './dto/update-aboute_me.dto';
import { AbouteMe } from './model/aboute_me.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class AbouteMeService {
  constructor(@InjectModel(AbouteMe) private aboutMeRepo: typeof AbouteMe){}

  create(createAbouteMeDto: CreateAbouteMeDto) {
    return this.aboutMeRepo.create(createAbouteMeDto);
  }

  async findAll() {
    return await this.aboutMeRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.aboutMeRepo.findOne({where: {id}});
  }

  async update(id: number, updateAbouteMeDto: UpdateAbouteMeDto) {
    return await this.aboutMeRepo.update(updateAbouteMeDto, {
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.aboutMeRepo.destroy({where: {id}});

  }
}
