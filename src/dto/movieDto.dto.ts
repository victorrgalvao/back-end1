import { IsNotEmpty, IsNumber, IsString ,IsOptional} from 'class-validator';

export class MovieDto {
  @IsOptional() // Indica que o campo é opcional
  @IsNotEmpty({ message: 'O campo "id" não pode estar vazio' })
  @IsNumber({}, { message: 'O campo "id" deve ser um número' })
  id?: number; // Use "?" para indicar que o campo é opcional

  @IsOptional()
  @IsNotEmpty({ message: 'O campo "nome" não pode estar vazio' })
  @IsString({ message: 'O campo "nome" deve ser uma string' })
  nome?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo "genero" não pode estar vazio' })
  @IsString({ message: 'O campo "genero" deve ser uma string' })
  genero?: string;
}