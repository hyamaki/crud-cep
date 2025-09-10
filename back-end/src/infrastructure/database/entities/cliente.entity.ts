import { Entity, Column, CreateDateColumn } from "typeorm";
import { BaseEntity } from './base.entity';

@Entity({ name: 'clientes' })
export class ClienteEntity extends BaseEntity {

  @Column({ type: "bigint", unsigned: true })
  idUsuario: number;

  @CreateDateColumn({ type: "datetime", default: () => "now()" })
  DataHoraCadastro: Date;

  @Column({ type: "varchar", length: 15 })
  Codigo: string;

  @Column({ type: "varchar", length: 150 })
  Nome: string;

  @Column({ type: "varchar", length: 20 })
  CPF_CNPJ: string;

  @Column({ type: "integer", nullable: true })
  CEP: number | null;

  @Column({ type: "varchar", length: 100 })
  Logradouro: string;

  @Column({ type: "varchar", length: 120 })
  Endereco: string;

  @Column({ type: "varchar", length: 20 })
  Numero: string;

  @Column({ type: "varchar", length: 50 })
  Bairro: string;

  @Column({ type: "varchar", length: 60 })
  Cidade: string;

  @Column({ type: "varchar", length: 2 })
  UF: string;

  @Column({ type: "varchar", length: 15 })
  Fone: string;

  @Column({ type: "float", unsigned: true, default: 0 })
  LimiteCredito: number;

  @Column({ type: "date", nullable: true })
  Validade: Date | null;
}
