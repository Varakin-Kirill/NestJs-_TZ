import { Body, Controller, Post, Get, Param, Delete, Put, UseGuards, UsePipes} from '@nestjs/common';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { columnsOwnership } from 'src/auth/columns.ownership.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Columns } from './columns.model';


@Controller('users/:userId/columns')
export class ColumnController {
    constructor(private columnService: ColumnsService){}



    @ApiOperation({ summary: 'Создание колонки' })
    @ApiResponse({status: 200, type: Columns})
    @UseGuards(JwtAuthGuard, columnsOwnership)
    @Post()
    @UsePipes(ValidationPipe)
    createColumn(@Param('userId') user_id: number, @Body() CreateColumnDto: CreateColumnDto){
        return this.columnService.createColumn(user_id, CreateColumnDto);
    }


    @ApiOperation({ summary: 'Получения колонки пользователя по ID' })
    @ApiResponse({status: 200, type: Columns})
    @UseGuards(JwtAuthGuard)  
    @Get(':id')
    getColumn(@Param('userId') user_id: number, @Param('id') id: number) {
        return this.columnService.getColumn(user_id, id);
    }

    @ApiOperation({ summary: 'Получения всех колонок пользователя' })
    @ApiResponse({status: 200, type: [Columns]})
    @UseGuards(JwtAuthGuard)
    @Get('')
    getColumns(@Param('userId') id: number) {
        return this.columnService.getColumns(Number(id));
    }



    @ApiOperation({ summary: 'Обновления колонки пользователя по ID' })
    @ApiResponse({status: 200, type: Columns})
    @UsePipes(ValidationPipe)
    updateColumn(@Param('userId') user_id: number,  @Param('id') id: number, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnService.updateColumn(user_id, id, updateColumnDto );
    }




    @ApiOperation({ summary: 'Удаление колонки пользователя по ID' })
    @ApiResponse({
        status: 200,
        schema: {
            example: { message: 'Column successfully deleted and order updated' },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteColumn(@Param('userId') user_id: number, @Param('id') id: number) {
        return this.columnService.deleteСolumn(user_id, id);
    }
}