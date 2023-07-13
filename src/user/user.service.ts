import { Injectable, BadRequestException, UnauthorizedException, ForbiddenException, HttpException, HttpStatus  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService) {};
  
  async registration(createUserDto: CreateUserDto) {
    const email = await this.userRepo.findOne({ where: { email: createUserDto.email }});
    if (email) {
      throw new BadRequestException('Email already exists!');
    };
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({...createUserDto, hashed_password: hashed_password});
    const token = await this.getTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(token.token, 7);
    
    const updatedUser = await this.userRepo.update(
      {hashed_password: hashed_refresh_token},
      {where: { id: newUser.id }, returning: true}
    );
    const response = {message: 'User registred', user: updatedUser[1][0], token};
    return response;
  };

  async getTokens(user: User) {
    const jwtPayload = {id: user.id, email: user.email};
    const [token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      })
    ]);
    const refreshToken = await this.generateRefreshToken()
    return {token: refreshToken};
  };

  async generateRefreshToken() {
    const uuid = uuidv4();
    const refreshToken = uuid;
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    return hashedRefreshToken;
  }

  async login(loginUserDto: LoginUserDto){
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if(!user){
      throw new UnauthorizedException('User not registred');
    };
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if(!isMatchPass){
      throw new UnauthorizedException('User not registred(pass)');
    }
    const tokens = await this.getTokens(user);
    const response = {
      message: 'User logged in',
      tokens,
    };
    return response;
  };

  async logout(refreshToken: string){
    const userData  = await this.jwtService.verify(refreshToken,{
      secret: process.env.SECRET_KEY
    });
    if(!userData){
      throw new ForbiddenException('User not found');
    };
    const updatedUser = await this.userRepo.update(
      {hashed_password: null},
      {where: {id: userData.id}, returning: true},
    );
    const response = {
      message: 'User logged out successfully',
    };
    return response;
  };  

  async findAll() {
    const userAll = await this.userRepo.findAll({include: {all: true}});
    if(!userAll){
      throw new HttpException('No users list available', HttpStatus.NOT_FOUND)
    }
    return userAll;
  }

  async findOne(id: number) {
    const userOne = await this.userRepo.findOne({where: {id}});
    if(!userOne){
      throw new HttpException('The user does not exist in the list', HttpStatus.NOT_FOUND)
    }
    return userOne;
  }

  async remove(id: number) {
    const deleteCustomer =  await this.userRepo.destroy({where: {id}});
    if(!deleteCustomer){
      throw new HttpException('The user does not exist in the list', HttpStatus.NOT_FOUND)
    };
    return deleteCustomer;
  }
}
