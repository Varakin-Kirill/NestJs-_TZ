import { ApiProperty } from "@nestjs/swagger";
import {Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Columns } from "src/columns/columns.model";
import { Comment } from "src/comments/comments.model";



interface CardCreationAttrs {
    column_id?: number;
    title: string;
    description: string;
    order?: number;
}


@Table({tableName: 'card', createdAt: false, updatedAt: false})
export class Card extends Model<Card, CardCreationAttrs >{

    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 1, description: 'Уникальный индентификатор колонки'})
    @ForeignKey(() => Columns)
    @Column({type: DataType.INTEGER})
    column_id: number;

    @ApiProperty({example: 'Title', description: 'Название карточки'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Description', description: 'Описание карточки'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({example: 1, description: 'Порядок карточки'})
    @Column({type: DataType.INTEGER, allowNull: false})
    order: number;

    @HasMany(() => Comment)
    comments: Comment[];

    
}