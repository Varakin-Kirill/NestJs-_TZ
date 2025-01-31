import { ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateColumnDto {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор пользователя', required: false})
    @IsString()
    @IsOptional()
    user_id: number;

    @ApiProperty({example: 'Title', description: 'название колонки', required: false})
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({example: 1, description: 'порядок колонки', required: false})
    @IsInt()
    @IsOptional()
    order?: number;
}
