import {Component, NgModule, OnInit} from '@angular/core';
import { SmsManager } from "@byteowls/capacitor-sms";
import { DeviceModel } from "./device.model";
import {InfoService} from "../scan-info/info.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {
  device_list: DeviceModel[] = [];

  constructor(public info: InfoService) { }

  ngOnInit() {
    this.device_list = this.info.device_list;
    let sample = new DeviceModel('Sample Device', '09427484468', '1234');
    this.device_list.push(sample);
  }

  sendSms(contact: string, pin: string) {
    console.log(contact.substring(2, 10));
    const numbers: string[] = [`${contact}`];
    SmsManager.send({
      numbers: numbers,
      text: pin,
    }).then(() => {
      console.log('success');
    }).catch(error => {
      console.error(error);
    });
  }
}
