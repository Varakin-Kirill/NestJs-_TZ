import { ApiProperty } from "@nestjs/swagger";
import {Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Card } from "src/cards/cards.model";
import { User } from "src/users/users.model";


interface ColumnCreationAttrs {
    user_id?: number;
    title: string;
    order?: number;
}


@Table({tableName: 'column', createdAt: false, updatedAt: false})
export class Columns extends Model<Columns, ColumnCreationAttrs >{

    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 1, description: 'Уникальный индентификатор пользователя колонки'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ApiProperty({example: 'Title', description: 'Название колонки'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 1, description: 'Порядок колонки'})
    @Column({type: DataType.INTEGER, allowNull: false})
    order: number;

    @HasMany(() => Card)
    cards: Card[];


    
}