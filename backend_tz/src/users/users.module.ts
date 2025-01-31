import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ColumnsModule } from 'src/columns/columns.module';
import { CardsModule } from 'src/cards/cards.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() =>AuthModule),
    // ColumnsModule,
    // CardsModule,
    // CommentsModule

  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
