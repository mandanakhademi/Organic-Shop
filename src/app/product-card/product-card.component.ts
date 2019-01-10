import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: Boolean = true;
  @Input('shopping-cart') ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    
    if (!this.ShoppingCart) return 0;

    let item = this.ShoppingCart.itemsMap[this.product.key];
    return item ? item.quantity: 0;
    
  }

  

}
