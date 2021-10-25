import { IRopaInfo } from './ropa-info.inteface';
import { IInfoPage } from '@core/interfaces/result-data.interface';
import { Component, OnInit } from '@angular/core';
import { ACTIVE_FILTERS } from '@core/constans/filters';
import { ProductsService } from '@core/services/products.service';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { ROPA_PAGES_INFO, TYPE_OPERATION } from './ropa.constants';
import { closeAlert, loadData } from '@shared/alerts/alert';

@Component({
  selector: 'app-ropa',
  templateUrl: './ropa.component.html',
  styleUrls: ['./ropa.component.scss']
})
export class RopaComponent implements OnInit {
  selectPage;
  infoPage: IInfoPage = {
    page: 1,
    pages: 1,
    total: 160,
    itemsPage: 20,
  };
  typeData: TYPE_OPERATION;
  title = 'titulo de categoria';
  productsList: Array<IProduct> = [];
  myCurrency = CURRENCIES_SYMBOL.MXN;
  ropaPageInfo: IRopaInfo;
  loading: boolean;
  constructor(private products: ProductsService, private  activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      this.loading = true;
      loadData('Cargando', 'por favor espere');
      console.log(params);
      this.ropaPageInfo = ROPA_PAGES_INFO[`${params.type}/${params.filter}`];
      console.log(this.ropaPageInfo);
      this.typeData = params.type;
      this.selectPage = 1;
      this.loadData();
    });
  }

  loadData(){
    if (this.typeData === TYPE_OPERATION.CATEGORY) {
      this.products.getByCategory(
        this.selectPage, this.infoPage.itemsPage, ACTIVE_FILTERS.ACTIVE, false, this.ropaPageInfo.categoryIds, true, false)
          .subscribe(data => {
            this.getResult(data);
          });
      return;
    }else{
      this.products.getByLastUnitsOffers(
        this.selectPage, this.infoPage.itemsPage,
          ACTIVE_FILTERS.ACTIVE, false, this.ropaPageInfo.topPrice, this.ropaPageInfo.stock,  true, false)
          .subscribe(data => {
            this.getResult(data);
          });
    }
  }

  private getResult(data){
    this.productsList = data.result;
    this.infoPage = data.info;
    closeAlert();
    this.loading = false;
  }

}
