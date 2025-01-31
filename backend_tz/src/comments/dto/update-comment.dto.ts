import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentDto {

    @ApiProperty({example: 1, description: 'Уникальный индентификатор пользователя', required: false})
    @IsString()
    @IsOptional()
    user_id?: number;

    @ApiProperty({example: 1, description: 'Уникальный индентификатор карточки', required: false})
    @IsString()
    @IsOptional()
    card_id?: number;

    @ApiProperty({example: "example text", description: 'текст карточки', required: false})
    @IsString()
    @IsOptional()
    text?: string;
}

