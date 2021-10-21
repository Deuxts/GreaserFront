import { ICart } from './../../../core/components/shopping-cart/shopping-cart.interface';
import { CartService } from '@shop/core/services/cart.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products.service';
import products from '@data/products.json';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: IProduct;
  // products[Math.floor(Math.random() * products.length)];
  selectImage: string;
  myCurrency = CURRENCIES_SYMBOL.MXN;
  relationalProducts: Array<object> = [];
  randomItems: Array<IProduct> = [];
  constructor( private productService: ProductsService, private activateRoute: ActivatedRoute, private cartSerive: CartService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      console.log('parametros: ', +params.id);
      this.loadDataValue(+params.id);
      this.productService.getRandomItem().subscribe( result => {
        console.log('random', result);
        this.randomItems = result;
      });
    });

    this.cartSerive.itemVar$.subscribe((data: ICart) => {
      if (data.subtotal === 0) {
        this.product.qty = 1;
        return;
      }
      this.product.qty = this.findProduct(+this.product.id).qty;
    });
  }

  findProduct(id: number){
    return this.cartSerive.cart.products.find( item => +item.id === id);
  }

  selectOtherPlatform($event){
    console.log($event.target.value);
    this.loadDataValue(+$event.target.value);
  }

  changeValue(qty: number){
    this.product.qty = qty;
  }

  loadDataValue(id: number){
    this.productService.getItem(id).subscribe(result => {
      console.log('indefinido?: ', result.relational);
      this.product = result.product;
      const saveProduct = this.findProduct(+this.product.id);
      this.product.qty = (saveProduct !== undefined) ? saveProduct.qty : this.product.qty;
      this.selectImage = this.product.img;
      this.product.description = result.relational.size;
      this.relationalProducts = result.relational.relationalProducts;
    });
  }
  addToCart(){
    this.cartSerive.manageProduct(this.product);
  }
}
