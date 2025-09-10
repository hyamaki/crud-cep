import { Cliente } from '../../../domain/entities/cliente';
import { inject, injectable } from 'tsyringe';
import {
  CLIENTE_SERVICE_INTERFACE,
  IClienteService,
} from '../../../domain/services/_interfaces/cliente-service.interface';
import { ClienteResponseDTO } from '../../../application/dtos/clientes/cliente-response.dto';
import { IObterClienteService } from '../_interfaces/cliente/obter-cliente.interface';
import { ApplicationException } from '../../../shared/exceptions/application.exception';

@injectable()
export class ObterClienteService implements IObterClienteService {
  private iClienteService: IClienteService;

  constructor(
    @inject(CLIENTE_SERVICE_INTERFACE) iClienteService: IClienteService,
  ) {
    this.iClienteService = iClienteService;
  }

  async executar(filtro: {
    campo: string;
    valor: string;
  }): Promise<Cliente> {
    const cliente = await this.iClienteService.obterPorId(parseInt(filtro.valor));

    if (cliente === null) {
      throw new ApplicationException(
        'Cliente não encontrado',
        404,
        'Cliente não encontrado',
      );
    }

    return cliente;
  }
}
