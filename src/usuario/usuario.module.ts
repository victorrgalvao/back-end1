import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { FilmeService } from 'src/filme/filme.service';

@Module({
  imports: [],
  controllers:[UsuarioController],
  providers: [
    
  UsuarioService,FilmeService
  ],
})
export class UsuarioModule {}
