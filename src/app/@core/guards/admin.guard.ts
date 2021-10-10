import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

const jwtDecode = require('jwt-decode');

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     // comprobar si la sesion existe o si no se ha inicicado
      if (this.auth.getSession() !== null) {
        console.log('estado LOGUEADO');
        const dataDecode = this.decodeToken();
        console.log(dataDecode);
        // comprobar caducidad del token
        if (dataDecode.exp < new Date().getTime() / 1000) {
          console.log('sesion caducada');
          return this.redirect();
        }
        // el rol del usuario debera ser ADMIN
        if (dataDecode.user.role === 'ADMIN') {
          console.log('entrada del admin');
          return true;
        }
        console.log('no admin');
      }
      console.log('sesion no iniciada');
      return this.redirect();
  }

  redirect(){
      this.router.navigate(['/login']);
      return false;
  }
  decodeToken(){
    return jwtDecode(this.auth.getSession().token);
  }

}
