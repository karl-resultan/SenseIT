import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRScanner } from "@ionic-native/qr-scanner/ngx";
import { MainPage } from './main/main.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScanInfoPage } from './scan-info/scan-info.page';

@NgModule({
  declarations: [AppComponent, MainPage, ScanInfoPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner],
  bootstrap: [AppComponent],
})

export class AppModule {}