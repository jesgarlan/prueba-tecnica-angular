import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
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
  alive = true;

  constructor(private translate: TranslateService,
    private translationService: TranslationService,
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService) { }

  ngOnInit() {
    this.menu = MENU_ITEMS;
    this.translationService.translateArray(this.menu, 'menu');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translationService.translateArray(this.menu, 'menu');
    });

    this.menuService.onItemSelect()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.sidebarService.collapse('menu-sidebar'));
  }

}
