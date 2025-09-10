import { inject, injectable } from 'tsyringe';
import { BaseService } from './base.service';
import { Cliente } from '../entities/cliente';
import { IClienteService } from './_interfaces/cliente-service.interface';
import {
  IClienteRepository,
  CLIENTE_REPOSITORY_INTERFACE,
} from '../repository/cliente-repository.interface';
import { DeleteResult } from 'typeorm';

@injectable()
export class ClienteService
  extends BaseService<Cliente, IClienteRepository>
  implements IClienteService
{
  constructor(
    @inject(CLIENTE_REPOSITORY_INTERFACE)
    private iClienteRepository: IClienteRepository,
  ) {
    super(iClienteRepository);
  }

  async adicionar(cliente: Cliente): Promise<Cliente> {
    return super._adicionar(cliente);
  }

  atualizar(
    id: number,
    atualizarClienteRequestDTO: Cliente,
  ): Promise<Cliente> {
    return super._atualizar(id, atualizarClienteRequestDTO);
  }

  async excluir(cliente: Cliente): Promise<DeleteResult> {
    return super._excluir(cliente);
  }

  async obterPorId(id: number): Promise<Cliente> {
    return await super._obterPorId(id);
  }

  async obterListaPaginada(
    pagina: number,
    qtdItem: number,
    filter?: Record<string, any>,
    order?: Record<string, any>,
  ): Promise<{ total_itens: number; itens: Array<Cliente> }> {
    return await super._obterListaPaginada(pagina, qtdItem, filter, { Nome: 'ASC' });
  }
}
