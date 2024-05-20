import { Component, OnInit } from '@angular/core';
import { SupportWhatsAppNo } from 'src/environments/environment';

@Component({
  selector: 'app-incorrect-refund',
  templateUrl: './incorrect-refund.component.html',
  styleUrls: ['./incorrect-refund.component.css']
})
export class IncorrectRefundComponent implements OnInit {

  SupportWhatsAppNo='';
  text='';
  constructor() { }

  ngOnInit(): void {
    this.SupportWhatsAppNo=SupportWhatsAppNo
    this.text='How can I help you?';
  }
}
