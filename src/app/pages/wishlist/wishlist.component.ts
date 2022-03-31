import { Component, OnInit } from '@angular/core';

import { WishlistService } from '@services/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
products:any
  constructor(private wishList: WishlistService) { }

  ngOnInit(): void {
    this.gettingwishList()
  }
  gettingwishList(){
  this.products =  this.wishList.getWishList()
  }

}
