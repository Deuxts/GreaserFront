import { SHOP_LAST_UNITS_OFFERS, SHOP_PRODUCT_BY_CATEGORY } from '@graphql/operations/query/shop-product';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { ACTIVE_FILTERS } from '@core/constans/filters';
import { map } from 'rxjs/operators';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
  }
  getByCategory(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    category: string){
    return this.get(SHOP_PRODUCT_BY_CATEGORY, {
      page,
      itemsPage,
      active,
      random,
      category,
    }).pipe(map((result: any) => {
      return this.infoList(result.shopProductsCategory.shopProducts);
    }));
  }

  getByLastUnitsOffers(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    topPrice: number = -1,
    lastUnits: number = -1,
  ){
    return this.get(SHOP_LAST_UNITS_OFFERS, {
      page,
      itemsPage,
      active,
      random,
      topPrice,
      lastUnits,
    }).pipe(map((result: any) => {
      return this.infoList(result.shopProductsOffersLast.shopProducts);
    }));
  }

  private infoList(listProducts){
    const resultList: Array<IProduct> = [];
    listProducts.map((itemObjet) => {
      resultList.push({
        id: itemObjet.id,
        img: itemObjet.product.img,
        name: itemObjet.product.name,
        description: '',
        qty: 1,
        price: itemObjet.price,
        stock: itemObjet.stock
      });
    });
    return resultList;
  }

}



