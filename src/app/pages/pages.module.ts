import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CompressComponent } from './compress/compress.component';
import { UncompressComponent } from './uncompress/uncompress.component';

@NgModule({
  declarations: [WelcomeComponent, CompressComponent, UncompressComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}
