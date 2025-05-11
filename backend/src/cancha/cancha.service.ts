import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from './cancha.entity';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';


@Injectable()
export class CanchaService {
  constructor(
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
  ) {}

  async create(data: CreateCanchaDto): Promise<Cancha> {
    const nuevaCancha = this.canchaRepository.create(data);
    return this.canchaRepository.save(nuevaCancha);
  }

  async findAll(): Promise<Cancha[]> {
    return this.canchaRepository.find();
  }

  async findOne(id: number): Promise<Cancha> {
    const cancha = await this.canchaRepository.findOneBy({ id });
    if (!cancha) {
      throw new NotFoundException(`Cancha con id ${id} no encontrada`);
    }
    return cancha;
  }

  async update(id: number, data: UpdateCanchaDto): Promise<Cancha> {
    await this.canchaRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.canchaRepository.delete(id);
  }
}
