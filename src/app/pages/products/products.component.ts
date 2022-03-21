import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/pages/products.service';
// import { ProductsService } from '@ProductsService';
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
  addToCart(_id:any){
    this.router.navigate([`product/${_id}`])
  }

  getProducts(){
    this.productService.getProducts().subscribe((data:any) => {
    this.products = data
    })
  }
}
