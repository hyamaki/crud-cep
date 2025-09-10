import { Cliente } from '../entities/cliente';

export class ClienteFactory {
  static create(
    ID: number | undefined,
    idUsuario: number,
    DataHoraCadastro: Date | undefined,
    Codigo: string,
    Nome: string,
    CPF_CNPJ: string,
    CEP: number | null,
    Logradouro: string,
    Endereco: string,
    Numero: string,
    Bairro: string,
    Cidade: string,
    UF: string,
    Fone: string,
    LimiteCredito: number,
    Validade: Date | null,
  ): Cliente {
    const cliente = new Cliente(
      ID,
      idUsuario,
      DataHoraCadastro,
      Codigo,
      Nome,
      CPF_CNPJ,
      CEP,
      Logradouro,
      Endereco,
      Numero,
      Bairro,
      Cidade,
      UF,
      Fone,
      LimiteCredito,
      Validade,
    );

    return cliente;
  }
}
