import { ClienteRequestDTO } from '../../../dtos/clientes/cliente-request.dto';
import { Cliente } from '../../../../domain/entities/cliente';

export const ATUALIZAR_CLIENTE_SERVICE_INTERFACE = Symbol(
  'ATUALIZAR_CLIENTE_SERVICE_INTERFACE',
);
export interface IAtualizarClienteService {
  executar(
    id: number,
    atualizarClienteRequestDTO: ClienteRequestDTO,
  ): Promise<Cliente>;
}
