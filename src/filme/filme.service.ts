import { HttpStatus, Injectable,NotFoundException } from '@nestjs/common';
import { MovieDto } from 'src/dto/movieDto.dto';
import { MovieUpdateDto } from 'src/dto/movieUpdateDto.dto';


@Injectable()
export class FilmeService {
  private readonly filmes: MovieDto[] = [];
  

  findAll() {
    return this.filmes;
  }
  cadastrar(filme: MovieDto) {
    let movie = new MovieDto();
    movie.id = filme.id;
    movie.nome = filme.nome;
    movie.genero = filme.genero;

    this.filmes.push(filme)
    return filme;

  }
  findById(id: number): MovieDto {
    return this.filmes.find(filme => filme.id === id);
  }
  findIndexById(id: number): number {
    return this.filmes.findIndex(filme => filme.id === id);
  }



  deleteByIndex(index: number): void {
    this.filmes.splice(index, 1);
  }

  updateByIndex(index: number, updateMovie: MovieUpdateDto): void {
    this.filmes.splice(index, 1, updateMovie);
  }

  
}


