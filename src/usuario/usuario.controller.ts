import { Controller, Get, Post, Body, Res, Delete, Param, ParseIntPipe, Put, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateUsuarioDto } from 'src/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/usuarioUpdate.dto';
import { UsuarioService } from './usuario.service';
@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

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
    // @Post(':id/favorites/:movieId')
    // async addFavorite(
    //   @Param('id', ParseIntPipe) userId: number,
    //   @Param('movieId', ParseIntPipe) movieId: number
    // ) {
    //   try {
    //     const user = await this.userService.addFavorite(userId, movieId);
    //     return { message: 'Movie added to favorites', user };
    //   } catch (error) {
    //     return { message: error.message };
    //   }
    // }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const indexUsuarioEncontrado = this.usuarioService.findIndexById(id);
        if (indexUsuarioEncontrado >= 0) {
            this.usuarioService.deleteByIndex(indexUsuarioEncontrado);
            res.status(HttpStatus.OK).json({messagem:"usuario deletado"});
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ messagem: 'usuario não encontrado' });
        }
    }

    @Put(':id')
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


