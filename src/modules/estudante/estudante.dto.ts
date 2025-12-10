import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class EstudanteDto {

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'O curso é obrigatório.' })
  @MinLength(3, { message: 'O curso deve ter ao menos 3 caracteres.' })
  curso: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(4, { message: 'A senha deve ter pelo menos 4 caracteres.' })
  senha: string;

  github: string;

  portfolio: string;

  @IsNotEmpty({ message: 'A biografia é obrigatória.' })
  biografia: string;
}
