import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../@core/services/translation.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  public menu;

  constructor(private translate: TranslateService,
    private translationService: TranslationService) { }

  ngOnInit() {
    this.menu = MENU_ITEMS;
    this.translationService.translateArray(this.menu, 'menu');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translationService.translateArray(this.menu, 'menu');
    });
  }

}
