import { ShoppingCartItem } from './shopping-cart-item';
import { count } from 'rxjs/operators';
import { Product } from './product';

export class ShoppingCart{
    public items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
      this.itemsMap = itemsMap || {};

      for (let productId in itemsMap){
        let item: ShoppingCartItem = itemsMap[productId];
        let x = new ShoppingCartItem();
        Object.assign(x, item);
        x.key = productId;        
        this.items.push(x);
      }        
    }

    getQuantity(product: Product){ 
      let item = this.itemsMap[product.key];
      // console.log("getQuantity" + item.quantity);   

      return item ? item.quantity: 0;      
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