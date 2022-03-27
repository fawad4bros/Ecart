import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logUserRes: any;
  loginUserForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _router: Router,private _snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.userFormData()
  }
  userFormData(){
    this.loginUserForm = this.formBuilder.group({
      'email': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required])
    })
  }
  loginUser(){
    this.authService.loginuser(this.loginUserForm.value).subscribe((data) => {
      this.logUserRes = data
      localStorage.setItem('token',this.logUserRes.token)
      localStorage.setItem('userID',this.logUserRes.userID)
      this._router.navigate([''])
    },err => {
      this._snackBar.open('Wrong credentials')
    })

  }
}
