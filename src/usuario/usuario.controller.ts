import { Controller, Get, Post, Body, Res, Delete, Param, ParseIntPipe, Put, HttpStatus, Response } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/usuarioUpdate.dto';
import { UsuarioService } from './usuario.service';
@Controller('usuario')
export class UsuarioController {

constructor(private readonly usuarioService:UsuarioService){}

    @Get()
    findAll() {
        return this.usuarioService.findAll();
     }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) { }

    @Post()
    cadastrar(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res: Response) {
        // this.usuarioService.create(createUsuarioDto);
        //     res.status(HttpStatus.CREATED).json(createUsuarioDto);
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
    remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) { }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() usuarioUpdate: UpdateUsuarioDto) { }



}


