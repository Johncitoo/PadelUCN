// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Usuario } from '../usuario/usuario.entity'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const usuarioCompleto = await this.authService.login(loginDto);
  
    return {
      id: usuarioCompleto.id,
      nombre: usuarioCompleto.nombre,
      email: usuarioCompleto.email,
      rol: usuarioCompleto.es_admin ? 'admin' : 'usuario',
      token: '',
    };
  }
}


