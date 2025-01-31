import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { CardsService } from 'src/cards/cards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class commentsOwnership implements CanActivate {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly cardsService: CardsService,
    private readonly commentsService: CommentsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { userId, columnId, cardId, id } = request.params;


    if (user.id !== parseInt(userId)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    if (columnId) {
      const column = await this.columnsService.getColumn(userId, columnId);
      if (!column || column.user_id !== user.id) {
        throw new ForbiddenException('You do not have permission to access this column');
      }
    }

    if (cardId) {
      const card = await this.cardsService.getCard(userId, columnId, cardId);
      if (!card || card.column_id !== parseInt(columnId)) {
        throw new ForbiddenException('You do not have permission to access this card');
      }
    }

    if (id) {
      const comment = await this.commentsService.getComment(userId, cardId, id);
      if (!comment || comment.card_id !== parseInt(cardId)) {
        throw new ForbiddenException('You do not have permission to access this comment');
      }
    }

    return true;
  }
}
