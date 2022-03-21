import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/pages/products.service';
import { ComponentsService } from 'src/app/shared/services/components/components.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories-with-icon',
  templateUrl: './categories-with-icon.component.html',
  styleUrls: ['./categories-with-icon.component.scss']
})
export class CategoriesWithIconComponent implements OnInit {
  categories: any
  productsByCategory:any
  category:any
  constructor(private productService: ProductsService, private componentsService: ComponentsService, private router: Router) {
    this.productService.getcategories().subscribe((data)=>{
      this.categories = data
    })
   }
  ngOnInit(): void {
  }
  getproducts(category:any){
    this.componentsService.getProductsByCategory(category).subscribe((data) => {
      this.productsByCategory = data
      this.category = category
    })
  }
  addToCart(_id:any){
    this.router.navigate([`product/${_id}`])
    // this.productService.getProduct(_id)
  }

}
