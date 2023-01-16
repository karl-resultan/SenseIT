import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Device } from '../main/device.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  data: string = "";
  device_list: Device[] = [];

  constructor(private route: Router) { }

  getDeviceList(): Device[] {
    let devices: Device[] = []
    if (localStorage.getItem('device_list')) {
      devices = JSON.parse(<string>localStorage.getItem("device_list"))
    }
    return devices;
  }

  appendDevice(device: Device) {

    const devices: Device[] = this.getDeviceList();
    devices.push(device);

    if (devices.length > 0) {
      localStorage.setItem("device_list", JSON.stringify(devices))
    }else{
      let devs: Device[] = [];
      devs.push(device);
      localStorage.setItem("device_list", JSON.stringify(devs))
    }
  }

  addDevice(device: Device) {
    this.appendDevice(device)
    this.device_list.push(device);
    this.route.navigate(['/main']);
  }
}
