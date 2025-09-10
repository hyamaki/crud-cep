import { Cliente } from '../../../domain/entities/cliente';
import { IAtualizarClienteService } from '../_interfaces/cliente/atualizar-cliente.interface';
import { ClienteRequestDTO } from '../../dtos/clientes/cliente-request.dto';
import { inject, injectable } from 'tsyringe';
import {
  IClienteService,
  CLIENTE_SERVICE_INTERFACE,
} from '../../../domain/services/_interfaces/cliente-service.interface';
import { ClienteFactory } from '../../../domain/factories/cliente.factory';
import { ApplicationException } from '../../../shared/exceptions/application.exception';

@injectable()
export class AtualizarClienteService
  implements IAtualizarClienteService
{
  constructor(
    @inject(CLIENTE_SERVICE_INTERFACE)
    private iClienteService: IClienteService,
  ) {
    this.iClienteService = iClienteService;
  }

  async executar(
    id: number,
    atualizarClienteRequestDTO: ClienteRequestDTO,
  ): Promise<Cliente> {
    const cliente = await this.iClienteService._obterPorId(id);

    if (cliente === null) {
      throw new ApplicationException(
        'Cliente não encontrado',
        404,
        'Cliente não encontrado',
      );
    }

    const dadosCliente = ClienteFactory.create(
      cliente.ID,
      atualizarClienteRequestDTO.idUsuario,
      new Date(),
      atualizarClienteRequestDTO.Codigo,
      atualizarClienteRequestDTO.Nome,
      atualizarClienteRequestDTO.CPF_CNPJ,
      atualizarClienteRequestDTO.CEP,
      atualizarClienteRequestDTO.Logradouro,
      atualizarClienteRequestDTO.Endereco,
      atualizarClienteRequestDTO.Numero,
      atualizarClienteRequestDTO.Bairro,
      atualizarClienteRequestDTO.Cidade,
      atualizarClienteRequestDTO.UF,
      atualizarClienteRequestDTO.Fone,
      atualizarClienteRequestDTO.LimiteCredito,
      atualizarClienteRequestDTO.Validade,
    );

    const clienteAtualizada = await this.iClienteService.atualizar(
      id,
      dadosCliente,
    );

    return clienteAtualizada;
  }
}
