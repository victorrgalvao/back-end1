import { MovieDto } from "./movieDto.dto";


export class UpdateUsuarioDto {
    id: number;
    login: string;
    password: string;
    favoritos: MovieDto[] =[];
}








