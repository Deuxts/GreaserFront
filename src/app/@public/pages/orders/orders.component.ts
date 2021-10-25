import { closeAlert, loadData } from '@shared/alerts/alert';
import { IMeData } from '@core/interfaces/session.interface';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';
import { Component, OnInit } from '@angular/core';
import { ICharge } from '@core/interfaces/stripe/charge';
import { AuthService } from '@core/services/auth.service';
import { ChargeService } from '@shop/core/services/stripe/charge.service';
import { take } from 'rxjs/internal/operators/take';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  mycurrency = CURRENCIES_SYMBOL.MXN;
  meData: IMeData;
  startingAfter = '';
  hasMore = false;
  charges: Array<ICharge> = [];
  loading = true;
  loadMoreBtn = false;

  constructor(private auth: AuthService, private chargeService: ChargeService) {
    this.auth.accessVar$.pipe(take(1)).subscribe((meData: IMeData) => {
      this.meData = meData;
      // si existe info, cargarla
      if (this.meData.user.stripeCustomer !== '') {
        console.log(this.meData);
        this.loadDataOrders();
      }
    });
  }

  ngOnInit(): void {
    this.auth.start();
  }

  loadDataOrders(){
    loadData('Cargando los datos, por favor espere', 'esto tardara unos momentos');
    this.chargeService.listPayCustomer(
      this.meData.user.stripeCustomer,
      15,
      this.startingAfter,
      ''
    ).pipe(take(1)).subscribe((data: {hasMore: boolean, charges: Array<ICharge>}) => {
      console.log(data);
      data.charges.map((item: ICharge) => this.charges.push(item));
      this.hasMore = data.hasMore;
      if (this.hasMore) {
        this.startingAfter = data.charges[data.charges.length - 1].id;
        this.loadMoreBtn = true;
      }else{
        this.loadMoreBtn = false;
        this.startingAfter = '';
      }
      closeAlert();
      this.loading = false;
    });
  }
}
