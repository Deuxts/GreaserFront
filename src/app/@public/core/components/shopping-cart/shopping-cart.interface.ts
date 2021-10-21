import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';


export interface ICart {
    total: number; // se almacena el total
    subtotal: number; // unidades
    products: Array<IProduct>;
}
