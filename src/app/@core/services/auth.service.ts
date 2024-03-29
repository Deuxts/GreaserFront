import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { map } from 'rxjs/internal/operators/map';
import { HttpHeaders } from '@angular/common/http';
import { IMeData, ISession } from '@core/interfaces/session.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  accessVar = new Subject<IMeData>();
  accessVar$ = this.accessVar.asObservable();

  constructor(apollo: Apollo) {
    super( apollo);
  }

  updateSession(newValue: IMeData){
    this.accessVar.next(newValue);
  }

  start(){
    if (this.getSession() !== null) {
      this.getMe().subscribe((result: IMeData) => {
        if (!result.status) {
          this.resetSession();
          return;
        }
        this.updateSession(result);
      });
      console.log('sesion iniciada');
      return;
    }
    this.updateSession({status : false});
    console.log('sesion no iniciada');
  }

  // inicio de sesion
  login(email: string, password: string){
    return this.get(LOGIN_QUERY, {email, password, include: false}).pipe(
      map( (result: any) => {
        return result.login;
      })
    );
  }
  // info personal
  getMe(){
    return this.get(ME_DATA_QUERY, {include: false}, {headers: new HttpHeaders({
      Authorization: (this.getSession() as ISession).token
    })}).pipe(map((result: any) => result.me));
  }

  setSession(token: string, expiresTimeInHours = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours);

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token,
    };
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession{
    return JSON.parse(localStorage.getItem('session'));
  }

  resetSession(){
    localStorage.removeItem('session');
    this.updateSession({status: false});
  }

}

