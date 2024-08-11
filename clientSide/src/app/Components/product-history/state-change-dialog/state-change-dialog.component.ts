import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-state-change-dialog',
  templateUrl: './state-change-dialog.component.html',
  styleUrl: './state-change-dialog.component.scss'
})
export class StateChangeDialogComponent {
  newState: string;

  constructor(
    public dialogRef: MatDialogRef<StateChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentState: string }
  ) {
    this.newState = data.currentState;
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.newState);
  }

  

}
