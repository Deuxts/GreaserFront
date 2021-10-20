import { SHOP_LAST_UNITS_OFFERS, SHOP_PRODUCT_BY_CATEGORY } from '@graphql/operations/query/shop-product';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { ACTIVE_FILTERS } from '@core/constans/filters';
import { map } from 'rxjs/operators';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { HOME_PAGE } from '@graphql/operations/query/home-page';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  getHomePage() {
    return this.get(
      HOME_PAGE,
      {
        showCategory: true
      }
    ).pipe(map((result: any) => {
      return {
        conjuntos: this.manageInfo(result.conjuntos.shopProducts, false),
        vestidos: this.manageInfo(result.vestidos.shopProducts, false),
        topPrice: this.manageInfo(result.topPrice35.shopProducts, true)
      };
    }));
  }

  getByCategory(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    category: Array<string> = ['-1'],
    showInfo: boolean = false,
    showCategory: boolean = false,
  ){
    return this.get(
      SHOP_PRODUCT_BY_CATEGORY,
      {
        page,
        itemsPage,
        active,
        random,
        category,
        showInfo,
        showCategory
      }
    ).pipe(map((result: any) => {
      const data = result.shopProductsCategory;
      return {
        info: data.info,
        result: this.manageInfo(data.shopProducts)
      };
    }));
  }

  getByLastUnitsOffers(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    topPrice: number = -1,
    lastUnits: number = -1,
    showInfo: boolean = false,
    showCategory: boolean = false
  ){
    return this.get(
      SHOP_LAST_UNITS_OFFERS,
      {
        page,
        itemsPage,
        active,
        random,
        topPrice,
        lastUnits,
        showInfo,
        showCategory
      }
    ).pipe(map((result: any) => {
      const data = result.shopProductsOffersLast;
      return {
        info: data.info,
        result: this.manageInfo(data.shopProducts)
      };
    }));
  }

  private manageInfo(listProducts: any, showDescription = true) {
      const resultList: Array<IProduct> = [];
      listProducts.map((shopObject) => {
        resultList.push({
          id: shopObject.id,
          img: shopObject.product.img,
          name: shopObject.product.name,
          rating: shopObject.product.rating,
          description: (shopObject.category && showDescription) ? shopObject.category.name : '',
          qty: 1,
          price: shopObject.price,
          stock: shopObject.stock
        });
      });
      return resultList;
  }
}


