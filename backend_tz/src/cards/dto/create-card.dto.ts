import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateCardDto {

    @ApiProperty({example: "Title", description: 'Название карточки'})
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({example: "Description", description: 'Описание карточки'})
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({example: 1, description: 'Порядок карточки'})
    @IsInt()
    @IsNotEmpty()
    readonly order?: number;
}