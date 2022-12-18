import { Component, OnInit } from '@angular/core';
import {InfoService} from "./info.service";

@Component({
  selector: 'app-scan-info',
  templateUrl: './scan-info.page.html',
  styleUrls: ['./scan-info.page.scss'],
})
export class ScanInfoPage implements OnInit {
  contact: string = "";
  pin: string = ""

  constructor(public info: InfoService) {
  }

  ngOnInit() {
    // this.qrScanner.prepare()
    //   .then((status: QRScannerStatus) => {
    //     if (status.authorized) {
    //       // camera permission was granted
    //
    //
    //       // start scanning
    //       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    //         console.log('Scanned something', text);
    //
    //         this.qrScanner.hide(); // hide camera preview
    //         scanSub.unsubscribe(); // stop scanning
    //       });
    //
    //     } else if (status.denied) {
    //       // camera permission was permanently denied
    //       // you must use QRScanner.openSettings() method to guide the user to the settings page
    //       // then they can grant the permission from there
    //     } else {
    //       // permission was denied, but not permanently. You can ask for permission again at a later time.
    //     }
    //   })
    //   .catch((e: any) => console.log('Error is', e));
  }

  submitInfo(){
    this.info.addDevice(this.contact, this.pin);
  }

}

