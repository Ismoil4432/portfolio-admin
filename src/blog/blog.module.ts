import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './mdels/blog.model';
import { User } from '../user/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Blog, User])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
