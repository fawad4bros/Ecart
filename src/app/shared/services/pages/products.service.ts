import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }
  getItems(){
    return this.http.get(`${environment.baseUrl}product/get-products`);
  }
  getcategories(){
    return this.http.get(`${environment.baseUrl}product/get-categories`);
  }
  addToCart(body:any){
    return this.http.get(`${environment.baseUrl}cart/add-cart`, body);

  }
}
