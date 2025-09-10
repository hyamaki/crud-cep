import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { IClienteRepository } from '../../../domain/repository/cliente-repository.interface';
import { ClienteEntity } from '../entities/cliente.entity';
import { TypeOrmBaseRepository } from './typeorm-base.repository';
import { Cliente } from '../../../domain/entities/cliente';
import { ClienteFactory } from '../../../domain/factories/cliente.factory';

export const TYPEORM_CLIENTE_REPOSITORY_INTERFACE = Symbol(
  'TYPEORM_CLIENTE_REPOSITORY_INTERFACE',
);

@injectable()
export class TypeORMClienteRepository
  extends TypeOrmBaseRepository<Cliente, ClienteEntity>
  implements IClienteRepository
{
  constructor(
    @inject(TYPEORM_CLIENTE_REPOSITORY_INTERFACE)
    protected ormRepository: Repository<ClienteEntity>,
  ) {
    super(ormRepository);
  }

  protected toDomain(entity: ClienteEntity): Cliente {
    return ClienteFactory.create(
      entity.ID,
      entity.idUsuario,
      entity.DataHoraCadastro,
      entity.Codigo,
      entity.Nome,
      entity.CPF_CNPJ,
      entity.CEP,
      entity.Logradouro,
      entity.Endereco,
      entity.Numero,
      entity.Bairro,
      entity.Cidade,
      entity.UF,
      entity.Fone,
      entity.LimiteCredito,
      entity.Validade,
    );
  }

  protected toPersistence(domain: Cliente): ClienteEntity {
    return {
      ID: domain.ID,
      idUsuario: domain.idUsuario,
      DataHoraCadastro: domain.DataHoraCadastro,
      Codigo: domain.Codigo,
      Nome: domain.Nome,
      CPF_CNPJ: domain.CPF_CNPJ,
      CEP: domain.CEP,
      Logradouro: domain.Logradouro,
      Endereco: domain.Endereco,
      Numero: domain.Numero,
      Bairro: domain.Bairro,
      Cidade: domain.Cidade,
      UF: domain.UF,
      Fone: domain.Fone,
      LimiteCredito: domain.LimiteCredito,
      Validade: domain.Validade,
    } as ClienteEntity;
  }
}
