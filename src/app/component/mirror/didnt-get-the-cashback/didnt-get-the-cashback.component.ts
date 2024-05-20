import { Component, OnInit } from '@angular/core';
import { SupportWhatsAppNo } from 'src/environments/environment';

@Component({
  selector: 'app-didnt-get-the-cashback',
  templateUrl: './didnt-get-the-cashback.component.html',
  styleUrls: ['./didnt-get-the-cashback.component.css']
})
export class DidntGetTheCashbackComponent implements OnInit {
  SupportWhatsAppNo='';
  text='';
  constructor() { }

  ngOnInit(): void {
    this.SupportWhatsAppNo=SupportWhatsAppNo
    this.text='How can I help you?';
  }

}
