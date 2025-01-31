import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { CardsService } from 'src/cards/cards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class columnsOwnership implements CanActivate {
  constructor(
    private readonly columnsService: ColumnsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { userId, id} = request.params;

    console.log(userId)
    console.log(user.id)
    if (user.id !== parseInt(userId)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    if (id) {
      const column = await this.columnsService.getColumn(userId, id);
      if (!column || column.user_id !== user.id) {
        throw new ForbiddenException('You do not have permission to access this column');
      }
    }
    
    return true;
  }
}
