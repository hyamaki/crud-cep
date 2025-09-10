import { Cliente } from '../../../../domain/entities/cliente';

export const OBTER_CLIENTE_SERVICE_INTERFACE = Symbol(
  'OBTER_CLIENTE_SERVICE_INTERFACE',
);
export interface IObterClienteService {
  executar(filtro: {
    campo: string;
    valor: string;
  }): Promise<Cliente>;
}
