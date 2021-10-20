import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() description = '';
  myCurrency = CURRENCIES_SYMBOL.MXN;
  constructor(private router: Router) { }

  addToCart($event){

  }

  showProductDetails($event: IProduct){
    this.router.navigate(['ropa/details', +$event.id]);
  }
}
