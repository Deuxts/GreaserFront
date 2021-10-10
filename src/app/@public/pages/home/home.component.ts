import { ApiService } from '@graphql/services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private usersApi: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.login('danzet@outlook.com', '1234').subscribe(result => {
      console.log(result); // comprueba el ingreso a la pagina
    });
    this.usersApi.getUser().subscribe(result => {
      console.log(result); // muestra la lista de usuarios
    });
    this.auth.getMe().subscribe(result => {
      console.log(result); // muestra el valor del token
    });
  }

}
