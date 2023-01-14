import { Component, OnInit } from '@angular/core';
import {InfoService} from "./info.service";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";

@Component({
  selector: 'app-scan-info',
  templateUrl: './scan-info.page.html',
  styleUrls: ['./scan-info.page.scss'],
})
export class ScanInfoPage {
  data: string = "";
  qrScan: any;

  constructor(public info: InfoService, private qr: QRScanner) {
  }

  scan() {
    this.qr.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qr.show();
        document.getElementsByTagName('body')[0].style.opacity = "0";

        this.qrScan = this.qr.scan().subscribe((text: string) => {
          document.getElementsByTagName('body')[0].style.opacity = "1";
          this.qrScan.unsubscribe();
          this.qr.hide();

          let deviceName = text.substring(17, text.length);
          let deviceContact = text.substring(0, 11);
          let devicePin = text.substring(12, 16);

          this.info.addDevice(deviceName, deviceContact, devicePin);
        });
      }
      else if (status.denied) {
        this.qr.openSettings();
      }
      else {

      }
    })
      .catch((e: any) => alert('Error: ' + e));
  }
}

