import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db: AngularFireDatabase) { }

  create(product){
    var createItem :AngularFireList<any> = this.db.list('/products');
    createItem.push(product);

    return createItem.valueChanges();
  }
}
