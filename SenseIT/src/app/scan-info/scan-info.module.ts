import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanInfoPageRoutingModule } from './scan-info-routing.module';

import { ScanInfoPage } from './scan-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanInfoPageRoutingModule
  ],
  declarations: [ScanInfoPage]
})
export class ScanInfoPageModule {}
