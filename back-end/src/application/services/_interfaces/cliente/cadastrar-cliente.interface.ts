import { ClienteRequestDTO } from '../../../dtos/clientes/cliente-request.dto';
import { Cliente } from '../../../../domain/entities/cliente';

export const CADASTRAR_CLIENTE_SERVICE_INTERFACE = Symbol(
  'CADASTRAR_CLIENTE_SERVICE_INTERFACE',
);
export interface ICadastrarClienteService {
  executar(
    cadastrarClienteRequestDTO: ClienteRequestDTO,
  ): Promise<Cliente>;
}
