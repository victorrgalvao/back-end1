import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/usuarioUpdate.dto';

@Injectable()
export class UsuarioService {
  private readonly usuarios: CreateUsuarioDto[] = [];

  findAll() {
    return this.usuarios;
  }
  cadastrar(usuario: CreateUsuarioDto) {
    let user = new CreateUsuarioDto();
    user.id = usuario.id;
    user.login = usuario.login;
    user.password = usuario.password;

    this.usuarios.push(usuario)
    return usuario;

  }
  findById(id: number): CreateUsuarioDto {
    return this.usuarios.find(usuario => usuario.id === id);
  }
  findIndexById(id: number): number {
    return this.usuarios.findIndex(usuario => usuario.id === id);
  }
 
  

  deleteByIndex(index: number): void {
    this.usuarios.splice(index, 1);
  }

  updateByIndex(index: number, updateUser: UpdateUsuarioDto): void {
    this.usuarios.splice(index, 1, updateUser);
}


}
