import { Module } from '@nestjs/common';

import { HomeController } from './home.controller';

import { EmpresaService } from '../empresa/empresa.service';
import { EstudanteService } from '../estudante/estudante.service';
import { VagaService } from '../vaga/vaga.service';
import { CandidaturaService } from '../candidatura/candidatura.service';

@Module({
  controllers: [HomeController],
  providers: [
    EmpresaService,
    EstudanteService,
    VagaService,
    CandidaturaService
  ]
})
export class HomeModule {}
