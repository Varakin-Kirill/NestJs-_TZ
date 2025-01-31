import { Body, Controller, Post, Get, Param, Delete, Put, UseGuards, UsePipes} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { userOwnership } from 'src/auth/user.ownership.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({ summary: 'Получение пользователя по ID' })
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(Number(id));
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }



    @ApiOperation({summary: 'Изменния пользователя по id'})
    @ApiResponse({status:200, type: User})
    @UseGuards(JwtAuthGuard, userOwnership)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(Number(id), updateUserDto );
    }


    @ApiOperation({ summary: 'Удаление пользователя по ID' })
    @ApiResponse({
        status: 200,
        schema: {
            example: { message: 'User with ID 1 successfully deleted' },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }

}
