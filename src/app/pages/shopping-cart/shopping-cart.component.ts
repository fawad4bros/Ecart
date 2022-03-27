import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
cart:any
totalprice:any
priceByQuantity:any
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getTheCart()
    // this.totalPrice()
  }
  getTheCart(){
    this.cart = this.cartService.getCart()
  }
//   totalPrice(){
//   this.cart.forEach((value:any) =>{
//   this.priceByQuantity = value.price * value.quantity
//   console.log('this.priceByQuantity',this.priceByQuantity)
//   this.totalprice += this.priceByQuantity
//   console.log('this.totalprice',this.totalprice)
// })
// }
}
