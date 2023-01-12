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

  addDevice(number: string, pin: string){
    let newDev = new DeviceModel(this.data, this.data);
    this.device_list.push(newDev);
    this.route.navigate(['/main']);
  }
}
