import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';

export enum Modalidade {
  Presencial = 'Presencial',
  Hibrido = 'Híbrido',
  Remoto = 'Remoto',
}

@Entity('vagas')
export class Vaga extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({
    type: 'enum',
    enum: Modalidade,
  })
  modalidade: Modalidade;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  salario: number;

  @Column({ nullable: true })
  localidade: string;

 @ManyToOne(() => Empresa, { onDelete: 'CASCADE' })
empresa: Empresa;


  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

}
