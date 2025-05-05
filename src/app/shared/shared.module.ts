import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MaskPipe } from './pipes/mask.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    MaskPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, MaskPipe]
})
export class SharedModule { }