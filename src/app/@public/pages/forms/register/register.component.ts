import { IRegisterForm, IResultRegister } from '@core/interfaces/register.interface';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from 'src/app/@shared/alerts/toast';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { Router } from '@angular/router';
import { REGEX_EMAIL } from '@core/constans/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  rexEmail = REGEX_EMAIL;
  register: IRegisterForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    birthday: ''
  };

  constructor(private api: UsersService, private router: Router) { }

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.register.birthday = (data.toISOString()).substring(0, 10);
    console.log(this.register);
  }
  private formatNumbers(num: number | string ) {
    return (+num < 10) ? `0${num}` : num;
  }
  dataAsign($event){
    const fecha = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
    this.register.birthday = fecha;
    console.log('register tomando dato', $event);
  }

  add(){
    console.log('enviando info', this.register);
    this.api.register(this.register).subscribe((result: IResultRegister) => {
      console.log('resultado: ', result);
      if (!result.status) {
        basicAlert(TYPE_ALERT.WARNING, result.message);
        return;
      }
      basicAlert(TYPE_ALERT.SUCCESS, result.message);
      this.router.navigate(['/login']);
    });
  }
}
