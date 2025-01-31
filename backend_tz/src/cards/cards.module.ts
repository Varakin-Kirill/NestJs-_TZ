import { forwardRef, Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './cards.model';
import { ColumnsModule } from 'src/columns/columns.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    SequelizeModule.forFeature([Card]),
    forwardRef(() =>ColumnsModule), 
    forwardRef(() =>CommentsModule), 
    JwtModule,
  ],
  exports: [SequelizeModule, CardsService],
})
export class CardsModule {}
