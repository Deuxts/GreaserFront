import { ITableColums } from '@core/interfaces/table-columns.interface';
import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { IInfoPage, IResultData } from '@core/interfaces/result-data.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs/internal/Observable';
import { TablePaginationService } from './table-pagination.service';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode = USERS_LIST_QUERY;
  @Input() context: object;
  @Input() itemsPage = 5;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColums> = undefined;
  infoPage: IInfoPage;
  data$: Observable<any>;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    if (this.query === undefined) {
      throw new Error('esta indefinido agrega uno');
    }
    if (this.resultData === undefined) {
      throw new Error('resultData esta indefinido agrega uno');
    }
    if (this.tableColumns === undefined) {
      throw new Error('tableColumns esta indefinido agrega uno');
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      ItemsPage: this.itemsPage,
      total: 1
    };
    this.loadData();
  }

  loadData(){
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.ItemsPage,
      include: this.include,
    };
    this.data$ = this.service.getCollectionData(this.query, variables, {}).pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return data[this.resultData.listKey];
      }
    ));
  }

  pageChange(){
    console.log(this.infoPage.page);
    this.loadData();
  }

}
