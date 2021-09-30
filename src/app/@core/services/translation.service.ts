import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translateService: TranslateService) { }

  init(locale = 'es') {
    this.translateService.addLangs(['es']);
    this.translateService.use(locale);
  }

  //#region Translation
  public translateArray(array: Array<any>, prefix: string): void {
    array.forEach((item) => {
      this.translateItemSelect(item, prefix);
    });
  }

  public translateItemSelect(item: any, prefix: string): void {
    let key = '';
    key = TranslationService.getKey(item, prefix);
    this.translateService.get(key).subscribe((translation: string) => {
      item.title = translation;
    });
  }

  public static getKey(item: any, prefix: string): string {
    const key = item.key.toLowerCase();
    return prefix + '.' + key;
  }
  //#endregion Translation
}
