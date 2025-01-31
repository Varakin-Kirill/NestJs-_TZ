import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
    @ApiProperty({example: 'Title', description: 'название колонки'})
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({example: 1, description: 'порядок колонки'})
    @IsInt()
    @IsNotEmpty()
    readonly order?: number;

}
