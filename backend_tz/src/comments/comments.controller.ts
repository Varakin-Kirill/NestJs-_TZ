import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { commentsOwnership } from 'src/auth/comments.ownership.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Comment } from './comments.model';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {

    constructor(private commentService: CommentsService){}

    @ApiOperation({ summary: 'Создание комментария' })
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard, commentsOwnership)
    @Post()
    @UsePipes(ValidationPipe)
    createComment(@Param('userId') user_id: number, @Param('columnId') column_id: number,@Param('cardId') card_id: number,  @Body() CreateCommentDto: CreateCommentDto) {
        return this.commentService.createComment(user_id, card_id, CreateCommentDto);
    }

    @ApiOperation({ summary: 'Получение комментария по id' })
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getcooment(@Param('userId') user_id: number, @Param('columnId') column_id: number, @Param('cardId') card_id: number, @Param('id') comment_id: number) {
        return this.commentService.getComment(user_id, card_id, comment_id);
    }

    @ApiOperation({ summary: 'Получение всех комментарив карточки' })
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard)
    @Get('')
    getComment(@Param('userId') user_id: number, @Param('columnId') column_id: number, @Param('cardId') card_id: number) {
        return this.commentService.getComments(user_id, card_id);
    }

    @ApiOperation({ summary: 'Обновление комментария по ID'})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(JwtAuthGuard, commentsOwnership)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateColumn(@Param('userId') user_id: number, @Param('columnId') column_id: number, @Param('cardId') card_id: number, @Param('id') comment_id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.updateComment(user_id, card_id, comment_id, updateCommentDto );
    }
    
    @ApiOperation({ summary: 'Удаление пользователя по ID' })
    @ApiResponse({
        status: 200,
        schema: {
            example: { message: 'Column successfully deleted and order updated' },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteComment(@Param('userId') user_id: number, @Param('columnId') column_id: number, @Param('cardId') card_id: number, @Param('id') comment_id: number) {
        return this.commentService.deleteComment(user_id, card_id, comment_id);
    }
}
