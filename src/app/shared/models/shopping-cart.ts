import { ShoppingCartItem } from './shopping-cart-item';
import { count } from 'rxjs/operators';
import { Product } from './product';

export class ShoppingCart {
    public items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
      this.itemsMap = itemsMap || {};

      // tslint:disable-next-line:forin
      for (const productId in itemsMap) {
        const item: ShoppingCartItem = itemsMap[productId];
        this.items.push(new ShoppingCartItem({ ...item, key: productId }));
      }
    }

    getQuantity(product: Product) {
      const item = this.itemsMap[product.key];
      // console.log("getQuantity" + item.quantity);

      return item ? item.quantity : 0;
    }

    get totalPrice() {
      let sum = 0;
      // tslint:disable-next-line:forin
      for (const index in this.items) {
        sum += this.items[index].totalPrice;
      }

      return sum;
    }

    get totalItemsCount() {
      // tslint:disable-next-line:no-shadowed-variable
      let count = 0;
      // tslint:disable-next-line:forin
      for (const productId in this.itemsMap) {
        count += this.itemsMap[productId].quantity;
      }
      return count;

    }
}
