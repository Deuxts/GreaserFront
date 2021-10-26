import { ICart } from './../components/shopping-cart/shopping-cart.interface';
import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Array<IProduct> = [];
  cart: ICart = {
    products: this.products,
    subtotal: 0,
    total: 0,
  };
  // para actualizar el carrito al hacer acciones
  public itemVar = new Subject<ICart>();
  public itemVar$ = this.itemVar.asObservable();
  constructor() { }
  /**
   * Iniciar el carrito para mantener la informacion
   */
  initialize(){
    const storeData = JSON.parse(localStorage.getItem('cart'));
    if (storeData !== null) {
      this.cart = storeData;
    }
    return this.cart;
  }

  public updateItems(newValue: ICart){
    this.itemVar.next(newValue);
  }

  manageProduct(product: IProduct){
    // obtener cantidad de productos
    const productTotal = this.cart.products.length;
    // comprobamos si tenemos productos
    if (productTotal === 0) {
        console.log('primer product');
        this.cart.products.push(product);
    }else{// en caso de ser verdadero
      let actionUpdate = false;
      for (let i = 0; i < productTotal; i++){
        // verificar que coinciden con alguno de la lista
        if (product.id === this.cart.products[i].id) {
          if (product.qty === 0){
            // quitar elemento
            this.cart.products.splice(i, 1);
          }else{// actualizar con la nueva Info
            this.cart.products[i] = product;
          }
          actionUpdate = true;
          i = productTotal;
        }
      }
      if (!actionUpdate) {
        this.cart.products.push(product);
      }
    }
    this.checkoutTotal();
  }
  /**
   * añadir informacion antes de hacer el pedido
   */
  checkoutTotal(){
    let subtotal = 0;
    let total = 0;
    this.cart.products.map((product: IProduct) => {
      subtotal += product.qty; // cantidad de productos
      total += (product.qty * product.price); // total a pagar
    });
    this.cart.total = total;
    this.cart.subtotal = subtotal;
    console.log('calculado', this.cart);
    this.setInfo();
  }

  clear(){
    this.products = [];
    this.cart = {
      products: this.products,
      subtotal: 0,
      total: 0,
    };
    this.setInfo();
    console.log('carrito borrado');
    return this.cart;
  }

  private setInfo(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItems(this.cart);
  }

  openNav(){
    console.log('abrir');
    document.getElementById('mySidenav').style.width = '360px';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('app').style.overflow = 'hidden';
  }
  closeNav(){
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('app').style.overflow = 'auto';
  }

  orderDescription(){
    let description = '';
    this.cart.products.map((product: IProduct) => {
      description += `${product.name} x ${product.qty} \n`;
    });
    return description;
  }
}
