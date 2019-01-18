import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
      this.orders$ = this.authService.user$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid).valueChanges()));
       

  }
  
}
