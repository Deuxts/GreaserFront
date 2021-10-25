import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { SEND_EMAIL } from '@graphql/operations/mutation/mail';
import { IMail } from '@core/interfaces/mail.interface';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MailService extends ApiService{

  constructor(apollo: Apollo){
    super(apollo);
  }

  send(mail: IMail){
    return this.set(
      SEND_EMAIL,
      {mail}
    ).pipe(map((result: any) => {
      return result.sendEmail;
    }));
  }
}
