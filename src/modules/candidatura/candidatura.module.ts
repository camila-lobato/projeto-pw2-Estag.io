import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CandidaturaController } from './candidatura.controller';
import { CandidaturaService } from './candidatura.service';
import { Candidatura } from './candidatura.entity';

import { EstudanteModule } from '../estudante/estudante.module';
import { VagaModule } from '../vaga/vaga.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidatura]),
    EstudanteModule,
    VagaModule
  ],
  controllers: [CandidaturaController],
  providers: [CandidaturaService],
})
export class CandidaturaModule {}
