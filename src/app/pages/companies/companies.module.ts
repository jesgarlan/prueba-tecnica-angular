import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [CompaniesComponent],
  imports: [
    CommonModule,
    ThemeModule,
    TranslateModule.forChild()
  ]
})
export class CompaniesModule { }
