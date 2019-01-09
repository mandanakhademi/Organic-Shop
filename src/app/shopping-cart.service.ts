import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string){
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;   
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;     
  }



  async addToCart( product: Product){
    let cartId = await this.getOrCreateCartId();
    let itemObject = this.getItem(cartId, product.key);
    itemObject.valueChanges().pipe(take<any>(1)).subscribe(item => {
    if (item) itemObject.update({ quantity: item.quantity + 1});
    else itemObject.set({ product: product, quantity: 1});
    // let itemPromise = () => itemObject.valueChanges().pipe(take<any>(1)).toPromise();
    // let item = await itemPromise();
    // if (item) itemObject.update({ quantity: item.quantity + 1});
    // else itemObject.set({ product: product, quantity: 1});

    });
    
    
      
    
  }
}
