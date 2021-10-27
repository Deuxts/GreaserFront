import { Apollo } from 'apollo-angular';
import { IPayment } from '@core/interfaces/stripe/payment.interface';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/internal/operators/map';
import { CREATE_PAY_ORDER } from '@graphql/operations/mutation/stripe/customer';
import { CHARGES_LIST } from '@graphql/operations/query/stripe/charge';
import { IStock } from '@core/interfaces/stock.interface';

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  pay(payment: IPayment, stockChange: Array<IStock>) {
    return this.set(
      CREATE_PAY_ORDER,
      { payment, stockChange }
    ).pipe(map((result: any) => {
      return result.chargeOrder;
    }));
  }

  listPayCustomer(customer: string, limit: number, startingAfter: string, endingBefore: string){
    return this.get(
      CHARGES_LIST,
      {customer, limit, startingAfter, endingBefore}
    ).pipe(map((result: any) => {
      return result.chargesByCustomer;
    }));
  }
}
