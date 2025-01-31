import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class userOwnership implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const id = request.params.id;


    if (user.id !== parseInt(id)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
    return true;
  }
}

