import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslationService } from "./translation.service";

export function translationInitializer(translationService: TranslationService) {
    return function () {
        return translationService.init('es');
    };
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}