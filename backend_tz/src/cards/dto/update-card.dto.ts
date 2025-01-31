import { ApiProperty, PartialType} from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto{

    @ApiProperty({example: 1, description: 'Уникальный индентификатор колонки', required: false})
    @IsInt()
    @IsNotEmpty()
    column_id: number;

    @ApiProperty({example: 'Title', description: 'Название карточки', required: false})
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({example: 'Description', description: 'Описание карточки', required: false})
    @IsString() 
    @IsOptional()
    description?: string;

    @ApiProperty({example: 1, description: 'Порядок карточки', required: false})
    @IsInt()
    @IsOptional()
    order?: number;
}
