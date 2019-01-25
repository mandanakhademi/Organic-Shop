import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  documentToDomainObject = _ => {
    const object = _.payload.val();
    object.key = _.payload.key;
    return object;
  }

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
  }
}
