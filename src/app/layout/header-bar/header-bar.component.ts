import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  userID:any = localStorage.getItem('user_id')
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logIn(){
    this.router.navigate(['login'])
  }
  logout(){
    localStorage.clear()
    location.reload()
    this.router.navigate([''])
  }
  toCartsPage(){
    this.router.navigate(['shopping-cart'])
  }
  towishList(){
    this.router.navigate(["wish-list"])
  }
}
