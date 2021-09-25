import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { MoviesModule } from './movies/movies.module';
import { CompaniesModule } from './companies/companies.module';
import { ActorsModule } from './actors/actors.module';


@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    MoviesModule,
    CompaniesModule,
    ActorsModule
  ]
})
export class PagesModule { }
