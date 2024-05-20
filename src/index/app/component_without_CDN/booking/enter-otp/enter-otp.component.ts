import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.css']
})
export class EnterOTPComponent implements OnInit {
  timeLeft: number = 30;
  interval:any;
  otpDetail:any;
  IsResend=false;
  locationName='';
  constructor(private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
 

  ngOnInit(): void {
    if(this.sharedService.IsloggedIn()) this.route.navigate([category']);
   
    
    let model={PageName:'Enter OTP',Title:'Enter OTP',IsSearch:false}
    this.sharedService.setPageName(model);
    this.GetLocation()
    if(this.categoryService.GetOTPDetail()){
this.otpDetail=this.categoryService.GetOTPDetail();

      this.startTimer();
    }
    else{
      this.route.navigate([enter-mobile']);
    }
  }
  
  GetLocation(){
    this.locationName=this.ls.getItem('LocationName')
//     this.locationService.GetLocation().subscribe((data:any)=>{
      
//       let location=data;
      
//       location=data; //.map(y => ({ name:y.patientVisitID,value:y.patientVisitID}));
// this.locationName=location.filter((x:any)=>x.id==this.ls.getItem('LocationId')).map((y:any)=>y.location_name)
        
// });
}
startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.IsResend=true;
        //this.timeLeft = 60;
      }
    },1000)
  }
  login(otp:string){
    if(otp.length==4){
      if(this.otpDetail.otp==otp){
        this.categoryService.CheckCustomer(this.otpDetail.mobile).subscribe((data:any)=>{
          

          this.LoggedInCart(data)
this.ls.setItem('customer',data);
if(this.ls.getItem('LocationId')=='3'){
  this.route.navigate([address']);
  }
  else{
    if(this.ls.getItem('slot')){
      this.route.navigate([checkout']);
    }
    else{
    this.route.navigate([date-slot']);
    }
  }
        })
      }
      else{
        alert('Invalid OTP..!');
      }
    } 
   
  }
  ResendOTP(){
if(this.otpDetail.mobile)
{
  debugger
  let MobileNo=this.otpDetail.mobile;
  MobileNo=MobileNo.replace(/\s/g, '');
       if(MobileNo.substring(0,3)!="+971")
       {
        if(MobileNo.substring(0,4)=="00971")
       {
        MobileNo="+971"+MobileNo.substring(4)
       }
     else if(MobileNo.length==10 &&MobileNo.substring(0,1)=="0")
       {
        MobileNo="+971"+MobileNo.substring(1)
       }
       }
  if(MobileNo.trim()!=""){
    this.categoryService.SendSMS(MobileNo,"").subscribe((data:any)=>{
      if(data.statuscode=="200"){
        let otp=data.messages[0].message.split(" ")[1];
      let otpDetail={
        otp:otp,
        msg:"OTP has been sent succesfully to +971 ** *** **"+MobileNo.slice(-2),
        mobile:MobileNo
      }
        this.categoryService.SetOTPDetail(otpDetail);
       
      }
      else{
        alert('Invalid mobile no.')
      }
          
          });
   }
   else{
    alert('Enter mobile no.')
   }
}
  }

  LoggedInCart(model:any){
if(model){
  let customerId=model.id;
  this.categoryService.GetBookingCustomerCart(customerId).subscribe((data:any)=>{
    let custCart=data;
    let cart=this.ls.getItem('')
    custCart.forEach((element:any) => {
      
    });
  });
}
  }
}
