import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { MovieDto } from 'src/dto/movieDto.dto';
import { CreateUsuarioDto } from 'src/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/usuarioUpdate.dto';
import { FilmeService } from 'src/filme/filme.service';
import { filmes } from '../filme/filme-data'

@Injectable()
export class UsuarioService {
  private readonly usuarios: CreateUsuarioDto[] = [];

  constructor(private readonly filmeService: FilmeService) { }

  getMovies() {
   
    console.log(filmes)
    return filmes;
  }

  findAll() {
    return this.usuarios;
  }
  cadastrar(usuario: CreateUsuarioDto) {
    let user = new CreateUsuarioDto();
    user.id = usuario.id;
    user.login = usuario.login;
    user.password = usuario.password;

    this.usuarios.push(user)
    return user;

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

  addFavorite(userId: number, movieId: number) {
    const user = this.usuarios.find((u) => u.id === userId);
    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const movieToAdd = filmes.find((m) => m.id === movieId);
    if (!movieToAdd) {
      throw new NotFoundException('Movie not found');
    }


    if (user.favoritos.some((fav) => fav.id === movieId)) {
      throw new Error('Movie already in favorites');
    }
    const newFavorite: MovieDto = {
      id: movieToAdd.id,
      nome: movieToAdd.nome,
      genero: movieToAdd.genero,
    };
    user.favoritos.push(newFavorite);
    return user;
  }
}


