import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorsComponent } from './actors.component';
import { ThemeModule } from 'src/app/@theme/theme.module';



@NgModule({
  declarations: [ActorsComponent],
  imports: [
    CommonModule,
    ThemeModule
  ]
})
export class ActorsModule { }
