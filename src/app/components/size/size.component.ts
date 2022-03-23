import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  sizes: any = [
    {value: 'small', viewValue: 'Small'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'large', viewValue: 'Large'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
