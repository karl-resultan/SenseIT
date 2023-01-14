import { Injectable } from '@angular/core';
import {DeviceModel} from "../main/device.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  data: string = "";
  device_list: DeviceModel[] = [];

  constructor(private route: Router) { }

  addDevice(name: string, number: string, pin: string){
    let newDev = new DeviceModel(name, number, pin);
    this.device_list.push(newDev);
    this.route.navigate(['/main']);
  }
}
