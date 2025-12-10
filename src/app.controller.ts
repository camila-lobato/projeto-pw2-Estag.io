import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  home() {
    return { titulo: this.appService.getTitulo() };
  }

  
 @Get('/sobre')
  @Render('sobre')
  sobre() {
    return { titulo: this.appService.getTitulo() };
  }}
