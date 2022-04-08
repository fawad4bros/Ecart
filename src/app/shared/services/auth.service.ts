import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }
  loginuser(userData: any){
    return this.http.post(environment.baseUrl + 'user/user-login', userData);

  }
  registeruser(userData: any){
    console.log('userData',userData)
    return this.http.post(environment.baseUrl + 'user/user-registration', userData);
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate([''])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
