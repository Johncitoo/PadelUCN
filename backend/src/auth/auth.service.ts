// src/auth/auth.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepo.findOneBy({ email: loginDto.email });
  
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (usuario.password !== loginDto.password) throw new UnauthorizedException('Contraseña incorrecta');
  
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      es_admin: usuario.es_admin, 
      rol: usuario.es_admin ? 'admin' : 'usuario',
      token: '', // opcional
    };
    
  }
}

