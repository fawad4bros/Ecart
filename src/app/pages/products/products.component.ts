import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/pages/products.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any
  constructor(private productService: ProductsService, private authService: AuthService,private router: Router) {

  }
  ngOnInit(): void {
    this.getProducts();
  }
  //
  addToCart(_id:any){
    this.router.navigate([`product/${_id}`])
    // this.productService.getProduct(_id)
  }

  getProducts(){
    this.productService.getProducts().subscribe((data) => {
      this.products = data
    })
  }
}
// {"userId":"622d1835f79782eb8be5f088",
// "products":[{"productId":"622cf8e3d271010d94509d0c","quantity":6},{"productId":"622cf8eed271010d94509d0e","quantity":6}]
// }
// if (this.authService.loggedIn()) {
//   console.log('user ha')
// }else{
//   this.router.navigate(['login'])
//   console.log('user nahai')
// }
