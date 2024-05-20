import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { vatPercent } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-booking-cancelled',
  templateUrl: './booking-cancelled.component.html',
  styleUrls: ['./booking-cancelled.component.css']
})
export class BookingCancelledComponent implements OnInit {

  constructor(private title: Title,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }

  datas:any={}
  service:any={}
  add:any;
  CancellationReasonsList:any;
  location:any;
  orderId:any;
  encryptedOrderId:any;
  isOrder=false;
  slotDate:any;
  slotTime:any;
  selectedSlotDate:any;
  selectedTime:any;
  activeDate:any;
  isCheckout=false;
  cancelReason='0';
  isResheduleView=true;
IsLoading=true;
IsCancelled=false;
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 5,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };
  isResudule=true;  
  @ViewChild('btnRescheduleClose') btnRescheduleClose:any;
  @ViewChild('btnCancelBooking') btnCancelBooking:any;
  @ViewChild('btnIncludeServices') btnIncludeServices:any;
  
@ViewChild('btnCancelledAnyway') btnCancelledAnyway:any;
    ngOnInit(): void {
      
    this.title.setTitle(" Mirrors Beauty Lounge | Cancellation"); // <-- Update the title 
   
      let model={PageName:'Booking cancelled',Title:'Booking cancelled',IsSearch:false,IsBackButton:false}
      this.sharedService.setPageName(model);
      this.encryptedOrderId=this.route.snapshot.paramMap.get('id')
      let dec={
        value:this.encryptedOrderId
      }
      this.sharedService.decryptData(dec).subscribe((en:any)=>{
        this.orderId = en.val;
      this.GetBookingOrder(this.orderId);
      this.GetBookingOrderDetail(this.orderId);
      this.GetSlotDateList(-7);
      });
      this.selectedSlotDate=this.selectedTime='';
    }
    GetBookingOrder(id:any){
    this.categoryService.GetBookingOrder(id).subscribe((obj:any)=>{
      
  if(obj.length>0){
    this.isOrder=true;
    this.datas=obj[0];  
    if(this.datas.status!=3){
      this.isOrder=false;
    }
    else{
    this.datas.date_slot= this.datas.date_time_slot.split(',')[0];
    this.datas.time_slot= this.datas.date_time_slot.split(',')[1].trim()=="00:00PM"?"12:00PM":this.datas.date_time_slot.split(',')[1].trim()=="00:00AM"?"12:A0PM":this.datas.date_time_slot.split(',')[1].trim()=="00:30PM"?"12:30PM":this.datas.date_time_slot.split(',')[1].trim()=="00:30AM"?"12:30AM":this.datas.date_time_slot.split(',')[1];
    this.GetCustomerAddress(this.datas.customer_address_id);
    this.GetLocation(this.datas.location_id);
    this.GetCancellationReasons();
    }
  }
    });
      
  }
  GetBookingOrderDetail(id:any){
    this.categoryService.GetBookingOrderDetail(id).subscribe((obj:any)=>{
      this.service=obj;
      this.IsLoading=false;
    });
      
  }
  GetCancellationReasons(){
    this.categoryService.GetCancellationReasons().subscribe((obj:any)=>{
      this.CancellationReasonsList=obj[0];
    });
      
  }
  GetCustomerAddress(id:any){
    this.categoryService.GetCustomerAddress('0',id).subscribe((data:any)=>{
  this.add=data[0];
    })
  }
  GetLocation(id:any){
    this.locationService.GetLocation().subscribe((data:any)=>{
  this.location=data.filter((x:any)=>x.id==id)[0];
    })
  }
  Cancelled(comment:any){
    let IsValid=1;
    this.btnCancelBooking.nativeElement.click();;
     
  if(this.cancelReason!='0'){
    
    if(!this.ls.getItem('customer')){
      this.sharedService.Message('Customer not exists','error');
      IsValid=0;
  }
  if(!this.ls.getItem('customer')){
    this.sharedService.Message('Customer not exists','error');
    IsValid=0;
  }
  if(!this.orderId || this.orderId=='0'){
    this.sharedService.Message('Order not exists','error');
    IsValid=0;
  }
  if(!this.cancelReason || this.cancelReason=='0'){
    this.sharedService.Message('Please select reason for cancellation','error');
    IsValid=0;
  }
  else{
    
  if(this.cancelReason=='7' && comment==''){
    this.sharedService.Message('Please enter reason for cancellation','error');
    IsValid=0;
  }
  }
  if(IsValid==1){
    this.IsLoading=true;
    let custId=this.ls.getItem('customer')[0].id;
      let model={
        p_order_id:this.orderId,
        p_reason_id:this.cancelReason,
        p_comment:comment,
        p_created_by:custId
      }
    this.categoryService.CancelOrder(model).subscribe((data:any)=>{
      this.IsLoading=false;
      
      this.sharedService.Message(data[0].msg,'success');
  
      this.btnRescheduleClose.nativeElement.click();
      this.btnCancelBooking.nativeElement.click();
      this.btnCancelledAnyway.nativeElement.click();
   this.router.navigate(['/cancelled/'+this.encryptedOrderId]);
  
    })
  }
  }
  this.cancelReason='0';
  
  }
  GetSlotDateList(days:number){
    
    this.slotDate = [];
    for (let I = 0; I < Math.abs(days); I++) {
      this.slotDate.push(new Date(new Date().getTime() - ((days >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toLocaleString());
    }
  this.getSlotDate(this.slotDate[0]);
  //this.GetSelectedSlot();
  }
  
  
  getSlotDate(data:any){
  
  let selectedDate = new Date(data);
  this.selectedSlotDate=data;
  this.selectedTime='';
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
  for (let i=0;tt<22.5*60; i++) {
  let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
  let mm = (tt%60); // getting minutes of the hour in 0-55 format
  this.slotTime[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
  tt = tt + x;
  }
  }
  if(this.selectedSlotDate!='' && this.selectedTime!=''){
    this.isResheduleView=true;
  }
  else{
    this.isResheduleView=false;
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
  
  if(this.selectedSlotDate!='' && this.selectedTime!=''){
    this.isResheduleView=true;
  }
  else{
    this.isResheduleView=false;
  }
  }
  GetSelectedSlot(){
  
  if(this.ls.getItem('slot')){
    let slot=this.ls.getItem('slot');
    this.selectedSlotDate=slot.selectedSlotDate;
    this.selectedTime=slot.selectedTime;
  
  }
  }
  Checkout(){
    if(this.selectedSlotDate!='' && this.selectedTime!=''){
    this.Reshedule();
    }
    else{
      if(this.isResheduleView) this.isResheduleView=false;
    }
  
  }
  Reshedule(){
    
  if(this.selectedSlotDate!='' && this.selectedTime!=''){
  this.IsLoading=true;
    let selectedSlotDate = new Date(this.selectedSlotDate)
    this.selectedSlotDate= selectedSlotDate.toISOString().slice(0, 10);
    let model={
      p_order_id:this.orderId,
      p_date_time_slot:this.selectedSlotDate.split(',')[0]+','+this.selectedTime
    }
    this.categoryService.Reschedule(model).subscribe((data:any)=>{
      this.IsLoading=false;
      if(data[0].code=='1'){
          
      let sms={
     
        p_msg:"Your appointment with Mirrors beauty Lounge on "+this.selectedSlotDate+" at "+this.selectedTime+" has been reschedule. Thank You!",
        p_mobile_number:this.ls.getItem('customer')[0]["phone"]
      }
      this.categoryService.SMS(sms).subscribe((x:any)=>{
        this.sharedService.Message(data[0].msg,'success');
      this.btnRescheduleClose.nativeElement.click();
      this.btnCancelBooking.nativeElement.click();
       this.router.navigate(['/reschedule/'+this.encryptedOrderId]);
      })
        }
        else{
          this.sharedService.Message(data[0].msg,'error');
        }
      
    })
  }
  }
  IsResudule(e:any){
  if(e){
    if(this.IsCancelled){
  
      this.IsCancelled=false;
    }
    else{
    this.isResudule=true
    this.isResheduleView=false;
    }
  }
  else{
    this.isResudule=false;
    this.isResheduleView=false;
  }
  this.selectedSlotDate=this.selectedTime='';
  }
  CancelModel(type:any) {
    this.isResheduleView=false;
   if(type=="btnRescheduleClose"){
    this.selectedSlotDate=this.selectedTime='';
     this.btnRescheduleClose.nativeElement.click();
  
  
   }
    if(type=="btnCancelBooking"){
    
    this.btnCancelBooking.nativeElement.click();;
  
   }
  }
  CancelledAnyway(e:any){
    this.IsCancelled=e;
  }
  GetAllService(){
    if(this.service.length>1){
      this.btnIncludeServices.nativeElement.click();
    }
  }
  GetHelp(){
    this.sharedService.SetOrder(this.orderId);
    this.router.navigate(['/booking/help']);
  }
  
  RedirectHome(){
    this.sharedService.SetOrder(this.orderId);
    this.router.navigate(['/']);
  }
}