import { Body, Controller, Post, Get, Param, Delete, Put, UseGuards, UsePipes} from '@nestjs/common';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { CardsService } from './cards.service';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { cardsOwnership } from 'src/auth/cards.ownership.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Card } from './cards.model';

@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
    constructor(private cardService: CardsService){}


    @ApiOperation({ summary: 'Создание карточки' })
    @ApiResponse({status: 200, type: Card})
    @UseGuards(JwtAuthGuard, cardsOwnership)
    @Post()
    @UsePipes(ValidationPipe)
    createCard(@Param('userId') user_id: number, @Param('columnId') column_id: number, @Body() CreateCardDto: CreateCardDto) {
        return this.cardService.createCard(user_id, column_id,  CreateCardDto);
    }
    

    @ApiOperation({ summary: 'Получение карточки по ID' })
    @ApiResponse({status: 200, type: Card})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getCard(@Param('userId') user_id: number, @Param('columnId') column_id: number,@Param('id') card_id: number) {
        return this.cardService.getCard(user_id, column_id, card_id);
    }

    @ApiOperation({ summary: 'Получение всех карточек из колонки' })
    @ApiResponse({status: 200, type: [Card]})
    @UseGuards(JwtAuthGuard)
    @Get('')
    getCards(@Param('userId') user_id: number, @Param('columnId') column_id: number) {
        return this.cardService.getCards(user_id, column_id);
    }

    @ApiOperation({ summary: 'Изменение карточки по ID' })
    @ApiResponse({status: 200, type: Card})
    @UseGuards(JwtAuthGuard, cardsOwnership)
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateColumn(@Param('userId') user_id: number, @Param('columnId') column_id: number,@Param('id') card_id: number, @Body() updateColumnDto: UpdateCardDto) {
        return this.cardService.updateCard(user_id, column_id, card_id, updateColumnDto );
    }
    
    @ApiOperation({ summary: 'Удаление карточки по ID' })
    @ApiResponse({
        status: 200,
        schema: {
            example: { message: 'Card successfully deleted and order updated' },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteCard(@Param('userId') user_id: number, @Param('columnId') column_id: number, @Param('columnId') card_id: number) {
        return this.cardService.deleteCard(user_id, column_id, card_id);
    }
}
