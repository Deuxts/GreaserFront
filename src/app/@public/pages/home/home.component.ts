import { ProductsService } from '@core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import carouselitems from '@data/carousel.json';
import productsList from '@data/products.json';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';
import { ACTIVE_FILTERS } from '@core/constans/filters';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: ICarouselItem[] = [];
  productsList;
  myCurrency = CURRENCIES_SYMBOL.MXN;
  listOne;
  listTwo;
  list3;
  constructor(private usersApi: UsersService, private products: ProductsService) { }

  ngOnInit(): void {
    this.products.getByLastUnitsOffers(
      1, 4, ACTIVE_FILTERS.ACTIVE, true, 40)
        .subscribe(result => {
          console.log('productos -40', result);
          this.listTwo = result;
        });
    this.products.getByCategory(
      1, 4, ACTIVE_FILTERS.ACTIVE, true, '18')
        .subscribe(result => {
          console.log('playstation (?', result);
          this.listOne = result;
        });
    /*this.auth.login('danzet@outlook.com', '1234').subscribe(result => {
      console.log(result); // comprueba el ingreso a la pagina
    });*/
    this.usersApi.getUser().subscribe(result => {
      console.log(result); // muestra la lista de usuarios
    });
    /*this.auth.getMe().subscribe(result => {
      console.log(result); // muestra el valor del token
    });*/
    this.items = carouselitems;
    this.productsList = productsList;
    console.log('caorusel', this.items);
    this.list3 = this.fakeRandom();
    console.log(this.listOne = this.fakeRandom());
    console.log(this.listTwo = this.fakeRandom());
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
