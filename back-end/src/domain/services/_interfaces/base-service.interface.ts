import { DeleteResult } from 'typeorm';
import { BaseEntity } from '../../../domain/entities/base';

export const BASE_SERVICE_INTERFACE = Symbol('BASE_SERVICE_INTERFACE');
export interface IBaseService<T extends BaseEntity> {
  _adicionar(entidade: Partial<T>): Promise<T>;
  _atualizar(id: number, entidade: Partial<T>): Promise<T>;
  _excluir(entidade: Partial<T>): Promise<DeleteResult>;
  _obterPorId(id: number): Promise<T>;
  _obterListaPaginada(
    pagina: number,
    qtdItem: number,
    filter?: Record<string, any>,
    order?: Record<string, any>,
  ): Promise<{ total_itens: number; itens: Array<T> }>;
}
