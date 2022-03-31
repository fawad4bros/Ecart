import { Injectable } from '@angular/core';
import { IPRODUCT } from '../interfaces/interface';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlist:IPRODUCT[] = []
  constructor() { }
  addingToWishList(wish: any){
  this.wishlist.push(wish)
  console.log('this.wishlist',this.wishlist)
  }
  getWishList(){
    return this.wishlist
  }
}
