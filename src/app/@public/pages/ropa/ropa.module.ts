import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryListModule } from '@core/components/product-category-list/product-category-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RopaRoutingModule } from './ropa-routing.module';
import { RopaComponent } from './ropa.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RopaComponent],
  imports: [
    CommonModule,
    RopaRoutingModule,
    ProductCategoryListModule,
    NgbPaginationModule,
    FormsModule
  ]
})
export class RopaModule { }
