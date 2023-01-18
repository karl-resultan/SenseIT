import {Component, EventEmitter, NgModule, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public info: InfoService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
   }

  reloadParent(){
    this.device_list = this.getDeviceList();
  }

  ngOnInit() {
    this.device_list = this.getDeviceList();
  }

  public reloadDevices(){
    this.device_list = this.getDeviceList();
  }

  getDeviceList(): Device[]{
    let devices :Device[] = []

    if(localStorage.getItem('device_list')){
      devices = JSON.parse(<string>localStorage.getItem("device_list"))
    }

    return devices;
  }

  resetDevice(contact: string){
    console.log(contact.substring(2, 10));
    const numbers: string[] = [`${contact}`];
    SmsManager.send({
      numbers: numbers,
      text: "RESET",
    }).then(() => {
      alert('The command was sent successfully.');
    }).catch(error => {
      console.error(error);
    });
  }

  openScanner(){
    this.router.navigateByUrl('/scan-info');
  }

  removeDevice(contact: string){
    localStorage.removeItem("device_list");
    this.device_list = [];

    console.log(contact.substring(2, 10));
    const numbers: string[] = [`${contact}`];
    SmsManager.send({
      numbers: numbers,
      text: "REMOVE",
    }).then(() => {
      localStorage.removeItem("device_list");
      this.device_list = [];
      alert('The command was sent successfully.');
    }).catch(error => {
      console.error(error);
    });
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
