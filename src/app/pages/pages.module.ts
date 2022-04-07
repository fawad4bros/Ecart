import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Angular Material UI
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
// Components
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
// Modules
import { ComponentsModule } from '../components/components.module';
import { LayoutModule } from '../layout/layout.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ShoppingCartComponent,
    WishlistComponent,
    ProductsByCategoryComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //Modules
    LayoutModule,
    ComponentsModule,
    // Angular Material UI
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  exports: [ ProductsComponent,LoginComponent ],
  providers:[{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}
  }]
})
export class PagesModule { }
