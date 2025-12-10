import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Render,
  Body,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CandidaturaService } from './candidatura.service';
import { EstudanteService } from '../estudante/estudante.service';
import { VagaService } from '../vaga/vaga.service';

@Controller('/candidatura')
export class CandidaturaController {

  constructor(
    private readonly candidaturaService: CandidaturaService,
    private readonly estudanteService: EstudanteService,
    private readonly vagaService: VagaService,
  ) {}

  // LISTAGEM
  @Get()
  @Render('candidatura/listagem')
  async listagem() {
    const candidaturas = await this.candidaturaService.getAll();
    return { candidaturas };
  }

  // FORM CADASTRO
  @Get('/novo')
  @Render('candidatura/formulario-cadastro')
  async formulario() {
    const estudantes = await this.estudanteService.getAll();
    const vagas = await this.vagaService.getAll();
    return { estudantes, vagas };
  }

  // SALVAR
  @Post('/novo/salvar')
  async salvar(
    @Body() dadosForm: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const estudante = await this.estudanteService.findOne(dadosForm.estudante);
      const vaga = await this.vagaService.findOne(dadosForm.vaga);

      if (!estudante || !vaga) {
        req.addFlash('error', 'Estudante ou vaga inválidos');
        return res.redirect('/candidatura/novo');
      }

      await this.candidaturaService.create({
        estudante,
        vaga
      });

      req.addFlash('success', 'Candidatura realizada com sucesso!');
      return res.redirect('/candidatura');

    } catch (error) {
      req.addFlash('error', 'Erro ao salvar candidatura');
      return res.redirect('/candidatura/novo');
    }
  }

  // FORM EDIÇÃO
  @Get('/:id/atualizacao')
  @Render('candidatura/formulario-atualizacao')
  async atualizar(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const candidatura = await this.candidaturaService.findOne(id);

    if (!candidatura) {
      req.addFlash('error', 'Candidatura não encontrada');
      return res.redirect('/candidatura');
    }

    const estudantes = await this.estudanteService.getAll();
    const vagas = await this.vagaService.getAll();

    return { candidatura, estudantes, vagas };
  }

  // SALVAR EDIÇÃO
  @Post('/:id/atualizacao-salvar')
  async salvarAtualizacao(
    @Param('id') id: number,
    @Body() dadosForm: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const estudante = await this.estudanteService.findOne(dadosForm.estudante);
      const vaga = await this.vagaService.findOne(dadosForm.vaga);

      if (!estudante || !vaga) {
        req.addFlash('error', 'Estudante ou vaga inválidos');
        return res.redirect(`/candidatura/${id}/atualizacao`);
      }

      await this.candidaturaService.update(id, {
        estudante,
        vaga
      });

      req.addFlash('success', 'Candidatura atualizada com sucesso!');
      return res.redirect('/candidatura');

    } catch (error) {
      req.addFlash('error', 'Erro ao atualizar candidatura');
      return res.redirect(`/candidatura/${id}/atualizacao`);
    }
  }

  // FORM EXCLUSÃO
  @Get('/:id/exclusao')
  @Render('candidatura/formulario-exclusao')
  async formularioExclusao(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const candidatura = await this.candidaturaService.findOne(id);

    if (!candidatura) {
      req.addFlash('error', 'Candidatura não encontrada');
      return res.redirect('/candidatura');
    }

    return { candidatura };
  }

  // CONFIRMAR EXCLUSÃO
  @Post('/:id/excluir-confirmado')
  async excluir(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.candidaturaService.remove(id);

    req.addFlash('success', 'Candidatura excluída com sucesso!');
    return res.redirect('/candidatura');
  }

}
