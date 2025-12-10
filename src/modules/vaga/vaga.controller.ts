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
  Res
} from '@nestjs/common';

import { Request, Response } from 'express';
import { EmpresaService } from '../empresa/empresa.service';
import { VagaService } from './vaga.service';

@Controller('/vaga')
export class VagaController {

  constructor(
    private readonly vagaService: VagaService,
    private readonly empresaService: EmpresaService
  ) {}

  @Get()
  @Render('vaga/listagem')
  async listagem() {
    const vagas = await this.vagaService.getAll();
    return { vagas };
  }

  @Get('/novo')
  @Render('vaga/formulario-cadastro')
  async formCadastro() {
    const empresas = await this.empresaService.getAll();
    return { empresas };
  }

  @Post('/novo/salvar')
  async salvarCadastro(
    @Body() dadosForm: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      await this.vagaService.create(dadosForm);
      req.addFlash('success', 'Vaga cadastrada com sucesso!');
      return res.redirect('/vaga');
    } catch (e) {
      req.addFlash('error', e.message);
      req.setOld(dadosForm);
      return res.redirect('/vaga/novo');
    }
  }

 @Get('/:id/atualizacao')
@Render('vaga/formulario-atualizacao')
async formAtualizacao(
  @Param('id') id: number,
  @Res() res: Response
) {
  const vaga = await this.vagaService.findOne(id);
  const empresas = await this.empresaService.getAll();

  if (!vaga) {
    return res.redirect('/vaga');
  }

  return { vaga, empresas };
}


  @Post('/:id/atualizacao-salvar')
  async atualizar(
    @Param('id') id: number,
    @Body() dados: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    await this.vagaService.update(id, dados);

    req.addFlash('success', 'Vaga atualizada com sucesso!');
    return res.redirect('/vaga');
  }

  @Get('/:id/exclusao')
  @Render('vaga/formulario-exclusao')
  async formExcluir(@Param('id') id: number) {
    const vaga = await this.vagaService.findOne(id);
    return { vaga };
  }

  @Post('/:id/exclusao')
  async excluir(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    await this.vagaService.remove(id);
    req.addFlash('success', 'Vaga excluída com sucesso!');
    return res.redirect('/vaga');
  }

}
