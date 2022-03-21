import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { ProductsComponent } from './products/products.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ComponentsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [ ProductsComponent,LoginComponent ],
  providers:[{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1000}
  }]
})
export class PagesModule { }
