import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';


export class CreateUserDto{

    @ApiProperty({example: 'email@mail.ru', description: 'Почтовый адрес'})
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;
    

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsString() 
    @IsNotEmpty()
    @Length(4, 16, { message: 'length not less than 4 and not more than 16'})
    readonly password: string;
}