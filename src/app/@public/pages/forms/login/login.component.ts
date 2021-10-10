import { Component } from '@angular/core';
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';
import { AuthService } from '@core/services/auth.service';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { basicAlert, } from 'src/app/@shared/alerts/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: ILoginForm = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  init(){
    this.auth.login(this.login.email, this.login.password).subscribe(
      (result: IResultLogin) => {
        console.log(result);
        if (result.status  && result.token !== null) {
          // datos del usuario
          basicAlert(TYPE_ALERT.SUCCESS, result.message);
          this.auth.setSession(result.token);
          this.auth.updateSession(result);
          this.router.navigate(['/home']);
          return;
        }
        console.log('sesion fallada');
        basicAlert(TYPE_ALERT.WARNING, result.message);
      }
    );
  }

}
