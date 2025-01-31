import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from 'src/comments/comments.model';
import { CardsModule } from 'src/cards/cards.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([Comment]),
    JwtModule,
    forwardRef(()=>ColumnsModule),
    forwardRef(()=> CardsModule)

    
  ],
  exports: [SequelizeModule, CommentsService]
})
export class CommentsModule {}
