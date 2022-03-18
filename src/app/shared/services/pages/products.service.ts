import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AppConfig } from '../../constants';
// console.log(AppConfig)
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'multipart/form-data'
//   })
// }
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getItems(){
    return this.http.get("http://localhost:3000/api/product/get-products");
  }
  getcategories(){
    return this.http.get("http://localhost:3000/api/product/get-categories");
  }
}
