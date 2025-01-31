import { ApiProperty } from "@nestjs/swagger/dist";
import {Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Card } from "src/cards/cards.model";
import { User } from "src/users/users.model";


interface CommentCreationAttrs {
    card_id?: number;
    user_id?: number,
    text: string;
}


@Table({tableName: 'comment', createdAt: false, updatedAt: false})
export class Comment extends Model<Comment, CommentCreationAttrs >{
        
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 1, description: 'Уникальный индентификатор карточки'})
    @ForeignKey(() => Card)
    @Column({type: DataType.INTEGER})
    card_id: number;

    @ApiProperty({example: 1, description: 'Уникальный индентификатор пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ApiProperty({example: "example text", description: 'Текст комментария'})
    @Column({type: DataType.STRING, allowNull: false})
    text: string;    
}