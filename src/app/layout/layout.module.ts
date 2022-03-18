import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  declarations: [
    NavBarComponent,
    HeaderBarComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ComponentsModule
  ],
  exports: [ NavBarComponent,HeaderBarComponent ]
})
export class LayoutModule { }
