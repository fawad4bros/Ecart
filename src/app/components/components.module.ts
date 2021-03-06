import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesWithIconComponent } from './categories-with-icon/categories-with-icon.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { StarratingComponent } from './starrating/starrating.component';
import { QuantityComponent } from './quantity/quantity.component';
import { SizeComponent } from './size/size.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    CategoriesWithIconComponent,
    SearchBarComponent,
    StarratingComponent,
    QuantityComponent,
    SizeComponent,
    PreviousOrdersComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule
  ],
  exports: [ CategoriesWithIconComponent,SearchBarComponent,StarratingComponent,QuantityComponent,SizeComponent, PreviousOrdersComponent ]
})
export class ComponentsModule { }
