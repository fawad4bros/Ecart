import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  @Output() productSize = new EventEmitter<String>();
  selectedValue: String = ''
  sizes: any = [
    {value: 'small', viewValue: 'Small'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'large', viewValue: 'Large'},
  ];

  constructor() { }

  ngOnInit(): void {
  }
  getSize(){
    this.productSize.emit(this.selectedValue)
  }
}
