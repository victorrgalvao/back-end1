import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { MovieDto } from 'src/dto/movieDto.dto';
import { MovieUpdateDto } from 'src/dto/movieUpdateDto.dto';
import { filmes } from './filme-data';

@Injectable()
export class FilmeService {
  public readonly filmes: MovieDto[] = [];
  
  getFilmes(): MovieDto[] {
    return filmes;
  }

  findAll() {
    return filmes;
  }
  cadastrar(filme: MovieDto): MovieDto {
    filmes.push(filme);
    console.log(filme);
    console.log(filmes);
    return filme; // Retorna o filme adicionado
  }
  findById(id: number): MovieDto {
    return filmes.find(filme => filme.id === id);
  }
  findIndexById(id: number): number {
    return filmes.findIndex(filme => filme.id === id);
  }



  deleteByIndex(index: number): void {
   filmes.splice(index, 1);
  }

  updateByIndex(index: number, updateMovie: MovieUpdateDto): void {
    filmes.splice(index, 1, updateMovie);
  }

  
}


