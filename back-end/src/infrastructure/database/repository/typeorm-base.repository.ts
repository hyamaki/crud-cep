import { BaseEntity } from '../../../domain/entities/base';
import { BaseEntity as TypeORMBaseEntity } from '../../../infrastructure/database/entities/base.entity';
import { IBaseRepository } from '../../../domain/repository/base-repository.interface';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';

export abstract class TypeOrmBaseRepository<
  TDomain extends BaseEntity,
  T extends TypeORMBaseEntity,
> implements IBaseRepository<TDomain>
{
  protected constructor(
    protected ormRepository: Repository<TypeORMBaseEntity>,
  ) {}

  protected abstract toDomain(entity: TypeORMBaseEntity): TDomain;
  protected abstract toPersistence(domain: TDomain): TypeORMBaseEntity;

  async _adicionar(dominio: TDomain): Promise<TDomain> {
    const entidade = this.toPersistence(dominio);
    const entidadeTypeORM = this.ormRepository.create(entidade);
    const entidadeSalva = await this.ormRepository.save(entidadeTypeORM);
    return this.toDomain(entidadeSalva);
  }

  async _atualizar(id: number, dominio: TDomain): Promise<TDomain> {
    const entidade = this.toPersistence(dominio);
    const entidadeTypeORM = this.ormRepository.create(entidade);
    const entidadeSalva = await this.ormRepository.save(entidadeTypeORM);
    return this.toDomain(entidadeSalva);
  }

  async _excluir(entidade: TDomain): Promise<DeleteResult> {
    return await this.ormRepository.delete(entidade.ID!);
  }

  async _obterPorId(
    id: number,
  ): Promise<TDomain> {
    const entidadeBuscada = await this.ormRepository.findOneOrFail({
      where: { ID: id } as FindOptionsWhere<T>,
    });
    return this.toDomain(entidadeBuscada);
  }

  async _obterListaPaginada(
    pagina: number = 1,
    qtdItem: number = 10,
    filter?: Record<string, any>,
    order?: Record<string, any>,
  ): Promise<{ total_itens: number; itens: Array<TDomain> }> {
    const skip = (pagina - 1) * qtdItem;

    const [itens, total_itens] = await this.ormRepository.findAndCount({
      where: filter as FindOptionsWhere<T>,
      skip,
      take: qtdItem,
      ...order,
    });

    return {
      total_itens,
      itens: itens.map(this.toDomain.bind(this)),
    };
  }
}
