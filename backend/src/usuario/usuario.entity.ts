import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
    
  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  saldo: number;

  @Column({ default: false })
  es_admin: boolean;
}

