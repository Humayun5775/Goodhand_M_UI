import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  locationList:any; 
  constructor(private title: Title,private locationService:LocationService) { }

  ngOnInit(): void {
    this.title.setTitle(" Mirrors Beauty Lounge | Contact Us"); // <-- Update the title 
    this.GetLocation();
  }
  
 GetLocation(){
  this.locationService.GetLocation().subscribe((data:any)=>{
    this.locationList=data;
  })
 }
}
