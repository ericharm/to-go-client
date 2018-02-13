import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatGridListModule
} from '@angular/material'

import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'

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
    MatTabsModule,
    MatGridListModule
  ]
})
export class AppMaterialModule {}
