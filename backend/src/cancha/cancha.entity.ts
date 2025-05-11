import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cancha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ default: true })
  disponible: boolean;
}
