import { Injectable, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginAdminDto } from './dto/loginAdmin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin, private readonly jwtService: JwtService ){}
  
  async registration(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepo.findOne({
      where: {email: createAdminDto.email}
    })    
    if(admin) {
      throw new BadRequestException('Email already used!');
    }
    
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newUser = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password
    })

    const tokens = await this.generateToken(newUser)
   
    return {tokens}; 
  }

  private async generateToken(user: Admin){
    const jwtPayload = { id: user.id };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      })
    ]);
    return {access_token: accessToken}
  };

  async signin(loginAdminDto: LoginAdminDto) {
    const {email, password} = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: {email}});
    if(!admin) {
      throw new BadRequestException('admin not found!!');
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password)
    console.log(admin.hashed_password);
    // console.log(isMatchPass);
    
    if(!isMatchPass) {
      throw new BadRequestException('admin not registered(pass)!!');
    }

    const tokens = await this.generateToken(admin)

    return {tokens}
  } 

  async logout(admin: Admin) {
    const updatedAdmin = await this.adminRepo.update(
      { hashed_password: null },
      { where: { id: admin.id }, returning: true },
    );
    return {
      message: 'Admin logged out successfully',
      user: updatedAdmin[1][0],
    };
  }
  
  async findAll() {
    const allAdmin = await this.adminRepo.findAll({include: {all:true}});
    if(!allAdmin){
      throw new HttpException('No general information found', HttpStatus.NOT_FOUND)
    };
    return allAdmin;
  }

  async findOne(id: number) {
    const oneAdmin = await this.adminRepo.findOne({where: {id}, include:{all:true}});
    if(!oneAdmin){
      throw new HttpException('Admin information not found', HttpStatus.NOT_FOUND)
    };
    return oneAdmin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updateAdmin = await this.adminRepo.update(updateAdminDto, {where: {id: id}, returning: true});
    if(!updateAdmin){
      throw new HttpException('Admin information not found', HttpStatus.NOT_FOUND)
    };
    return updateAdmin;
  }

  async remove(id: number) {
    const deleteAdmin = await this.adminRepo.destroy({where: {id: id}});
    if(!deleteAdmin){
      throw new HttpException('Admin information not found', HttpStatus.NOT_FOUND)
    };
    return deleteAdmin;
  }
}
