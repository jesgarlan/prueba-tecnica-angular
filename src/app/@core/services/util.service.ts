import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AlertMessage } from './AlertMessage';
import { ToastMessage } from './ToastMessage';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public titleHeader: string = 'Inicio';

  constructor(private toastr: ToastrService,
    private translate: TranslateService) {
  }

  public genre = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Horror",
    "Musical",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War"
  ];

  public languages = [
    {
      title: 'Español',
      value: 'es',
      key: 'es'
    }/*,
    {
      title: 'Inglés',
      value: 'en',
      key: 'en'
    }*/
  ];

  //#region TOAST
  showToast(m: ToastMessage, alias?: string, response?: string) {
    let message: string;
    let type: any;
    switch (m) {
      case ToastMessage.CreateOK:
        message = `${alias} ${this.translate.instant('toast.create-ok')}`;
        type = 'toast-success';
        break;
      case ToastMessage.UpdateOK:
        message = `${alias} ${this.translate.instant('toast.update-ok')}`;
        type = 'toast-success';
        break;
      case ToastMessage.DeleteOK:
        message = `${alias} ${this.translate.instant('toast.delete-ok')}`;
        type = 'toast-success';
        break;
      case ToastMessage.ShowError:
        message = this.translate.instant('toast.show-error');
        type = 'toast-error';
        break;
      case ToastMessage.ValidationError:
        message = this.translate.instant('toast.validation-error');
        type = 'toast-warning';
        break;
      case ToastMessage.ErrorResponse:
        message = response;
        type = 'toast-error';
        break;
    }
    this.toastr.show(message, '', undefined, type);
  }
  //#endregion TOAST

  //#region SWEET ALERT
  async message(type: AlertMessage, alias?: string, extra?: string, response?: string) {
    let title: string;
    let text: string;
    let icon: any;
    let showCancelButton;
    let confirmButtonText: string = 'Volver';
    let cancelButtonText: string;

    let result: any;

    switch (type) {
      case AlertMessage.GenericQuestion:
        title = this.translate.instant('sweet-alert.warning');
        text = `${this.translate.instant('sweet-alert.generic-question')} ${alias}?`;
        icon = "warning";
        showCancelButton = true;
        confirmButtonText = "Sí";
        cancelButtonText = "No";
        break;
      default:
        break;
    }

    if (title != undefined || text != undefined) {
      result = await Swal.fire({
        title,
        text: text.charAt(0).toUpperCase() + text.slice(1),
        icon,
        showCancelButton,
        confirmButtonText,
        cancelButtonText
      });

      return result;
    }
  }
  //#endregion SWEET ALERT

  validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }
}
