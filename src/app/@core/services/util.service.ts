import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from './ToastMessage';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public titleHeader: string = 'Inicio';

  constructor(private toastr: ToastrService) {
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

  //#region TOAST
  showToast(m: ToastMessage, alias?: string, response?: string) {
    let message: string;
    let type: any;
    switch (m) {
      case ToastMessage.CreateOK:
        message = `${alias} creada correctamente`;
        type = 'toast-success';
        break;
      case ToastMessage.UpdateOK:
        message = `${alias} actualizada correctamente`;
        type = 'toast-success';
        break;
      case ToastMessage.DeleteOK:
        message = `${alias} eliminada correctamente`;
        type = 'toast-success';
        break;
      case ToastMessage.ValidationError:
        message = `Debe de completar los campos marcados en rojo`;
        type = 'toast-warning';
        break;
      case ToastMessage.NotImplemented:
        message = `Estamos trabajando en ello. Disculpe las molestias.`;
        type = 'toast-warning';
        break;
      case ToastMessage.ErrorResponse:
        message = response;
        type = 'toast-error';
        break;
      case ToastMessage.ErrorGeneric:
        message = `Ha ocurrido un error. Vuelva a intentarlo.`;
        type = 'toast-error';
        break;
      case ToastMessage.NotAuthorized:
        message = `No tiene permiso para realizar la acción seleccionada`;
        type = 'toast-error';
        break;
    }
    this.toastr.show(message, '', undefined, type);
  }
  //#endregion TOAST

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
