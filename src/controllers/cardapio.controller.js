import { Item } from "../models/item.model.js";
import { Cardapio } from "../models/cardapio.model.js";

/* --- DEFINING NEW MENU (CARDÁPIO) --- */
const cardapio = new Cardapio(
    new Item("cafe","Café", 300, "principal"),
    new Item("chantily", "Chantily (extra do Café)", 150, "extra"),
    new Item("suco", "Suco Natural", 620, "principal"),
    new Item("sanduiche", "Sanduíche", 650, "principal"),
    new Item("queijo", "Queijo (extra do Sanduíche)", 200, "extra"),
    new Item("salgado", "Salgado", 725, "principal"),
    new Item("combo1", "1 Suco e 1 Sanduíche", 950, "combo"),
    new Item("combo2", "1 Café e 1 Sanduíche", 750, "combo")    
);

/* --- DEFINING CHANTILY'S AND CHEESE'S (QUEIJO) MAIN ITEMS --- */
cardapio.itens.map((item) => {
    switch(item.codigo){
        case "chantily":
            item.setItemPrincipal("cafe");
            break;
        case "queijo":
            item.setItemPrincipal("sanduiche");
            break;
        default:
            break;
    }
});

export {cardapio};