import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/usuario.dto';

@Injectable()
export class UsuarioService {
    private readonly usuarios: CreateUsuarioDto[] =[];


    findAll() {
      return this.usuarios;
    }


}
