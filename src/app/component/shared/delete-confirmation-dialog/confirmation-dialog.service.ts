import { Injectable } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteConfirmationDialogComponent} from './delete-confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    message: string): Promise<boolean> {
    const modalRef = this.modalService.open(DeleteConfirmationDialogComponent);
    modalRef.componentInstance.message = message;

    return modalRef.result;
  }
}
