import { closeAlert, loadData } from './../../../@shared/alerts/alert';
import { ProductsService } from '@core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import carouselitems from '@data/carousel.json';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';
import { ACTIVE_FILTERS } from '@core/constans/filters';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: ICarouselItem[] = [];
  productsList;
  myCurrency = CURRENCIES_SYMBOL.MXN;
  listOne: IProduct[];
  listTwo: IProduct[];
  list3: IProduct[];
  loading: boolean;

  constructor(private usersApi: UsersService, private products: ProductsService) { }

  ngOnInit(): void {
    this.loading = true;
    loadData('Cargando', 'por favor espere');
    this.products.getHomePage().subscribe( data => {
      console.log(data);
      this.listOne = data.conjuntos;
      this.listTwo = data.topPrice;
      this.list3 = data.vestidos;
      closeAlert();
      this.loading = false;
    });
    this.items = carouselitems;
  }

  fakeRandom(){
    const list = [];
    const arrayMax = 4;
    const limit = this.productsList.length;
    for (let i = 0; i < arrayMax; i++) {
      list.push(this.productsList[Math.floor(Math.random() * limit)]);
    }
    return list;
  }
}
