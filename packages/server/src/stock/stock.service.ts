import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}
  async create(createStockDto: CreateStockDto) {
    return await this.stockRepository.save(createStockDto);
  }

  async findAll() {
    return await this.stockRepository.find();
  }

  async findOneById(id: number) {
    return await this.stockRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByCode(code: string) {
    return await this.stockRepository.findOne({
      where: {
        code,
      },
    });
  }
  async update(id: number, updateStockDto: UpdateStockDto) {
    return await this.stockRepository.update({ id }, updateStockDto);
  }

  async remove(id: number) {
    return await this.stockRepository.delete({ id });
  }
}
