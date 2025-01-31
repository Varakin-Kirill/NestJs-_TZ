import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { ColumnsModule } from "./columns/columns.module";
import { Card } from "./cards/cards.model";
import { CardsModule } from "./cards/cards.module";
import { Columns } from "./columns/columns.model";
import { User } from "./users/users.model";
import { Comment } from "./comments/comments.model";
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Columns, Card, Comment],
            autoLoadModels: true
          }),
        UsersModule,
        ColumnsModule,
        CardsModule,
        CommentsModule,
        AuthModule,
    ]
})
export class AppModule{}