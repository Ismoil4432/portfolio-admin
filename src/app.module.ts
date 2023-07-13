import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SkillsModule } from './skills/skills.module';
import { EducationModule } from './education/education.module';
import { WorkplaceModule } from './workplace/workplace.module';
import { AbouteMeModule } from './aboute_me/aboute_me.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbouteMe } from './aboute_me/model/aboute_me.model';
import { Admin } from './admin/models/admin.model';
import { Blog } from './blog/mdels/blog.model';
import { Comment } from './comment/models/comment.model';
import { Education } from './education/models/education.model';
import { Project } from './project/models/project.model';
import { Skill } from './skills/models/skill.model';
import { User } from './user/models/user.model';
import { Workplace } from './workplace/models/workplace.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        AbouteMe,
        Admin,
        Blog,
        Comment,
        Education,
        Project,
        Skill,
        User,
        Workplace,
      ],
      autoLoadModels: true,
      logging: false,
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    UserModule,
    SkillsModule,
    AdminModule,
    EducationModule,
    WorkplaceModule,
    AbouteMeModule,
    ProjectModule,
    CommentModule,
    BlogModule,
    JwtModule,
  ],
  providers: [],
  exports: [JwtModule],
})
export class AppModule {}
