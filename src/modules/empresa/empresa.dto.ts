import { IsNotEmpty, MinLength, IsEmail, Length } from 'class-validator';

export class EmpresaDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório.' })
  @Length(14, 18, { message: 'O CNPJ deve ter entre 14 e 18 caracteres.' })
  cnpj: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail informado é inválido.' })
  email: string;

  telefone?: string;

  @MinLength(10, { message: 'A descrição deve ter ao menos 10 caracteres.' })
  descricao?: string;

  site?: string;
}
