import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { Columns } from './columns.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';



@Injectable()
export class ColumnsService {
    constructor(@InjectModel(Columns) private columnRepository: typeof Columns) {}

    async createColumn(user_id: number, createColumnDto: CreateColumnDto) {
        const columns = await this.columnRepository.findAll({ where: { user_id } });
        const maxOrder = columns.reduce((max, column) => (column.order > max ? column.order : max), 0);

        const columnOrder = createColumnDto.order ?? maxOrder + 1;

        const orderConflict = columns.some((column) => column.order === columnOrder);
        if (orderConflict) {
            throw new HttpException(
                `A column with order ${columnOrder} already exists`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const column = await this.columnRepository.create({ ...createColumnDto, user_id, order: columnOrder });
        return column;
    }

    async getColumn(user_id: number, id: number) {
        const column = await this.columnRepository.findOne({
            where: {
                user_id: user_id,
                id: id,
            },
        });

        if (!column) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: `Column with ID ${id} not found`,
            });
        }
       
        return column;
    }

    async getColumns(user_id: number) {
        const columns = await this.columnRepository.findAll({
            where: { user_id },
            order: [['order', 'ASC']]
        });
        return columns;
    }

    async updateColumn(user_id: number, id: number, dto: UpdateColumnDto) {

        if (dto.order !== undefined) {
            const columns = await this.columnRepository.findAll({ where: { user_id } });

            const orderConflict = columns.some(
                (otherColumn) => otherColumn.id !== id && otherColumn.order === dto.order,
            );

            if (orderConflict) {
                throw new HttpException(
                    `A column with order ${dto.order} already exists`,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        await this.columnRepository.update(dto, { where: { user_id, id } });
        const updatedColumn = await this.columnRepository.findByPk(id);

        return updatedColumn;
    }
    async deleteСolumn(user_id: number, id: number) {
        
        await this.columnRepository.destroy({ where: { user_id, id } });

        const remainingColumns = await this.columnRepository.findAll({
            where: { user_id },
            order: [['order', 'ASC']],
        });

        for (let i = 0; i < remainingColumns.length; i++) {
            await this.columnRepository.update(
                { order: i + 1 },
                { where: { id: remainingColumns[i].id } },
            );
        }
        return {
            message: 'Column successfully deleted and order updated',
        };
    }
}
