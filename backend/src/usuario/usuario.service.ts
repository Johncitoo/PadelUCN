import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepo.findOneBy({ id });
  }

  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepo.create(createUsuarioDto); 
    return this.usuarioRepo.save(usuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepo.delete(id);
  }
  
  async update(id: number, updateUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
  
    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepo.save(usuario);
  }
  
  async login(email: string, password: string): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOneBy({ email });
  
    if (!usuario || usuario.password !== password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    return usuario;
  }
  

}

