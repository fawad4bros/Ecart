import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@services/pages/products.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
prodictID:String = ''
productDetails:any
  constructor(private activateroute: ActivatedRoute ,private productsService:ProductsService) {
  }
  ngOnInit(): void {
this.getProductId();
this.getProduct();
  }
  getProductId(){
    this.activateroute.params.subscribe((data:any)=>{
      this.prodictID = data['id']
    })
  }
  getProduct(){
this.productsService.getProduct(this.prodictID).subscribe((data:any)=>{
  this.productDetails = data
})
  }

}
