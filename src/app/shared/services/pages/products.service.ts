import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
    console.log(`${environment.baseUrl}product/get-products`)
  }
  getItems(){
    return this.http.get(`${environment.baseUrl}product/get-products`);
  }
  getcategories(){
    return this.http.get(`${environment.baseUrl}product/get-categories`);
  }
}
