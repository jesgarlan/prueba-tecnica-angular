import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { ThemeModule } from 'src/app/@theme/theme.module';



@NgModule({
  declarations: [CompaniesComponent],
  imports: [
    CommonModule,
    ThemeModule
  ]
})
export class CompaniesModule { }
