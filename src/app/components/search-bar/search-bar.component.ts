import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@services/pages/products.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  foods:any
  searchedTitle:any
  selectedCategory:any
  constructor(private productService: ProductsService,private router: Router) {
   }
  ngOnInit(): void {
    this.getCategories()
  }
  searching(event:any){
    let value = event.target.value
    this.productService.searchByTitle(value).subscribe((data)=>{
      this.searchedTitle = data
    })
  }
  getCategories(){
    this.productService.getcategories().subscribe((data)=>{
      this.foods = data
    })
  }
  gettingSellectedValue(product:any){
    this.router.navigate([`product/${product._id}`])
  }
  search(){
  }
}
