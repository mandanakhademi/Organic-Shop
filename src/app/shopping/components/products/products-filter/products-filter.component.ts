import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  // tslint:disable-next-line:no-input-rename
  @Input('category') category;

  constructor( categoryService: CategoryService ) {
    this.categories$ = categoryService.getAll();

  }

  ngOnInit() {
  }

}
