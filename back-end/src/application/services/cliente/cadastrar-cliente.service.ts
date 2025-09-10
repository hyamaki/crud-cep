import { Cliente } from '../../../domain/entities/cliente';
import { ICadastrarClienteService } from '../_interfaces/cliente/cadastrar-cliente.interface';
import { ClienteRequestDTO } from '../../dtos/clientes/cliente-request.dto';
import { inject, injectable } from 'tsyringe';
import {
  CLIENTE_SERVICE_INTERFACE,
  IClienteService,
} from '../../../domain/services/_interfaces/cliente-service.interface';
import { ClienteFactory } from '../../../domain/factories/cliente.factory';

@injectable()
export class CadastrarClienteService
  implements ICadastrarClienteService
{
  constructor(
    @inject(CLIENTE_SERVICE_INTERFACE)
    private iClienteService: IClienteService,
  ) {
    this.iClienteService = iClienteService;
  }

  async executar(
    cadastrarClienteRequestDTO: ClienteRequestDTO,
  ): Promise<Cliente> {
    const cliente = ClienteFactory.create(
      cadastrarClienteRequestDTO.ID,
      cadastrarClienteRequestDTO.idUsuario,
      new Date(),
      cadastrarClienteRequestDTO.Codigo,
      cadastrarClienteRequestDTO.Nome,
      cadastrarClienteRequestDTO.CPF_CNPJ,
      cadastrarClienteRequestDTO.CEP,
      cadastrarClienteRequestDTO.Logradouro,
      cadastrarClienteRequestDTO.Endereco,
      cadastrarClienteRequestDTO.Numero,
      cadastrarClienteRequestDTO.Bairro,
      cadastrarClienteRequestDTO.Cidade,
      cadastrarClienteRequestDTO.UF,
      cadastrarClienteRequestDTO.Fone,
      cadastrarClienteRequestDTO.LimiteCredito,
      cadastrarClienteRequestDTO.Validade,
    );
    const clienteCadastrado =
      await this.iClienteService.adicionar(cliente);

    return clienteCadastrado;
  }
}
