import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './mdels/blog.model';


@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog) private blogRepo: typeof Blog){}

  create(createBlogDto: CreateBlogDto) {
    return this.blogRepo.create(createBlogDto);
  }

  async findAll() {
    return await this.blogRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.blogRepo.findOne({where: {id}});
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.blogRepo.update(updateBlogDto,{
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.blogRepo.destroy({where: {id}});
  }
}
