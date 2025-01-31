import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Columns } from './columns.model';
import { ColumnsService } from './columns.service';
import { ColumnController } from './columns.controller';
import { JwtModule } from '@nestjs/jwt';
import { CardsModule } from 'src/cards/cards.module';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ColumnController],
  providers: [ColumnsService],
  imports: [
    SequelizeModule.forFeature([Columns]),
    JwtModule,
    forwardRef(()=> CardsModule),
    forwardRef(()=> CommentsModule),

    
  ],
  exports: [SequelizeModule, ColumnsService],
})
export class ColumnsModule {}
