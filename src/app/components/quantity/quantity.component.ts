import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  quantity: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

add(){
  this.quantity+=1
  console.log(this.quantity)
}
remove(){
  this.quantity-=1
  console.log(this.quantity)
}
}
