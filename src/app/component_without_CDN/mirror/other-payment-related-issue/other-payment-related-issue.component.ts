import { Component, OnInit } from '@angular/core';
import { SupportWhatsAppNo } from 'src/environments/environment';

@Component({
  selector: 'app-other-payment-related-issue',
  templateUrl: './other-payment-related-issue.component.html',
  styleUrls: ['./other-payment-related-issue.component.css']
})
export class OtherPaymentRelatedIssueComponent implements OnInit {

  SupportWhatsAppNo='';
  text='';
  constructor() { }

  ngOnInit(): void {
    this.SupportWhatsAppNo=SupportWhatsAppNo
    this.text='How can I help you?';
  }


}
