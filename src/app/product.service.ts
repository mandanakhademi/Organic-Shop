import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  documentToDomainObject = _ => {
    const object = _.payload.val();
    object.key = _.payload.key;
    return object;
  }

  constructor( private db: AngularFireDatabase) { }

  create(product){
    var createItem :AngularFireList<any> = this.db.list('/products');
    createItem.push(product);

    return createItem.valueChanges();
  }

  getAll(){
    return this.db.list('/products').snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  get(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
