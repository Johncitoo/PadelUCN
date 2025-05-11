import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';

@Controller('canchas')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Post()
  create(@Body() createCanchaDto: CreateCanchaDto) {
    return this.canchaService.create(createCanchaDto);
  }

  @Get()
  findAll() {
    return this.canchaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canchaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCanchaDto: CreateCanchaDto) {
    return this.canchaService.update(+id, updateCanchaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canchaService.remove(+id);
  }
}
