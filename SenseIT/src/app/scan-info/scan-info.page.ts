import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfoService } from "./info.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Device } from '../main/device.interface';
import { SmsManager } from '@byteowls/capacitor-sms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-scan-info',
  templateUrl: './scan-info.page.html',
  styleUrls: ['./scan-info.page.scss'],
})
export class ScanInfoPage implements OnInit {
  data: string = "";
  qrScan: any;

  @Output("reloadParent") reloadParent: EventEmitter<any> = new EventEmitter();

  
  constructor(public info: InfoService, private qr: QRScanner, private route: Router) {
  }
  
  ngOnInit(): void {
    const devs: Device[] = [];

    const sample: Device = {
      device_name: 'SenseIT',
      device_contact: '09812442004',
      device_pin: '1234abcd'
    }

    this.info.addDevice(sample)
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
      this.route.navigateByUrl('/main');
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

