import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  IsOTP=false;
  IsValidNo=false;
  otpDetail:any={};
  timeLeft: number = 30;
  interval:any;
  IsOTPProceed=false;
  IsOTPLogin=false;
  InvalidCoupon=false;
  IsPreLoading=true;
  IsLoading=false;
  IsResendOTP=false;
  constructor(private title: Title,private activatedRoute: ActivatedRoute,private eRef: ElementRef,private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) { }

  @ViewChild('btnClose') btnClose:any;
  @ViewChild('btninvalidotp') btninvalidotp:any;
  @ViewChild(NgOtpInputComponent, { static: false})
  ngOtpInput:any;
  data:any={
    is_whatsapp_update:0,
    is_sms_update:0,
    is_email_update:0,
  };
  ngOnInit(): void {
    this.title.setTitle(" Mirrors Beauty Lounge | Setting"); // <-- Update the title 
this.GetCustomer();
  }
GetCustomer(){
  if(this.ls.getItem('customer')){
    

    this.categoryService.GetCustomer(this.ls.getItem('customer')[0].id).subscribe((data:any)=>{
      this.data.is_whatsapp_update=data[0].is_whatsapp_update;
      this.data.is_sms_update=data[0].is_sms_update;
      this.data.is_email_update=data[0].is_email_update;

    });
  }
}

DeleteAccount(otp:string){
  if(otp.length==4){
    this.IsOTPLogin=true;
    if(this.otpDetail.otp==otp){
      if(this.ls.getItem('customer')){
        let model={
          p_customer_id:this.ls.getItem('customer')[0].id
        }
        this.categoryService.DeleteCustomer(model).subscribe((data:any)=>{
         
         if(data[0].code==1){
          this.sharedService.Message(data[0].msg,'success');
          this.logout();
         }
        })
      }
    }
    else{
      
this.btninvalidotp.nativeElement.click();
    }
  } 
 else{
  this.IsOTPLogin=false;
 }
}

    UdateSetting(){
      
      this.data.is_whatsapp_update=this.data.is_whatsapp_update==true?1:0;
      this.data.is_sms_update=this.data.is_sms_update==true?1:0;
      this.data.is_email_update=this.data.is_email_update==true?1:0;
      
    let model={
      p_customer_id:this.ls.getItem('customer')[0].id,
      p_is_whatsapp_update: this.data.is_whatsapp_update,
      p_is_sms_update: this.data.is_sms_update,
      p_is_email_update: this.data.is_email_update
    }
    this.categoryService.UpdateCustomerSetting(model).subscribe((data:any)=>{
       
      if(data[0].code){
      
       this.sharedService.Message(data[0].msg,'success');
       
      }
   });
    }
    

clearOTP(){
    
  this.ngOtpInput.setValue('');

}

ResendOTP(){
  if(this.otpDetail.mobile)
  {
    this.IsLoading=true;
    let MobileNo=this.otpDetail.mobile;
    MobileNo=MobileNo.replace(/\s/g, '');
         if(MobileNo.substring(0,3)!="+971")
         {
          if(MobileNo.substring(0,4)=="00971")
         {
          MobileNo="+971"+MobileNo.substring(4)
          this.IsValidNo=true;
         }
       else if(MobileNo.length==10 &&MobileNo.substring(0,1)=="0")
         {
          MobileNo="+971"+MobileNo.substring(1)
          this.IsValidNo=true;
         }
         else{
           this.IsValidNo=false;
         }
         }
         else{
           this.IsValidNo=false;
         }
    if(MobileNo.trim()!=""){
      let smodel={
        MobileNo:MobileNo,
        CartSession:"CartSession"
      } 
      this.categoryService.SendSMS(smodel).subscribe((data:any)=>{
        if(data.statusCode=="200"){
          let otp=data.data.messages[0].message.split(" ")[1];
        let otpDetail={
          otp:otp,
          msg:"OTP has been sent succesfully to +971 ** *** **"+MobileNo.slice(-2),
          mobile:MobileNo
        }
          this.categoryService.SetOTPDetail(otpDetail);
          this.sharedService.Message(otpDetail.msg,'success')
        }
        else{
          this.sharedService.Message('Invalid mobile no.','error')
          
        }
           this.IsLoading=false;
            });
     }
     else{
      this.sharedService.Message('Enter mobile no.','error')
     }
  }
    }
startTimer() {
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.IsResendOTP=true;
      //this.timeLeft = 60;
    }
  },1000)
 }
SendSMS(){
    
   if(this.ls.getItem('customer')){
let MobileNo=this.ls.getItem('customer')[0].phone
  if(MobileNo.length>8){
    MobileNo=MobileNo.replace(/\s/g, '');
    if(MobileNo.substring(0,3)!="+971")
    {
     if(MobileNo.substring(0,4)=="00971")
    {
     MobileNo="+971"+MobileNo.substring(4)
    }
    else if(MobileNo.length==9)
    {
     MobileNo="+971"+MobileNo
    }
  else if(MobileNo.length==10 &&MobileNo.substring(0,1)=="0")
    {
     MobileNo="+971"+MobileNo.substring(1)
    }
    }

 this.IsOTPProceed=true;
 
  
 let smodel={
  MobileNo:MobileNo,
  CartSession:"CartSession"
} 
this.categoryService.SendSMS(smodel).subscribe((data:any)=>{
      MobileNo=MobileNo.replace(/\s/g, '');
      
      if(data.statusCode=="200"){
        let otp=data.data.messages[0].message.split(" ")[1];
      let otpDetail={
        otp:otp,
        msg:"OTP has been sent succesfully to +971 ** *** **"+MobileNo.slice(-2),
        mobile:MobileNo
      }
      this.IsOTP=true;
      this.otpDetail=otpDetail;
        this.categoryService.SetOTPDetail(otpDetail);
        this.startTimer();
        this.IsOTPProceed=false;
       
       // this.route.navigate([enter-otp']); 
      }
      else{
        this.sharedService.Message('Invalid mobile no.','error')
      }
          
          });
   }
  }

 } 
 clearIsOTP(){
  this.IsOTP=false;
  this.btnClose.nativeElement.click();
}
logout(){
  let LAdd=this.ls.getItem('LocationAddress');
  let LId=this.ls.getItem('LocationId');
  let LName=this.ls.getItem('LocationName');
  this.ls.clear();
  
  this.ls.setItem('LocationAddress',LAdd);
  this.ls.setItem('LocationId',LId);
  this.ls.setItem('LocationName',LName);
  
 this.route.navigate(['/home']);
}
}
