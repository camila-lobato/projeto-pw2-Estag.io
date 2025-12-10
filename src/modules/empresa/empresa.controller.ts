import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'src/common/validator/generic.validator';
import { EmpresaService } from './empresa.service';
import { EmpresaDto } from './empresa.dto';

@Controller('/empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  @Render('empresa/listagem')
  async listagem() {
    const listaEmpresas = await this.empresaService.getAll();
    return { listaEmpresas };
  }

  @Get('/nova')
  @Render('empresa/formulario-cadastro')
  formularioCadastro() {
    return {};
  }

 @Post('/nova/salvar')
async salvarCadastro(
  @Body() dadosForm: any,
  @Req() req: Request,
  @Res() res: Response,
) {
  try {
    await this.empresaService.create(dadosForm);

    req.addFlash('success', 'Empresa cadastrada com sucesso!');
    return res.redirect('/empresa');
  } catch (e: any) {
    // Trata erro de e-mail duplicado
    if (e.message.includes('e-mail') || e.code === 'ER_DUP_ENTRY') {
      req.addFlash('error', 'O e-mail informado já está cadastrado.');
    } else {
      req.addFlash('error', 'Erro ao cadastrar empresa.');
    }

    req.setOld(dadosForm);
    return res.redirect('/empresa/novo');
  }
}


  @Get('/:id/editar')
  @Render('empresa/formulario-atualizacao')
  async editar(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    const empresa = await this.empresaService.findOne(id);

    if (!empresa) {
      req.addFlash('error', 'Empresa não encontrada.');
      return res.redirect('/empresa');
    }

    return { empresa };
  }

 @Post('/:id/editar/salvar')
async salvarAtualizacao(
  @Param('id') id: number,
  @Body() dadosForm: any,
  @Req() req: Request,
  @Res() res: Response,
) {
  try {
    await this.empresaService.update(id, dadosForm);
    req.addFlash('success', 'Empresa atualizada com sucesso!');
    return res.redirect('/empresa');
  } catch (e) {
    req.addFlash('error', e.message);
    req.setOld(dadosForm);
    return res.redirect(`/empresa/${id}/atualizacao`);
  }
}

  @Get('/:id/excluir')
@Render('empresa/formulario-exclusao')
async formularioExcluir(
  @Param('id') id: number,
  @Req() req: Request,
  @Res() res: Response,
) {
  const empresa = await this.empresaService.findOne(id);

  if (!empresa) {
    req.addFlash('error', 'Empresa não encontrada!');
    return res.redirect('/empresa');
  }

  return { empresa };
}

  @Post('/:id/excluir')
async excluir(
  @Param('id') id: number,
  @Req() req: Request,
  @Res() res: Response,
) {
  try {
    const empresa = await this.empresaService.findOne(id);

    if (!empresa) {
      req.addFlash('error', 'Empresa não encontrada!');
      return res.redirect('/empresa');
    }

    await this.empresaService.remove(id);

    req.addFlash('success', `Empresa "${empresa.nome}" excluída com sucesso!`);
    return res.redirect('/empresa');

  } catch (e) {
    req.addFlash('error', 'Erro ao excluir empresa.');
    return res.redirect('/empresa');
  }
}

}
