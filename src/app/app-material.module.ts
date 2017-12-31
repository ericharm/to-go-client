import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule
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
        MatTableModule
    ]
})
export class AppMaterialModule {}
