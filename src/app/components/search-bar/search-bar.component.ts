import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@services/pages/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  foods:any
  searchedTitle:any
  selectedValue:any
  constructor(private productService: ProductsService,private router: Router,private _snackBar: MatSnackBar) {
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
    if(!this.selectedValue){
      this._snackBar.open('Select a category')
    }else{
      this.router.navigate([`products-by-category/${this.selectedValue}`])
    }

  }
}
