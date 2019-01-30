import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import { take, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { promise } from 'protractor';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object<any>('/shopping-carts/' + cartId).valueChanges()
    .pipe(map( x => new ShoppingCart(x.items)));

  }

  async addToCart( product: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemObject = this.getItem(cartId, product.key);
    itemObject.valueChanges().pipe(take<any>(1)).subscribe(item => {
      if (item) { itemObject.update({ quantity: item.quantity + 1}); } else { itemObject.set({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1
      });
      }

      // let itemPromise = () => itemObject.valueChanges().pipe(take<any>(1)).toPromise();
      // let item = await itemPromise();
      // if (item) itemObject.update({ quantity: item.quantity + 1});
      // else itemObject.set({ product: product, quantity: 1});

    });
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemObject = this.getItem(cartId, product.key);
    itemObject.valueChanges().pipe(take<any>(1)).subscribe(item => {
      if (item) {
        const quantity = item.quantity - 1;
        if (quantity === 0) { itemObject.remove(); } else { itemObject.update({ quantity: item.quantity - 1}); }
      }
    });
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

}
