import { Controller, Get, Post, Body, Res, Delete, Param, ParseIntPipe, Put, HttpStatus, Patch } from '@nestjs/common';
import { Response } from 'express';
import { CreateUsuarioDto } from 'src/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/usuarioUpdate.dto';
import { UsuarioService } from './usuario.service';
import { FavoriteDTO } from 'src/dto/addFavoriteMovieDto.dto';
@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

@Get('filmes')
listarFilmes(){
    return this.usuarioService.getMovies();
}

    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const usuarioEncontrado = this.usuarioService.findById(id);
        if (usuarioEncontrado) {
            res.status(HttpStatus.OK).json(usuarioEncontrado);
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    @Post()
    cadastrar(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res: Response) {
        this.usuarioService.cadastrar(createUsuarioDto);
        res.status(HttpStatus.CREATED).json(createUsuarioDto);
    }
    @Post(':id/favorites')
    async addFavorite(
      @Param('id', ParseIntPipe) userId: number,
           @Body() addFavoriteDto: FavoriteDTO,
    //   @Param('movieId', ParseIntPipe) movieId: number
    ) {
        const {movieId} = addFavoriteDto;
      try {
        const user =this.usuarioService.addFavorite(userId ,movieId);
        return { message: 'Movie added to favorites', user };
      } catch (error) {
        return { message: error.message };
      }
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const indexUsuarioEncontrado = this.usuarioService.findIndexById(id);
        if (indexUsuarioEncontrado >= 0) {
            this.usuarioService.deleteByIndex(indexUsuarioEncontrado);
            res.status(HttpStatus.OK).json({ messagem: "usuario deletado" });
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ messagem: 'usuario não encontrado' });
        }
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() usuarioUpdate: UpdateUsuarioDto, @Res() res: Response) {
        const indexUsuarioEncontrado = this.usuarioService.findIndexById(id);
        if (indexUsuarioEncontrado >= 0) {
            // Obtenha o gato existente
            const usuarioExistente = this.usuarioService.findById(id);

            // Atualize apenas os campos do gato existente que estão definidos em 'updateCat'
            const updatedUsuario = { ...usuarioExistente, ...usuarioUpdate };

            // Atualize o gato no array de gatos do serviço
            this.usuarioService.updateByIndex(indexUsuarioEncontrado, updatedUsuario);

            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }



}


