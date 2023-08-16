import { cardapio } from "./controllers/cardapio.controller.js";

/* --- MAIN CLASS --- */
class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    this.valorCompra = 0;

    if(itens && itens.length > 0){
      itens = this.identificarItensEQuantidades(itens);
      const codigoItens = itens.map(item => item[0].trim());
      const quantidadeItens = itens.map(item => item[1].trim());
  
      for(let i = 0; i < codigoItens.length; i++){
        if(quantidadeItens[i] > 0){
          const indexDoItem = cardapio.itens.findIndex(item => item.codigo === codigoItens[i]);

          if(indexDoItem >= 0){
            if(cardapio.itens[indexDoItem].tipo === "extra" && !codigoItens.includes(cardapio.itens[indexDoItem].itemPrincipal)){
              return "Item extra não pode ser pedido sem o principal";
            }else{
              this.valorCompra += cardapio.itens[indexDoItem].valor * quantidadeItens[i];
            }  
          }else{
            return "Item inválido!";
          }
        }else{
          return "Quantidade inválida!";
        }
      }
  
      const pagamentoValido = this.aplicarFormaDePagamento(metodoDePagamento);
      if(!pagamentoValido){
        return "Forma de pagamento inválida!";
      }

      const valorFinalDaCompra =  this.formatarValorFinalDaCompra();
      return valorFinalDaCompra;
    }else{
      return "Não há itens no carrinho de compra!";
    }    
  }

  identificarItensEQuantidades(itensEQuantidades){
    itensEQuantidades = itensEQuantidades.map(item => {
      if(item.includes(',')){
        return item.split(',');
      }else{
        if(/^\d+$/.test(item)){
          return `,${item}`.split(',');
        }else{
          return `${item},`.split(',');
        }
      }
    });

    return itensEQuantidades;
  }

  aplicarFormaDePagamento(formaDePagamento){
    switch(formaDePagamento){
      case "dinheiro":
        this.valorCompra -= this.valorCompra*5/100;
        break;
      case "credito":
        this.valorCompra += this.valorCompra*3/100;
        break;
      case "debito":
        break;
      default: 
        return false;
    }

    return true;
  }

  formatarValorFinalDaCompra(){
    this.valorCompra /= 100;

    return `R$ ${(this.valorCompra).toFixed(2)}`.replace('.',',');
  }
}

export { CaixaDaLanchonete };
