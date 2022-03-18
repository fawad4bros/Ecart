import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/pages/products.service';

@Component({
  selector: 'app-categories-with-icon',
  templateUrl: './categories-with-icon.component.html',
  styleUrls: ['./categories-with-icon.component.scss']
})
export class CategoriesWithIconComponent implements OnInit {
  categories: any
  constructor(private productService: ProductsService) {
    this.productService.getcategories().subscribe((data)=>{
      this.categories = data
    })
   }
  ngOnInit(): void {
  }

}
