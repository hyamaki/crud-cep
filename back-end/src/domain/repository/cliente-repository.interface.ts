import { IBaseRepository } from './base-repository.interface';
import { Cliente } from '../entities/cliente';

export const CLIENTE_REPOSITORY_INTERFACE = Symbol(
  'CLIENTE_REPOSITORY_INTERFACE',
);
export interface IClienteRepository
  extends IBaseRepository<Cliente> {}
