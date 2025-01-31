import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, Length, IsEmail, IsOptional } from 'class-validator';


export class UpdateUserDto{

    @ApiProperty({example: 'email@mail.ru', description: 'Почтовый адрес',  required: false})
    @IsString()
    @IsOptional()
    @IsEmail({}, {message: "Incorrect email"})
    email?: string;

    @ApiProperty({example: '12345678', description: 'Пароль', required: false})
    @IsString() 
    @IsOptional()
    @Length(4, 16, { message: 'length not less than 4 and not more than 16'})
    password?: string;
}
