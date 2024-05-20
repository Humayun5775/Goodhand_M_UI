import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-refer-and-earn',
  templateUrl: './refer-and-earn.component.html',
  styleUrls: ['./refer-and-earn.component.css']
})
export class ReferAndEarnComponent implements OnInit {
  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
 
url='';
  ngOnInit(): void {
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
      this.url=encodeURIComponent(window.location.origin+'/#/home?ref='+this.sharedService.Encrypt(this.ls.getItem('customer')[0].id));
let text="Here's a AED 50 voucher to use on Mirror Beauty Lounge trusted salon and home services: "+this.url+" They have services ranging from home cleaning to salon at home. Make sure to install the app using the link provided by me to get rewarded. Expires in 4 weekends so hurry!"
this.url=  text;
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
