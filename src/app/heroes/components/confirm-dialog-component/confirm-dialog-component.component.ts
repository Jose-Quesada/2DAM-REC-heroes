import { Component, inject } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-component',
  standalone: false,
  templateUrl: './confirm-dialog-component.component.html',
  styleUrl: './confirm-dialog-component.component.css'
})
export class ConfirmDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<Hero>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
