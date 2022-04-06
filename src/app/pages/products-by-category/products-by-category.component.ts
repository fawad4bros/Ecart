import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentsService } from '@services/components/components.service';
import { Router } from '@angular/router';
import { WishlistService } from '@services/wishlist.service';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {
  userID:any = localStorage.getItem('userID')
  category:any
  products:any
  constructor(private activateroute: ActivatedRoute, private componentsService:ComponentsService,private router: Router, private wishList: WishlistService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getcategory()
    this.getProducts()
  }
  getcategory(){
    this.activateroute.params.subscribe((data:any)=>{
      this.category = data['category']
    })
  }
  getProducts(){
    this.componentsService.getProductsByCategory(this.category).subscribe((data:any)=>{
      this.products = data
  })
    }
    addToCart(_id:any){
      this.router.navigate([`product/${_id}`])
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
