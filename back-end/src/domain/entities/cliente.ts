import { BaseEntity } from './base';

export class Cliente extends BaseEntity {
  ID: number | undefined
  idUsuario: number
  DataHoraCadastro: Date | undefined
  Codigo: string
  Nome: string
  CPF_CNPJ: string
  CEP: number | null
  Logradouro: string
  Endereco: string
  Numero: string
  Bairro: string
  Cidade: string
  UF: string
  Fone: string
  LimiteCredito: number
  Validade: Date | null

  constructor(
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
  ) {
    super();
    this.ID = ID
    this.idUsuario = idUsuario
    this.DataHoraCadastro = DataHoraCadastro != undefined ? DataHoraCadastro : new Date()
    this.Codigo = Codigo
    this.Nome = Nome
    this.CPF_CNPJ = CPF_CNPJ
    this.CEP = CEP
    this.Logradouro = Logradouro
    this.Endereco = Endereco
    this.Numero = Numero
    this.Bairro = Bairro
    this.Cidade = Cidade
    this.UF = UF
    this.Fone = Fone
    this.LimiteCredito = LimiteCredito
    this.Validade = Validade
  }


  tipoValido(tipo: number): boolean {
    if (tipo !== 1 && tipo !== 2 && tipo !== 3) {
      return false;
    }
    return true;
  }
}
