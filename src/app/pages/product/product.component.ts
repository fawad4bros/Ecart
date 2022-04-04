import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@services/pages/products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '@services/cart.service';
import { WishlistService } from '@services/wishlist.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
productID:String = ''
productDetails:any
quantity:Number = 0
size:String = ''
userID:any = localStorage.getItem('userID')
product: any
buyProduct:any
  constructor(private activateroute: ActivatedRoute ,private _snackBar: MatSnackBar,private productsService:ProductsService,private router: Router, private cart: CartService, private wishList: WishlistService) {
  }
  ngOnInit(): void {
  this.getProductId();
  this.getProduct();
  }
  getProductId(){
    this.activateroute.params.subscribe((data:any)=>{
      this.productID = data['id']
    })
  }
  getProduct(){
  this.productsService.getProduct(this.productID).subscribe((data:any)=>{
    this.productDetails = data
})
  }
  addQuantity(event:Number){
    this.quantity = event
  }
  addSize(event:String){
    this.size = event
  }
  addToCart(){
    if(!this.userID){
      this.router.navigate(['login'])
    }
    else if(!this.quantity || !this.size){
      this._snackBar.open('Please check the size and quantity')
    }
    else if(this.productID && this.quantity && this.size && this.userID){
      this.product = {
        'productId':this.productID,
        'title':this.productDetails.title,
        'price':this.productDetails.price,
        'quantity':this.quantity,
        'size':this.size,
        'imagePath':this.productDetails.imagePath,
        'category':this.productDetails.category,
        'description':this.productDetails.description,
      }
      this.cart.addingToCart(this.product)
      this._snackBar.open('Product added to cart')
    }
  }
  buyNow(){
    if(!this.userID){
      this.router.navigate(['login'])
    }
    else if(!this.quantity || !this.size){
      this._snackBar.open('Please check the size and quantity')
    }
    else if(this.productID && this.quantity && this.size && this.userID){
      this.buyProduct = {
        'productId':this.productID,
        'title':this.productDetails.title,
        'price':this.productDetails.price,
        'quantity':this.quantity,
        'size':this.size,
        'imagePath':this.productDetails.imagePath,
        'category':this.productDetails.category,
        'description':this.productDetails.description,
      }
      this.cart.addingToCart(this.buyProduct)
      this.router.navigate(['shopping-cart'])
    }
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
