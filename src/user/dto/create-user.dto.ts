import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, MinLength, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly full_name: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsEmail()
    readonly email: string;
       
    @IsStrongPassword()
    @MinLength(7, {})
    readonly password: string;
}
