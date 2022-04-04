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
  }
  getWishList(){
    return this.wishlist
  }
}
