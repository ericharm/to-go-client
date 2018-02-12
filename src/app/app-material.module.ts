import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatGridListModule
} from '@angular/material';

import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule
  ]
})
export class AppMaterialModule {}
