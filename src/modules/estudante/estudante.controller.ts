import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EstudanteService } from './estudante.service';

@Controller('/estudante')
export class EstudanteController {

  constructor(private readonly estudanteService: EstudanteService) {}

  // LISTAR
  @Get()
  @Render('estudante/listagem')
  async listar() {
    const lista = await this.estudanteService.getAll();
    return { lista };
  }

  // FORM CADASTRO
  @Get('/novo')
  @Render('estudante/formulario-cadastro')
  async formCadastro() {
    return;
  }

  // SALVAR
  @Post('/novo/salvar')
  async salvar(@Body() dados: any, @Req() req: Request, @Res() res: Response) {
    try {
      await this.estudanteService.create(dados);
      req.addFlash('success', 'Estudante cadastrado com sucesso!');
      return res.redirect('/estudante');

    } catch (e) {
      req.addFlash('error', e.message);
      req.setOld(dados);
      return res.redirect('/estudante/novo');
    }
  }

  // FORM EDITAR
  @Get('/:id/editar')
  @Render('estudante/formulario-atualizacao')
  async editar(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    const estudante = await this.estudanteService.findOne(id);

    if (!estudante) {
      req.addFlash('error', 'Estudante não encontrado');
      return res.redirect('/estudante');
    }

    return {
      estudante,
      old: req.session['old'] || {},
    };
  }

  // SALVAR EDIÇÃO
  @Post('/:id/editar-salvar')
  async salvarEdicao(
    @Param('id') id: number,
    @Body() dados: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.estudanteService.update(id, dados);
      req.addFlash('success', 'Estudante atualizado com sucesso!');
      return res.redirect('/estudante');
    } catch (e) {
      req.addFlash('error', 'Erro ao atualizar estudante');
      req.setOld(dados);
      return res.redirect(`/estudante/${id}/editar`);
    }
  }

  // CONFIRMAR EXCLUSÃO
  @Get('/:id/excluir')
  @Render('estudante/formulario-exclusao')
  async confirmDelete(@Param('id') id: number) {
    const estudante = await this.estudanteService.findOne(id);
    return { estudante };
  }

  // EXCLUIR
  @Post('/:id/excluir-confirmado')
  async excluir(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.estudanteService.remove(id);
    req.addFlash('success', 'Estudante excluído com sucesso!');
    return res.redirect('/estudante');
  }
}
