export enum TipoCategoriaEnum {
  SERVICO = 1,
  PRODUTO = 2,
  PRODUTO_E_SERVICO = 3,
}

export const obterTipoDaCategoria = (id : number) : string | undefined => {
  const tipos = new Map()
    .set(1, 'Serviço')
    .set(2, 'Produto')
    .set(3, 'Produtos e Serviços')

  return tipos.get(id);
}