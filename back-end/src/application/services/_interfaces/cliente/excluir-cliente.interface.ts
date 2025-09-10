import { Cliente } from '../../../../domain/entities/cliente';

export const EXCLUIR_CLIENTE_SERVICE_INTERFACE = Symbol(
  'EXCLUIR_CLIENTE_SERVICE_INTERFACE',
);
export interface IExcluirClienteService {
  executar(id: number): Promise<Cliente>;
}
