import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from './ToastMessage';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public titleHeader: string = 'Inicio';

  constructor(private toastr: ToastrService) {
  }

  //#region TOAST
  showToast(m: ToastMessage, alias?: string, response?: string) {
    let message: string;
    let type: any;
    switch (m) {
      case ToastMessage.CreateOK:
        message = `${alias} creado correctamente`;
        type = 'toast-success';
        break;
      case ToastMessage.UpdateOK:
        message = `${alias} actualizado correctamente`;
        type = 'toast-success';
        break;
      case ToastMessage.DeleteOK:
        message = `${alias} eliminado correctamente`;
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
}
