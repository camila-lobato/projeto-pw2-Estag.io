import { Injectable } from '@nestjs/common';
import { Estudante } from './estudante.entity';

@Injectable()
export class EstudanteService {

  async getAll() {
    return await Estudante.find();
  }

  async findOne(id: number) {
    return await Estudante.findOne({ where: { id } });
  }

  async create(data: any) {
    const estudante = Estudante.create(data);
    return await estudante.save();
  }

  async update(id: number, data: any) {
    return await Estudante.update(id, data);
  }

  async remove(id: number) {
    return await Estudante.delete(id);
  }
}
