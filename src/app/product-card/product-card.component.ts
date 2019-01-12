import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: Boolean = true;
  @Input('shopping-cart') ShoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  } 

}
