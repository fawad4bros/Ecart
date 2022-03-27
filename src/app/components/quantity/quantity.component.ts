import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  @Output() quantityCount = new EventEmitter<Number>();
  quantity: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

add(){
  this.quantity+=1
  this.quantityCount.emit(this.quantity)
}
remove(){
  this.quantity-=1
  this.quantityCount.emit(this.quantity)
}
}
