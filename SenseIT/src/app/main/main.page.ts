import {Component, NgModule, OnInit} from '@angular/core';
import { SmsManager } from "@byteowls/capacitor-sms";
import {InfoService} from "../scan-info/info.service";
import { Device } from './device.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {
  device_list: Device[] = [];

  constructor(public info: InfoService) { }

  ngOnInit() {
    const devs: Device[] = [];
    const sample: Device = {
      device_name: 'SenseIT',
      device_contact: '09812442004',
      device_pin: '12345678'
    }

    devs.push(sample);

    localStorage.setItem("device_list", JSON.stringify(devs));
    this.device_list = this.getDeviceList();
  }

  getDeviceList(): Device[]{
    let devices :Device[] = []
    if(localStorage.getItem('device_list')){
      devices = JSON.parse(<string>localStorage.getItem("device_list"))
    }
    return devices;
  }

  sendSms(contact: string, pin: string) {
    console.log(contact.substring(2, 10));
    const numbers: string[] = [`${contact}`];
    SmsManager.send({
      numbers: numbers,
      text: pin,
    }).then(() => {
      return "success";
    }).catch(error => {
      console.error(error);
    });
  }
}
