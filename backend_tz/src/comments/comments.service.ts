import {
    Injectable,
    HttpStatus,
    HttpException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/sequelize';
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { UpdateCommentDto } from './dto/update-comment.dto';
  import { Comment } from 'src/comments/comments.model';
  
  @Injectable()
  export class CommentsService {
    constructor(
      @InjectModel(Comment) private readonly commentRepository: typeof Comment,
    ) {}
  
    async createComment(
      user_id: number,
      card_id: number,
      createCommentDto: CreateCommentDto,
    ) {
  
      const comment = await this.commentRepository.create({
        ...createCommentDto,
        card_id,
        user_id,
      });
  
      return comment;
    }
  
    async getComment(
      user_id: number,
      card_id: number,
      comment_id: number
    ) {
      const comment = await this.commentRepository.findOne({
        where: { id: comment_id, card_id, user_id },
      });
      if (!comment) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Comment with ID ${comment_id} not found`,
        });
      }
      return comment;

    }
  
    async getComments(user_id: number, card_id: number) {
      
      const comments = await this.commentRepository.findAll({
        where: { card_id, user_id },
      });

      return comments;
      
    }
  
    async updateComment(
      user_id: number,
      card_id: number,
      comment_id: number,
      dto: UpdateCommentDto,
    ) {
  
      const [affectedRows] = await this.commentRepository.update(dto, {
        where: { id: comment_id, card_id, user_id },
      });
  
      if (affectedRows === 0) {
        throw new HttpException(
          `Comment with id ${comment_id} not found or not updated`,
          HttpStatus.NOT_FOUND,
        );
      }
  
      const updatedComment = await this.commentRepository.findOne({
        where: { id: comment_id },
      });
  
      return updatedComment;
    }
  
    async deleteComment(
      user_id: number,
      card_id: number,
      comment_id: number,
    ) {
      const deletedRows = await this.commentRepository.destroy({
        where: { id: comment_id, card_id, user_id },
      });
  
      if (deletedRows === 0) {
        throw new HttpException(
          `Comment with id ${comment_id} not found or not deleted`,
          HttpStatus.NOT_FOUND,
        );
      }
  
      return {
        message: 'Comment successfully deleted',
      };
    }
  }
  