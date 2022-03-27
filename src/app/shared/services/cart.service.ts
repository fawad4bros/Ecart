import { Injectable } from '@angular/core';
import { IPRODUCT } from '../interfaces/interface';
@Injectable({
  providedIn: 'root'
})
export class CartService {
products:IPRODUCT[] = []
  constructor() { }
  addingToCart(product: any){
  this.products.push(product)
  }
  getCart(){
    return this.products
  }

}
