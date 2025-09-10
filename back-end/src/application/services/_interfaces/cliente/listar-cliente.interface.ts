import { ListaClienteResponseDTO } from '../../../dtos/clientes/cliente-response.dto';

export const LISTAR_CLIENTE_SERVICE_INTERFACE = Symbol(
  'LISTAR_CLIENTE_SERVICE_INTERFACE',
);
export interface IListarClienteService {
  executar(
    pagina: number,
    qtdItems: number,
    filtros?: any
  ): Promise<ListaClienteResponseDTO>;
}
