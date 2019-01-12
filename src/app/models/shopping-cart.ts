import { ShoppingCartItem } from './shopping-cart-item';
import { count } from 'rxjs/operators';

export class ShoppingCart{
    public items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
        
        for (let productId in itemsMap){
            let item: ShoppingCartItem = itemsMap[productId];
        
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }

        
    }

    get totalPrice(){
      let sum = 0;     
      for(let index in this.items)
        sum += this.items[index].totalPrice;
      
      return sum;
    }

    get totalItemsCount(){
      let count = 0;     
      for(let productId in this.itemsMap)
        count += this.itemsMap[productId].quantity;
      return count;
        
    }
}