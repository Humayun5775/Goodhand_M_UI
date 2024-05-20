import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import {DomSanitizer, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-refer-and-earn',
  templateUrl: './refer-and-earn.component.html',
  styleUrls: ['./refer-and-earn.component.css']
})
export class ReferAndEarnComponent implements OnInit {
  constructor(private title: Title,private sanitizer:DomSanitizer,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
 
url='';
whatsAppurl='';
  ngOnInit(): void {
    this.title.setTitle(" Mirrors Beauty Lounge | Refer & Earn"); // <-- Update the title 
    this. GetUrl();
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
  GetUrl(){
    
    if(this.ls.getItem('customer')){
      let model={
        value:this.ls.getItem('customer')[0].id 
      }
debugger
      this.url=window.location.origin+'/#/home?ref='+this.sharedService.Encrypt(this.ls.getItem('customer')[0].id);
let text="Hey! Now you can Get AED 50 off on any selected PAMPERING SERVICE with Mirrors Beauty Lounge! and they are offering Home services as well. Check out their webiste "+this.url+" and avail luxury pampering sessions today! Hurry Up!, offer expires in the next 4 weeks."
this.whatsAppurl= encodeURIComponent( text);
this.url=text;
}
  }
  copyToClipboard() {
    // Create a textarea element to hold the text to be copied
    const textarea = document.createElement('textarea');
  
    // Set the text to be copied
    textarea.value = this.url;
  
    // Append the textarea to the body
    document.body.appendChild(textarea);
  
    // Select the text in the textarea
    textarea.select();
  
    // Copy the text to the clipboard
    document.execCommand('copy');
  
    // Remove the textarea from the body
    document.body.removeChild(textarea);
    this.sharedService.Message('Link copied to clipboard','success');
  }
}
