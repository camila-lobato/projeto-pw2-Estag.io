import { Injectable } from '@nestjs/common';
import { Empresa } from './empresa.entity';

@Injectable()
export class EmpresaService {
  async getAll() {
    return await Empresa.find();
  }

  async findOne(id: number) {
    return await Empresa.findOne({ where: { id } });
  }

 async create(data: any) {
  try {
    const empresa = Empresa.create(data);
    return await empresa.save();
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('O e-mail informado já está em uso.');
    }
    throw error;
  }
}

  async update(id: number, data: any) {
    return await Empresa.update(id, data);
  }

  async remove(id: number) {
    return await Empresa.delete(id);
  }



}
