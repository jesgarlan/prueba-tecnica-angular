import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { UtilService } from 'src/app/@core/services/util.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/@core/services/translation.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  user: any;
  public themes: Array<any>;
  public currentTheme: string;
  public email: string;
  public isLess: boolean;
  public title: string;
  public languages: Array<any>;
  public currentLang: string;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private utilService: UtilService,
    private translate: TranslateService,
    private translationService: TranslationService) {
    this.title = this.utilService.titleHeader;
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    this.languages = this.utilService.languages;
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.isLess = isLessThanXl);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { //Live reload
      this.translationService.translateArray(this.languages, 'header.language');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

}
