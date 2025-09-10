import { Cliente } from '../../../domain/entities/cliente';
import { inject, injectable } from 'tsyringe';
import {
  CLIENTE_SERVICE_INTERFACE,
  IClienteService,
} from '../../../domain/services/_interfaces/cliente-service.interface';
import { ListaClienteResponseDTO } from '../../../application/dtos/clientes/cliente-response.dto';
import { IListarClienteService } from '../_interfaces/cliente/listar-cliente.interface';

@injectable()
export class ListarClienteService implements IListarClienteService {
  private iClienteService: IClienteService;

  constructor(
    @inject(CLIENTE_SERVICE_INTERFACE) iClienteService: IClienteService,
  ) {
    this.iClienteService = iClienteService;
  }

  async executar(
    pagina: number,
    qtdItems: number,
    filtros?: any,
  ): Promise<ListaClienteResponseDTO> {
    const clientes = await this.iClienteService.obterListaPaginada(
      pagina,
      qtdItems,
      filtros,
    );
    return this.mapToResponseDTO(clientes.total_itens, clientes.itens);
  }

  private mapToResponseDTO(
    total_itens: number,
    itens: Array<Cliente>,
  ): ListaClienteResponseDTO {
    return {
      total_itens,
      itens,
    };
  }
}
