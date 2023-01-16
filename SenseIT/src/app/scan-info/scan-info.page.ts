import { Component, OnInit } from '@angular/core';
import { InfoService } from "./info.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Device } from '../main/device.interface';
import { SmsManager } from '@byteowls/capacitor-sms';

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

  sendSms(contact: string, pin: string, device: Device): boolean {
    let result = false;

    console.log(contact.substring(2, 10));

    const numbers: string[] = [`${contact}`];

    SmsManager.send({
      numbers: numbers,
      text: pin,
    }).then(() => {
      alert("The command has been sent.");
      this.info.addDevice(device);
    }).catch(error => {
      alert("Something went wrong while sending the command. Please make sure that your device has sufficient load balance or is connected to your cellular network. ");
    });

    return result;
  }

  scan() {

    this.qr.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qr.show();
        document.getElementsByTagName('body')[0].style.opacity = "0";

        this.qrScan = this.qr.scan().subscribe((text: string) => {
          document.getElementsByTagName('body')[0].style.opacity = "1";

          let device: Device = JSON.parse(text);

          this.sendSms(device.device_contact, device.device_pin, device)

          this.qrScan.unsubscribe();
          this.qr.hide();

        });
      }
      else if (status.denied) {
        this.qr.openSettings();
      }
    })
      .catch((e: any) => alert('Error: ' + e));
  }
}

