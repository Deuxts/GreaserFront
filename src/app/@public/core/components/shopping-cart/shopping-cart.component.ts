import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ICart } from './shopping-cart.interface';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  myCurrency = CURRENCIES_SYMBOL.MXN;
  cart: ICart;
  constructor( private cartService: CartService) {
    this.cartService.itemVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
    console.log('carrito', this.cart);
  }
  closeNav(){
    this.cartService.closeNav();
  }

  clear(){
    this.cartService.clear();
  }

  cleanItem(product: IProduct){
    this.manageProductUnitInfo(0, product);
  }

  changeValue(qty: number, product: IProduct){
    this.manageProductUnitInfo(qty, product);
  }

  manageProductUnitInfo(qty: number, product: IProduct){
    product.qty = qty;
    this.cartService.manageProduct(product);
  }

  proccess(){}
}
