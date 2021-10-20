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
  constructor( private productService: ProductsService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      console.log('parametros: ', +params.id);
      this.loadDataValue(+params.id);
      this.productService.getRandomItem().subscribe( result => {
        console.log('random', result);
        this.randomItems = result;
      });
    });
  }

  selectOtherPlatform($event){
    console.log($event.target.value);
    this.loadDataValue(+$event.target.value);
  }

  changeValue(qty: number){}

  loadDataValue(id: number){
    this.productService.getItem(id).subscribe(result => {
      console.log('indefinido?: ', result.relational);
      this.product = result.product;
      this.selectImage = this.product.img;
      this.product.description = result.relational.size;
      this.relationalProducts = result.relational.relationalProducts;
    });
  }
}
