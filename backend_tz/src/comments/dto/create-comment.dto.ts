import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({example: "example text", description: 'Текст комментария'})
    @IsString()
    @IsNotEmpty()
    text: string;
}
