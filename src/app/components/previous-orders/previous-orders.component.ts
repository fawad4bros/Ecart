import { Component, OnInit } from '@angular/core';

import { ProductsService } from '@services/pages/products.service';
@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.scss']
})
export class PreviousOrdersComponent implements OnInit {
  products:any
  carts:any
  userID:any = localStorage.getItem('userID')
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.getUserCart(this.userID)
  }
  getUserCart(userID:any){
    this.productsService.userPreviousOrders(userID).subscribe((data)=>{
      this.products = data
this.products.forEach((value:any) =>{
  this.carts = value.products
  })
  })
}
}
