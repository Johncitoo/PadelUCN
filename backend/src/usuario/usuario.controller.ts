import { Controller, Get, Post, Param, Body, Delete, Put, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }
  
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.usuarioService.login(body.email, body.password);
  }

}

