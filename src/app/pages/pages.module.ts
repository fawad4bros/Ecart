import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';

import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  exports: [ ProductsComponent ]
})
export class PagesModule { }
