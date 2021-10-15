import { UsersService } from '@core/services/users.service';
import { basicAlert } from 'src/app/@shared/alerts/toast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  token: string;
  values: any = {
    password: '',
    passwordDos: '',
    birthday: ''
  };
  constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router) {
    this.route.params.subscribe(params => {
      this.token = params.token;
      console.log(params.token);
    });
  }

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.values.birthday = (data.toISOString()).substring(0, 10);
    console.log(this.values);
  }
  private formatNumbers(num: number | string ) {
    return (+num < 10) ? `0${num}` : num;
  }
  dataAsign($event){
    const fecha = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
    this.values.birthday = fecha;
    console.log('register tomando dato', $event);
    console.log(fecha);
  }

  add() {
    if (this.values.password !== this.values.passwordDos) {
      basicAlert(TYPE_ALERT.WARNING, 'Las contraseñas no coinciden, por favor ingrese dos contraseñas iguales');
      return;
    }
    // enviar info al backend
    this.userService.active(this.token, this.values.birthday, this.values.password).subscribe(
      result => {
        if (result.status) {
          basicAlert(TYPE_ALERT.SUCCESS, result.message);
          this.router.navigate(['login']);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, result.message);
      }
    );
  }



}
