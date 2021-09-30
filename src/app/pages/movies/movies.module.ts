import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MoviesRoutingModule, routedComponents } from './movies-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [...routedComponents,],
  imports: [
    CommonModule,
    ThemeModule,
    MoviesRoutingModule,
    TranslateModule.forChild(),
    NgxPaginationModule
  ]
})
export class MoviesModule { }
