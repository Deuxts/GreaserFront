import { IMeData } from '@core/interfaces/session.interface';
import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL } from '@mugan86/ng-shop-ui';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  meData: IMeData;

  myCurrency = CURRENCIES_SYMBOL.MXN;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.accessVar$.subscribe((data: IMeData) => {
      if (!data.status) {
        // ir al login
        this.router.navigate(['/login']);
      }
      this.meData = data;
    });
  }

  ngOnInit(): void {
    this.auth.start();
  }

}
