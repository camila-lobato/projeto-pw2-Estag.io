import { Module } from '@nestjs/common';
import { EmpresaService } from '../empresa/empresa.service';
import { VagaController } from './vaga.controller';
import { VagaService } from './vaga.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaga } from './vaga.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Vaga])
    ],
  controllers: [VagaController],
  providers: [VagaService, EmpresaService],
  exports: [VagaService]
})
export class VagaModule {}
