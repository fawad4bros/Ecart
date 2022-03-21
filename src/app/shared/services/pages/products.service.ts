import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from "@environment";
import { environment } from "@environments/environment"
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {
  }
  getProducts(){
    return this.http.get(`${environment.baseUrl}product/get-products`);
  }
  getProduct(_id:any){
    return this.http.get(`${environment.baseUrl}product/get-product/${_id}`);
  }
  getcategories(){
    return this.http.get(`${environment.baseUrl}product/get-categories`);
  }
  addToCart(body:any){
    return this.http.get(`${environment.baseUrl}cart/add-cart`, body);
  }
}
