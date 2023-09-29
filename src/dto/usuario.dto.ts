import { MovieDto } from "./movieDto.dto";


export class CreateUsuarioDto {
    id: number;
    login: string;
    password: string;
    favoritos: MovieDto[] =[];
}








