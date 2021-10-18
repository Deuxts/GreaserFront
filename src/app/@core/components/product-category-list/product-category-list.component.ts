import { Component, Input, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent {
  @Input() title = 'titulo de categoria';
  @Input() productsList: Array<IProduct> = [];
  myCurrency = CURRENCIES_SYMBOL.MXN;
  constructor() { }

  addToCart($event){

  }

  showProductDetails($event){

  }
}
