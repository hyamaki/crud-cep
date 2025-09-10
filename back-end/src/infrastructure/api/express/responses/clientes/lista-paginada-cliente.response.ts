import { Cliente } from '../../../../../domain/entities/cliente';

class ListaPaginadaClienteResponse {
  static serialize(
    data: Record<string, any>,
    currentPage: number,
    pageSize: number,
  ) {
    const listaClienteSerializada = data.itens.map((cliente: Cliente) => {
      return {
        ID: cliente.ID,
        idUsuario: cliente.idUsuario,
        DataHoraCadastro: cliente.DataHoraCadastro,
        Codigo: cliente.Codigo,
        Nome: cliente.Nome,
        CPF_CNPJ: cliente.CPF_CNPJ,
        CEP: cliente.CEP,
        Logradouro: cliente.Logradouro,
        Endereco: cliente.Endereco,
        Numero: cliente.Numero,
        Bairro: cliente.Bairro,
        Cidade: cliente.Cidade,
        UF: cliente.UF,
        Fone: cliente.Fone,
        LimiteCredito: cliente.LimiteCredito,
        Validade: cliente.Validade,
      };
    });

    const response = {
      total_items: data.total_itens,
      total_pages: Math.ceil(data.total_itens / pageSize),
      current_page: currentPage,
      list: listaClienteSerializada,
    };

    return response;
  }
}

export { ListaPaginadaClienteResponse };
