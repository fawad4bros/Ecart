import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  regUserData:any
  regUserForm: FormGroup = new FormGroup({});
  // Roles: any = ['Admin', 'Author', 'Reader'];
  // selectedRole:any
  constructor(private formBuilder: FormBuilder, private authService: AuthService,private _router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userFormData()
  }
  userFormData(){
    this.regUserForm = this.formBuilder.group({
      'email': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required]),
      'username': new FormControl('',[Validators.required]),
    })
  }
  regUser(){
    this.regUserData = this.regUserForm.value
    this.authService.registeruser( this.regUserData).subscribe((data)=>{
      console.log('data',data)
    })
    this._router.navigate(['login'])
  }
}
