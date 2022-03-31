import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
cart:any
totalprice:number = 0
priceByQuantity:any
discount:number = 0
tax:number = 0
orderPrice: number = 0
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getTheCart()
    this.totalPrice()
    this.getDiscount()
    this.getTax()
    this.getFinalPrice()
  }
  getTheCart(){
    this.cart = this.cartService.getCart()
  }
  totalPrice(){
  this.cart.forEach((value:any) =>{
  this.priceByQuantity = value.quantity * value.price
  console.log('this.priceByQuantity',this.priceByQuantity)
  this.totalprice += this.priceByQuantity
  console.log('this.totalprice',this.totalprice)
})
}
getDiscount(){
  this.discount = ( 5/100 ) * this.totalprice
}
getTax(){
  this.tax = (1/100) * this.totalprice
}
getFinalPrice(){
  this.orderPrice = this.tax + (this.totalprice - this.discount)
}
}
