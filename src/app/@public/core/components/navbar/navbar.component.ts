import { ICart } from './../shopping-cart/shopping-cart.interface';
import { CartService } from './../../services/cart.service';
import { IMeData } from '@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import shopMenu from '@data/menu/shop.json';
import { ImenuItem } from '@core/interfaces/menu-item.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartItemsTotal: number;
  cartt: ICart;
  menuItems: Array<ImenuItem> = shopMenu;
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService, private cart: CartService) {
    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
    });

    this.cart.itemVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cartItemsTotal = data.subtotal;
      }
    });
  }
  logout() {
    this.authService.resetSession();
  }
  ngOnInit(): void {
    this.cartItemsTotal = this.cart.initialize().subtotal;
  }
  open(){
    this.cart.openNav();
  }

}
