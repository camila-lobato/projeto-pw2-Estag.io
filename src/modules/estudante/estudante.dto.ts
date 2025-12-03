import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class EstudanteDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'O curso é obrigatório' })
  curso: string;

  instituicao: string;

  habilidades: string;

  github: string;
}
