import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { CanchaModule } from './cancha/cancha.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: '112002',
      database: 'padel_ucn',
      autoLoadEntities: true,
      synchronize: false, 
    }),
    UsuarioModule,
    AuthModule,
    CanchaModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

