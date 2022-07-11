import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MainInputComponent } from './components/main-input/main-input.component';
import { HistoryComponent } from './components/history/history.component';
import { AboutDialogComponent } from './components/about-dialog/about-dialog.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

// const maskConfig: Partial<IConfig> = {
//   validation: false,
// };

@NgModule({
  declarations: [
    NavbarComponent,
    SnackbarComponent,
    MainInputComponent,
    HistoryComponent,
    AboutDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    ReactiveFormsModule,
    /** generic components*/
    NavbarComponent,
    MainInputComponent,
    HistoryComponent,
    AboutDialogComponent,
  ],
})
export class SharedModule {}
