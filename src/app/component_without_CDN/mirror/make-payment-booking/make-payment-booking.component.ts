import { Component, OnInit } from '@angular/core';
import { SupportWhatsAppNo } from 'src/environments/environment';
@Component({
  selector: 'app-make-payment-booking',
  templateUrl: './make-payment-booking.component.html',
  styleUrls: ['./make-payment-booking.component.css']
})
export class MakePaymentBookingComponent implements OnInit {

  SupportWhatsAppNo='';
  text='';
  constructor() { }

  ngOnInit(): void {
    this.SupportWhatsAppNo=SupportWhatsAppNo
    this.text='How can I help you?';
  }

}
