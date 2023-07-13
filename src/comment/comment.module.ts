import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { User } from '../user/models/user.model';
import { Blog } from '../blog/mdels/blog.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment, User, Blog])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
