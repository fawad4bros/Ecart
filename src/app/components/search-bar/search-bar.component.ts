import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@services/pages/products.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  foods:any
  constructor(private productService: ProductsService) {
    this.productService.getcategories().subscribe((data)=>{
      this.foods = data
    })
   }
  ngOnInit(): void {
  }
  selectedValue(){

  }
}
