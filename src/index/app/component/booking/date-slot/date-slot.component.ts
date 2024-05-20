import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import SwiperCore, { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-date-slot',
  templateUrl: './date-slot.component.html',
  styleUrls: ['./date-slot.component.css']
})
export class DateSlotComponent implements OnInit {
slotDate:any;
slotTime:any;
selectedSlotDate:any;
selectedTime:any;
activeDate:any;
isCheckout=false;
config: SwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 5,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};
  constructor(private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }

  ngOnInit(): void {
    let model={PageName:'Date & Timing',Title:'Date & Timing',IsSearch:false}
    this.sharedService.setPageName(model);
    this.GetSlotDateList(-7)
  }
  GetSlotDateList(days:number){
  
      this.slotDate = [];
      for (let I = 0; I < Math.abs(days); I++) {
        
        this.slotDate.push(new Date(new Date().getTime() - ((days >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toISOString());
      }
    this.getSlotDate(this.slotDate[0]);
    //this.GetSelectedSlot();
  }
  
  
  getSlotDate(data:any){
    
    let selectedDate = new Date(data);
this.selectedSlotDate=data;
this.selectedTime=null;
this.isCheckout=false;
    const d = new Date();
let TodayDay = d.getDay();
let SelectedDay = selectedDate.getDay();
let x = 30; //minutes interval
this.slotTime = []; // time array
let tt = 10*60; // start time
let ap = ['AM', 'PM']; // AM-PM
if(TodayDay==SelectedDay){
  
  let coeff = 1000 * 60 * 30;
 let rounded = new Date(Math.round(selectedDate.getTime() / coeff) * coeff)
  let curTime=rounded.getMinutes()+(rounded.getHours()*60);
  if(tt<curTime){
    tt= curTime+60
  }
  for (let i=0;tt<22*60; i++) {
    let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
    let mm = (tt%60); // getting minutes of the hour in 0-55 format
    this.slotTime[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + x;
  }
}
 else{
  
  //loop to increment the time and push results in array
  for (let i=0;tt<22*60; i++) {
    let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
    let mm = (tt%60); // getting minutes of the hour in 0-55 format
    this.slotTime[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + x;
  }
}
  

  }
  getSlotTime(data:any){
this.selectedTime=data;
let model={
  selectedSlotDate:this.selectedSlotDate,
  selectedTime:this.selectedTime,
}
this.ls.setItem('slot',model);
this.isCheckout=true;
  }
  GetSelectedSlot(){
    
    if(this.ls.getItem('slot')){
      let slot=this.ls.getItem('slot');
      this.selectedSlotDate=slot.selectedSlotDate;
      this.selectedTime=slot.selectedTime;

    }
  }
  Checkout(){
    this.router.navigate(['/checkout']);
    // if(this.ls.getItem('LocationId')==3){
    //   this.router.navigate(['/address']);
    // }
    // else{
    // this.router.navigate(['/checkout']);
    // }
  }
}
