import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { MailService } from './../../../../@core/services/mail.service';
import { IMail } from './../../../../@core/interfaces/mail.interface';
import { ICart } from './../../../core/components/shopping-cart/shopping-cart.interface';
import { IPayment } from './../../../../../../../GreaserBack/src/interfaces/stripe/payment.interface';
import { ChargeService } from './../../../core/services/stripe/charge.service';
import { CustomerService } from './../../../core/services/stripe/customer.service';
import { CartService } from '@shop/core/services/cart.service';
import { IMeData } from '@core/interfaces/session.interface';
import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { StripePaymentService } from '@mugan86/stripe-payment-form';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/internal/operators/take';
import { infoEventAlert, loadData } from '@shared/alerts/alert';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { ICharge } from '@core/interfaces/stripe/charge';
import { IStock } from '@core/interfaces/stock.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  meData: IMeData;
  key = environment.stripePublicKey;
  address = '';
  available = false;
  block = false;

  myCurrency = CURRENCIES_SYMBOL.MXN;
  constructor(
    private auth: AuthService,
    private router: Router,
    private stripePayment: StripePaymentService,
    private cartService: CartService,
    private customerService: CustomerService,
    private chargeService: ChargeService,
    private mailService: MailService,
  ) {
    this.auth.accessVar$.subscribe((data: IMeData) => {
      if (!data.status) {
        // ir al login
        this.router.navigate(['/login']);
      }
      this.meData = data;
    });
    this.cartService.itemVar$.pipe(take(1)).subscribe((cart: ICart) => {
      if (this.cartService.cart.total === 0  && this.available === false) {
        this.available = false;
        this.notProduct();
      }
    });
    this.stripePayment.cardTokenVar$
      .pipe(take(1))
      .subscribe((token: string) => {
        if (
          token.indexOf('tok_') > -1 &&
          this.meData.status &&
          this.address !== ''
        ) {
          // Almacenar info para enviar
          const payment: IPayment = {
            token,
            amount: this.cartService.cart.total.toString(),
            description: this.cartService.orderDescription(),
            customer: this.meData.user.stripeCustomer,
            currency: CURRENCY_LIST.MEXICAN_PESO,
          };
          const stockManage: Array<IStock> = [];
          this.cartService.cart.products.map((item: IProduct) => {
            stockManage.push(
              {
                id: +item.id,
                increment: item.qty * (-1)
              }
            );
          });
          this.block = true;
          loadData('Procesando', 'Por favor sea paciente');
          // se crea el pago
          this.chargeService
            .pay(payment, stockManage)
            .pipe(take(1))
            .subscribe(
              async (result: {
                status: boolean;
                message: string;
                charge: ICharge;
              }) => {
                if (result.status) {
                  console.log('ok!');
                  console.log(result.charge);
                  await infoEventAlert(
                    'Se ha realizado el pago de forma exitosa',
                    'En su correo encontrar más información',
                    TYPE_ALERT.SUCCESS
                  );
                  this.sendEmail(result.charge);
                  this.router.navigate(['/orders']);
                  this.cartService.clear();
                } else {
                  console.log(result.message);
                  await infoEventAlert(
                    'El pago fallo',
                    'Inténtelo de nuevo',
                    TYPE_ALERT.WARNING
                  );
                }
                this.block = false;
              }
            );
          // procesar pago
        }
      });
  }

  async notProduct() {
    this.cartService.closeNav();
    this.available = false;
    await infoEventAlert(
      'No disponible, no hay productos para pagar',
      'Para realizar el pago, por favor primero ingresa productos a tu carrito',
      TYPE_ALERT.INFO
    );
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.auth.start();
    if (localStorage.getItem('address')) {
      this.address = localStorage.getItem('address');
      localStorage.removeItem('address');
    }
    this.cartService.initialize();
    localStorage.removeItem('route_after_login');
    this.block = false;
    if (this.cartService.cart.total === 0) {
      this.available = false;
      this.notProduct();
    } else {
      this.available = true;
    }
  }

  async sendData() {
    if (this.meData.user.stripeCustomer === null) {
      await infoEventAlert(
        'No está registrado para realizar pagos',
        'pulse en "ok", para continuar',
        TYPE_ALERT.WARNING
      );
      // registrar al usuario en stripe
      const stripeName = `${this.meData.user.name} ${this.meData.user.lastname}`;
      loadData('Registrandolo como cliente', 'Creando su cuenta pa pagos');
      this.customerService
        .add(stripeName, this.meData.user.email)
        .pipe(take(1))
        .subscribe(async (result: { status: boolean; message: string }) => {
          if (result.status) {
            await infoEventAlert(
              'Cliente registrado',
              'Reinicie su sesión',
              TYPE_ALERT.SUCCESS
            );
            localStorage.setItem('address', this.address);
            localStorage.setItem('route_after_login', this.router.url);
            this.auth.resetSession();
          } else {
            await infoEventAlert(
              'Cliente NO registrado',
              result.message,
              TYPE_ALERT.WARNING
            );
          }
        });
      return;
    }
    this.stripePayment.takeCardToken(true);
  }

  sendEmail(charge: ICharge){
    const mail: IMail = {
      to: charge.receiptEmail,
      subject: 'Info sobre tu pedido',
      html: `<h3>El pedido pago se realizó de forma exitosa, si es que tienes dudas o deseas ver más información sobre tu compra, por favor  <a href=${charge.receiptUrl} target="_blank"> haz click aqui!</a></h3>`,
    };
    this.mailService.send(mail).pipe(take(1)).subscribe();
  }

}
