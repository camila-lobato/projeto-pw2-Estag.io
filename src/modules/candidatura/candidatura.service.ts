import { Injectable } from '@nestjs/common';
import { Candidatura } from './candidatura.entity';

@Injectable()
export class CandidaturaService {

  async getAll() {
    return await Candidatura.find({
      relations: ['estudante', 'vaga', 'vaga.empresa']
    });
  }

  async findOne(id: number) {
    return await Candidatura.findOne({
      where: { id },
      relations: ['estudante', 'vaga', 'vaga.empresa']
    });
  }

  async create(data: any) {
    const candidatura = Candidatura.create(data);
    return await candidatura.save();
  }

  async update(id: number, data: any) {
    return await Candidatura.update(id, data);
  }

  async remove(id: number) {
    return await Candidatura.delete(id);
  }

}
