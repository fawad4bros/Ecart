import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from "@environments";
import { environment } from "@environments/environment"

// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  constructor(private http: HttpClient) {
   }
  getProductsByCategory(category:any){
    console.log(environment.baseUrl)
    console.log('im runing ok')
    return this.http.get(`${environment.baseUrl}product/get-product-category/${category}`);
  }
}
