import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorsComponent } from './actors.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ActorsComponent],
  imports: [
    CommonModule,
    ThemeModule,
    TranslateModule.forChild()
  ]
})
export class ActorsModule { }
