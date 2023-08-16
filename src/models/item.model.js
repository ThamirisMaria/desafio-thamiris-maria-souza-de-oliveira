class Item {
  constructor(codigo, descricao, valor, tipo) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.valor = valor;
    this.tipo = tipo;
  }

  setItemPrincipal(codigoItemPrincipal){
    if(this.tipo === "extra"){
      return this.itemPrincipal = codigoItemPrincipal;
    }else{
      this.itemPrincipal = null;
      return 'Apenas itens do tipo "extra" podem ser ligados à um item principal.';
    }
  }
}

export { Item };