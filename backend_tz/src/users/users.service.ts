import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getUser(id: number) {
        const user = await this.userRepository.findByPk(id, {
            attributes: { exclude: ['password']}
        });
        if (!user) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: `User with ID ${id} not found`,
            });
        }
        return user;
    }

    async getUsers() {
        const users = await this.userRepository.findAll({
          attributes: { exclude: ['password'] },
        });
        return users;
      }

    async updateUser(id: number, dto: UpdateUserDto) {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 5);
        }
    
        const [updatedRowsCount] = await this.userRepository.update(dto, { where: { id } });
    
        if (updatedRowsCount === 0) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: `User with ID ${id} not found`,
            });
        }
    
        const updatedUser = await this.userRepository.findByPk(id);
        return updatedUser;
    }
    

    async deleteUser(id: number) {
        const deletedRowsCount = await this.userRepository.destroy({ where: { id } });
        if (deletedRowsCount === 0) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: `User with ID ${id} not found`,
            });
        }
        return {
            message: `User with ID ${id} successfully deleted`,
        };
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }
}
