import { Component, OnInit } from '@angular/core';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private sms: SMS) { }

  ngOnInit() {
    this.sms.send('111222', 'Hello!');
  }

}
