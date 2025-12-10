import { Injectable } from '@nestjs/common';
import { Vaga } from './vaga.entity';

@Injectable()
export class VagaService {

  async getAll() {
    return await Vaga.find({
      relations: ['empresa'],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number) {
    return await Vaga.findOne({
      where: { id },
      relations: ['empresa']
    });
  }

  async create(data: any) {
    const vaga = Vaga.create({
      ...data,
      empresa: { id: data.empresa }
    });

    return await vaga.save();
  }

  async update(id: number, data: any) {
    return await Vaga.update(id, {
      ...data,
      empresa: { id: data.empresa }
    });
  }

  async remove(id: number) {
    return await Vaga.delete(id);
  }

}
