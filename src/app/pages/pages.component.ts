import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
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
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private translate: TranslateService,
    private translationService: TranslationService,
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    public breakpointService: NbMediaBreakpointsService,
    private themeService: NbThemeService) { }

  ngOnInit() {
    this.menu = MENU_ITEMS;
    this.translationService.translateArray(this.menu, 'menu');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translationService.translateArray(this.menu, 'menu');
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        if (isLessThanXl) {
          this.menuService.onItemSelect()
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => this.sidebarService.collapse('menu-sidebar'));
        }
      });
  }

}
