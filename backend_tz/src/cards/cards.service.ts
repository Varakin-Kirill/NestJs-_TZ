import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { Columns } from 'src/columns/columns.model';
import { UpdateCardDto } from './dto/update-card.dto';
    

@Injectable()
export class CardsService {
    constructor(
        @InjectModel(Card) private cardRepository: typeof Card, 
        @InjectModel(Columns) private readonly columnRepository: typeof Columns
    ) {}
    
    async createCard(user_id: number, column_id: number, createCardDto: CreateCardDto) {
        const column = await this.columnRepository.findOne({
          where: { id: column_id, user_id },
          include: { model: Card },
        });
      
        const maxOrder = column.cards.reduce((max, card) => (card.order > max ? card.order : max), 0);
        const cardOrder = createCardDto.order ?? maxOrder + 1;
      
        const orderConflict = column.cards.some((card) => card.order === cardOrder);
        if (orderConflict) {
          throw new HttpException(
            `A card with order ${cardOrder} already exists in this column`,
            HttpStatus.BAD_REQUEST,
          );
        }
      
        const card = await this.cardRepository.create({
          ...createCardDto,
          column_id,
          order: cardOrder,
        });
      
        return card;
    }
    async getCard(user_id: number, column_id: number, card_id: number) {
        const column = await this.columnRepository.findOne({
          where: { id: column_id, user_id },
          include: [{ model: Card, where: { id: card_id } }],
        });

        if (!column) {
          throw new NotFoundException({
              statusCode: HttpStatus.NOT_FOUND,
              message: `Card with ID ${card_id} not found`,
          });
      }

        return column.cards[0]
    }
    async getCards(user_id: number, column_id: number) {
        const column = await this.columnRepository.findOne({
            where: { id: column_id, user_id },
            include: {
                model: Card,
                order: [['order', 'ASC']],
            },
        });
        return column.cards || [];
    }
    async updateCard(user_id: number, column_id: number, card_id: number, dto: UpdateCardDto) {
        const column = await this.columnRepository.findOne({
          where: { id: column_id, user_id },
          include: [{ model: Card, where: { id: card_id } }],
        });
      
        if (dto.order !== undefined) {
          const orderConflict = column.cards.some(
            (otherCard) => otherCard.id !== card_id && otherCard.order === dto.order,
          );
          if (orderConflict) {
            throw new HttpException(
              `A card with order ${dto.order} already exists in this column`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      
        const [affectedRows] = await this.cardRepository.update(dto, {
          where: { id: card_id, column_id },
        });
      
        if (affectedRows === 0) {
          throw new HttpException('Card not updated', HttpStatus.NOT_FOUND);
        }
      
        const updatedCard = await this.cardRepository.findOne({
          where: { id: card_id },
        });
      
        return updatedCard;
    }
    async deleteCard(user_id: number, column_id: number, card_id: number) {
        const column = await this.columnRepository.findOne({
            where: { id: column_id, user_id },
            include: [{ model: Card, where: { id: card_id } }],
        });
    
        const deletedRows = await this.cardRepository.destroy({
            where: { id: card_id, column_id },
        });
    
        if (deletedRows === 0) {
            throw new HttpException(
                `Card with id ${card_id} not deleted`,
                HttpStatus.NOT_FOUND,
            );
        }
    
        const remainingCards = column.cards
            .filter((card) => card.id !== card_id) 
            .sort((a, b) => a.order - b.order);   
    
        for (let i = 0; i < remainingCards.length; i++) {
            await this.cardRepository.update(
                { order: i + 1 }, 
                { where: { id: remainingCards[i].id } },
            );
        }
    
        return {
            message: 'Card successfully deleted and order updated',
        };
    }
}