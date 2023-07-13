import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';


@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commentRepo: typeof Comment){}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepo.create(createCommentDto);
  }

  async findAll() {
    return await this.commentRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.commentRepo.findOne({where: {id}});
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepo.update(updateCommentDto, {
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.commentRepo.destroy({where: {id}});
  }
}
