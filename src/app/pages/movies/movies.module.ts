import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MoviesRoutingModule, routedComponents } from './movies-routing.module';


@NgModule({
  declarations: [...routedComponents,],
  imports: [
    CommonModule,
    ThemeModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
