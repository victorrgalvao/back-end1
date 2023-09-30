import { Controller, Get, Post, Body, Res, Delete, Param, ParseIntPipe, Put, HttpStatus ,Patch} from '@nestjs/common';
import { Response } from 'express';
import { FilmeService } from './filme.service';
import { MovieDto } from 'src/dto/movieDto.dto';
import { MovieUpdateDto } from 'src/dto/movieUpdateDto.dto';

@Controller('filme')
export class FilmeController {

    constructor(private readonly filmeService: FilmeService) { }
    @Get()
    findAll() {
        return this.filmeService.findAll();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const filmeEncontrado = this.filmeService.findById(id);
        if (filmeEncontrado) {
            res.status(HttpStatus.OK).json(filmeEncontrado);
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    @Post()
    cadastrar(@Body() filmeDto: MovieDto, @Res() res: Response) {
        this.filmeService.cadastrar(filmeDto);
        res.status(HttpStatus.CREATED).json(filmeDto);
    }
   

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const indexFilmeEncontrado = this.filmeService.findIndexById(id);
        if (indexFilmeEncontrado >= 0) {
            this.filmeService.deleteByIndex(indexFilmeEncontrado);
            res.status(HttpStatus.OK).json({ messagem: "filme deletado" });
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ messagem: 'filme não encontrado' });
        }
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() filmeUpdate: MovieUpdateDto, @Res() res: Response) {
        const indexFilmeEncontrado = this.filmeService.findIndexById(id);
        if (indexFilmeEncontrado >= 0) {
            // Obtenha o gato existente
            const filmeExistente = this.filmeService.findById(id);

            // Atualize apenas os campos do gato existente que estão definidos em 'updateCat'
            const updatedFilme = { ...filmeExistente, ...filmeUpdate };

            // Atualize o gato no array de gatos do serviço
            this.filmeService.updateByIndex(indexFilmeEncontrado, updatedFilme);

            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }
    
}
