import { ProductCategoryListModule } from '@core/components/product-category-list/product-category-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselItemsModule, ProductItemModule } from '@mugan86/ng-shop-ui';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselItemsModule,
    ProductItemModule,
    ProductCategoryListModule
  ]
})
export class HomeModule { }
