import { Component, OnInit  } from '@angular/core';
// ,Output, EventEmitter
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '@services/pages/products.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  // @Output() product = new EventEmitter<any>();
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  foods:any
  searchedTitle:any
  // selectedTitle:any
  constructor(private productService: ProductsService,private router: Router) {

   }
  ngOnInit(): void {
    this.getCategories()
    this.searching(event)
  }
  selectedValue(){

  }
  searching(event:any){
    let value = event.target.value
    this.productService.searchByTitle(value).subscribe((data)=>{
      // console.log('this.selectedTitle',this.selectedTitle)
      // console.log('data',data)
      this.searchedTitle = data
    })
  }
  getCategories(){
    this.productService.getcategories().subscribe((data)=>{
      this.foods = data
    })
  }
  gettingSellectedValue(product:any){
    // this.product.emit(product)
    // this.selectedTitle = product
    this.router.navigate([`product/${product._id}`])
  }
}
