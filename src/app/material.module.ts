import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule,
         MatProgressSpinnerModule, MatCardModule, MatStepperModule,
         MatTabsModule, MatCheckboxModule,
         MatTableModule, MatSelectModule, MatTooltipModule,
         MatDialogModule, MatSlideToggleModule, MatRadioModule,
         MatSnackBarModule, MatDatepickerModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule,
            MatCardModule, MatStepperModule, MatRadioModule, MatTabsModule, MatCheckboxModule,
            MatTableModule, MatSelectModule, MatTooltipModule, MatDialogModule, MatSlideToggleModule,
            MatDatepickerModule, MatFormFieldModule, MatSnackBarModule, CommonModule],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule,
            MatCardModule, MatStepperModule, MatRadioModule, MatTabsModule, MatCheckboxModule,
            MatTableModule, MatSelectModule, MatTooltipModule, MatDialogModule, MatSlideToggleModule,
            MatDatepickerModule, MatFormFieldModule, MatSnackBarModule, CommonModule],
})
export class MaterialModule { }