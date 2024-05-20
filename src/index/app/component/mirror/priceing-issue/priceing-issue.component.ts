import { Component, OnInit } from '@angular/core';
import { SupportWhatsAppNo } from 'src/environments/environment';

@Component({
  selector: 'app-priceing-issue',
  templateUrl: './priceing-issue.component.html',
  styleUrls: ['./priceing-issue.component.css']
})
export class PriceingIssueComponent implements OnInit {
  SupportWhatsAppNo='';
  text='';
  constructor() { }

  ngOnInit(): void {
    this.SupportWhatsAppNo=SupportWhatsAppNo
    this.text='How can I help you?';
  }

}
