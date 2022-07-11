import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CompressionReducer } from './shared/redux/reducers/compression.reducer';
import { CompressionEffects } from './shared/redux/effects/compression.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    SharedModule,
    /** Redux imports */
    StoreModule.forRoot({ App: CompressionReducer }),
    EffectsModule.forRoot([CompressionEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
