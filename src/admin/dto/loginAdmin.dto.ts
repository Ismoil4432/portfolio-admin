import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class LoginAdminDto {
    @IsEmail()
    email: string;

    // @IsStrongPassword()
    // @MinLength(7, {})
    password: string;
}
