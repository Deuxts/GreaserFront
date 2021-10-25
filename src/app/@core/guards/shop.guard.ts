import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

const jwtDecode = require('jwt-decode');

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
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
        return true;
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
