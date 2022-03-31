import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@services/pages/products.service';
import { Router } from '@angular/router';
import { WishlistService } from '@services/wishlist.service';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  userID:any = localStorage.getItem('userID')
  products: any
  constructor(private productService: ProductsService,private router: Router, private wishList: WishlistService,private _snackBar: MatSnackBar) {
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
  addToWishList(product:any){
    if(!this.userID){
      this.router.navigate(['login'])
    }else{
      this.wishList.addingToWishList(product)
      this._snackBar.open('Product added to wishlist')
    }

  }

}
