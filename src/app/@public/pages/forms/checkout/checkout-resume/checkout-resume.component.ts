import { ICart } from './../../../../core/components/shopping-cart/shopping-cart.interface';
import { CartService } from '@shop/core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';

@Component({
  selector: 'app-checkout-resume',
  templateUrl: './checkout-resume.component.html',
  styleUrls: ['./checkout-resume.component.scss']
})
export class CheckoutResumeComponent implements OnInit {
  cart: ICart;

  myCurrency = CURRENCIES_SYMBOL.MXN;
  constructor(private cartService: CartService) {
    this.cartService.itemVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
  }

}
