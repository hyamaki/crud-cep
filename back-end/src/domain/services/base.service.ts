import { DeleteResult } from 'typeorm';
import { BaseEntity } from '../../domain/entities/base';
import { IBaseRepository } from '../repository/base-repository.interface';
import { IBaseService } from './_interfaces/base-service.interface';

export abstract class BaseService<
  T extends BaseEntity,
  R extends IBaseRepository<T>,
> implements IBaseService<T>
{

  protected repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  async _adicionar(entidade: T): Promise<T> {
    return await this.repository._adicionar(entidade);
  }

  async _atualizar(id: number, entidade: T): Promise<T> {
    return await this.repository._atualizar(id, entidade);
  }

  async _excluir(entidade: T): Promise<DeleteResult> {
    return await this.repository._excluir(entidade);
  }

  async _obterPorId(
    id: number,
  ): Promise<T> {
    return await this.repository._obterPorId(id);
  }

  async _obterListaPaginada(
    pagina: number,
    qtdItem: number,
    filter?: Record<string, any>,
    order?: Record<string, any>,
  ): Promise<{ total_itens: number; itens: Array<T> }> {
    return await this.repository._obterListaPaginada(
      pagina,
      qtdItem,
      filter,
      order,
    );
  }
}
