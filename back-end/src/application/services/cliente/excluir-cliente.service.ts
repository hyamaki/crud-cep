import { Cliente } from '../../../domain/entities/cliente';
import { inject, injectable } from 'tsyringe';
import {
  CLIENTE_SERVICE_INTERFACE,
  IClienteService,
} from '../../../domain/services/_interfaces/cliente-service.interface';
import { ClienteResponseDTO } from '../../dtos/clientes/cliente-response.dto';
import { IExcluirClienteService } from '../_interfaces/cliente/excluir-cliente.interface';
import { ApplicationException } from '../../../shared/exceptions/application.exception';

@injectable()
export class ExcluirClienteService implements IExcluirClienteService {
  private iClienteService: IClienteService;

  constructor(
    @inject(CLIENTE_SERVICE_INTERFACE) iClienteService: IClienteService,
  ) {
    this.iClienteService = iClienteService;
  }

  async executar(id: number): Promise<Cliente> {
    const cliente = await this.iClienteService.obterPorId(id);

    if (cliente === null) {
      throw new ApplicationException(
        'Cliente não encontrado',
        404,
        'Cliente não encontrado',
      );
    }

    const deleteResult = await this.iClienteService.excluir(cliente);
    console.log(deleteResult);

    return cliente;
  }
}
