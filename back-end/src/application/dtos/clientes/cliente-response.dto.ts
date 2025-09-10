import { Cliente } from "../../../domain/entities/cliente";

export interface ClienteResponseDTO {
  ID: number;
  idUsuario: number;
  DataHoraCadastro: Date;
  Codigo: string;
  Nome: string;
  CPF_CNPJ: string;
  CEP: number | null;
  Logradouro: string;
  Endereco: string;
  Numero: string;
  Bairro: string;
  Cidade: string;
  UF: string;
  Fone: string;
  LimiteCredito: number;
  Validade: Date | null;
}

export interface ListaClienteResponseDTO {
  total_itens: number;
  itens: Array<Cliente>;
}