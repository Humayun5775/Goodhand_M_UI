import { Component, OnInit } from '@angular/core';
import { SupportWhatsAppNo } from 'src/environments/environment';

@Component({
  selector: 'app-not-received-refund',
  templateUrl: './not-received-refund.component.html',
  styleUrls: ['./not-received-refund.component.css']
})
export class NotReceivedRefundComponent implements OnInit {

  SupportWhatsAppNo='';
  text='';
  constructor() { }

  ngOnInit(): void {
    this.SupportWhatsAppNo=SupportWhatsAppNo
    this.text='How can I help you?';
  }

}
