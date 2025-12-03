import {  MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashMiddleware } from './common/middlewares/flash.middleware';
import { OldMiddleware } from './common/middlewares/old.middleware';
import { EstudanteModule } from './modules/estudante/estudante.module';
import { VagaModule } from './modules/vaga/vaga.module';
import { CandidaturaModule } from './modules/candidatura/candidatura.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'estagio',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    EmpresaModule,
    EstudanteModule,
    VagaModule,
    CandidaturaModule
    
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FlashMiddleware, OldMiddleware)
      .forRoutes('*');
  }
}

