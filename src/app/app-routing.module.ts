import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
const routes: Routes = [
  {path:'',component: ProductsComponent},
  {path:'login',component: LoginComponent},
  {path:'product/:id',component: ProductComponent},
  {path:'shopping-cart',component: ShoppingCartComponent},
  {path:'wish-list',component: WishlistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
