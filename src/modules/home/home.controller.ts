import { Controller, Get, Render } from '@nestjs/common';
import { EmpresaService } from '../empresa/empresa.service';
import { EstudanteService } from '../estudante/estudante.service';
import { VagaService } from '../vaga/vaga.service';
import { CandidaturaService } from '../candidatura/candidatura.service';

@Controller('/')
export class HomeController {

  constructor(
    private readonly empresaService: EmpresaService,
    private readonly estudanteService: EstudanteService,
    private readonly vagaService: VagaService,
    private readonly candidaturaService: CandidaturaService,
  ) {}

  @Get()
  @Render('home/home')
  async index() {

    const empresas = await this.empresaService.getAll();
    const estudantes = await this.estudanteService.getAll();
    const vagas = await this.vagaService.getAll();
    const candidaturas = await this.candidaturaService.getAll();

    const contadores = {
      empresas: empresas.length,
      estudantes: estudantes.length,
      vagas: vagas.length,
      candidaturas: candidaturas.length
    };

    return { contadores };
  }
}
