import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estudante } from '../estudante/estudante.entity';
import { Vaga } from '../vaga/vaga.entity';

@Entity('candidaturas')
export class Candidatura extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Estudante, { eager: true, onDelete: 'CASCADE' })
  estudante: Estudante;

  @ManyToOne(() => Vaga, { eager: true, onDelete: 'CASCADE' })
  vaga: Vaga;

  @CreateDateColumn()
  dataCandidatura: Date;
}
