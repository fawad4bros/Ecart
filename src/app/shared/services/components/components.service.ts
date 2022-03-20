import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private http: HttpClient) { }
  getProductsByCategory(category:any){
    return this.http.get(`${environment.baseUrl}product/get-product-category/${category}`);
  }
}
