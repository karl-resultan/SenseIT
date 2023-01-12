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

  constructor(public info: InfoService, private qr: QRScanner) {
  }

  scan() {
    this.qr.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          let scanSub = this.qr.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qr.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
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

