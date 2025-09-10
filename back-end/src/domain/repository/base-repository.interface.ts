import { DeleteResult } from 'typeorm';
import { BaseEntity } from '../../domain/entities/base';

export interface IBaseRepository<T extends BaseEntity> {
  _adicionar(entidade: T): Promise<T>;
  _atualizar(id: number, entidade: T): Promise<T>;
  _excluir(entidade: T): Promise<DeleteResult>;
  _obterPorId(id: number): Promise<T>;
  _obterListaPaginada(
    pagina: number,
    qtdItem: number,
    filter?: Record<string, any>,
    order?: Record<string, any>,
  ): Promise<{ total_itens: number; itens: Array<T> }>;
}
