import {Component, Inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  @Input() message: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public close() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close();
  }

}
