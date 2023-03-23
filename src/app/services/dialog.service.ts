import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  // Open Confirm Dialog Box
  openConfirmDialog(msg : string){
    return this.dialog.open(DialogBoxComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      position: { top: "10px", left: '500px'},
      disableClose: true,
      data : {
        message: msg
      }
    });
  }

}
