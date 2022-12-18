import { Injectable } from '@angular/core';
import {DeviceModel} from "../main/device.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  device_list: DeviceModel[] = [];

  constructor(private route: Router) { }

  addDevice(number: string, pin: string){
    let newDev = new DeviceModel(number, pin);
    this.device_list.push(newDev);
    this.route.navigate(['/main']);
  }
}
