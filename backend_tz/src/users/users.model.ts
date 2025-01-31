import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Columns } from "src/columns/columns.model";
import { Comment } from "src/comments/comments.model";



interface UserCreationAttrs {
    email: string;
    password: string;
}


@Table({tableName: 'user', createdAt: false, updatedAt: false})
export class User extends Model<User, UserCreationAttrs >{

    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description:'Почтовый адрес'})
    @Column({type: DataType.STRING, unique:true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description:'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Columns)
    users: Columns[];

    @HasMany(() => Comment)
    comments: Comment[];


}