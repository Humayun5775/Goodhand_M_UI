import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  IsLoggedIn=false;
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
  IsActive=false;
  @ViewChild('btnClose') btnClose:any;
  @ViewChild('btnLogin') btnLogin:any;
  @ViewChild('btninvalidotp') btninvalidotp:any;
   @ViewChild(NgOtpInputComponent, { static: false})
  ngOtpInput:any;
  constructor(private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }


  ngOnInit(): void {
    
   
  }
//#region login
ngAfterViewInit(): void {
  if(this.ls.getItem('customer')){
    this.IsLoggedIn=true
  }
  else{
    this.IsLoggedIn=false;
   this.btnLogin.nativeElement.click();
  }
}
ValidMobile(MobileNo:string){
    
  if(MobileNo.length>8){
   MobileNo=MobileNo.replace(/\s/g, '');
   if(MobileNo.substring(0,3)!="+971")
   {
    if(MobileNo.substring(0,4)=="00971")
   {
    MobileNo="+971"+MobileNo.substring(4);
    this.IsValidNo=true;
   }
   else if(MobileNo.length==9)
   {
    MobileNo="+971"+MobileNo
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
 }
 else{
   this.IsValidNo=false;
 }
 }
 SendSMS(MobileNo:string){
   
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
   this.categoryService.SendSMS(MobileNo,"CartSession").subscribe((data:any)=>{
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
 //  else{
 //   alert('Enter mobile no.')
 //  }
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
EditNo(){
 this.timeLeft=30;
 this.IsValidNo=false;
 this.IsOTP=false;
 this.otpDetail={};
 this.IsResendOTP=false;
 clearInterval(this.interval);
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
      this.categoryService.SendSMS(MobileNo,"CartSession").subscribe((data:any)=>{
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
   login(otp:string){
     if(otp.length==4){
       this.IsOTPLogin=true;
       if(this.otpDetail.otp==otp){
         this.categoryService.CheckCustomer(this.otpDetail.mobile).subscribe((data:any)=>{
           this.IsLoggedIn=true;
          
           this.sharedService.Message('Logged in successfully','success');
 this.btnClose.nativeElement.click();
          
 this.ls.setItem('customer',data);


   this.IsOTPLogin=false;
   window.location.reload();
         })
       }
       else{
         
   this.btninvalidotp.nativeElement.click();
       }
     } 
    else{
     this.IsOTPLogin=false;
    }
   }

   getlogin(){
    if(this.ls.getItem('customer')){
      this.route.navigate(['/account']); 
      this.IsLoggedIn = true;
    }
    else{

      this.btnLogin.nativeElement.click();
      this.IsLoggedIn = false;
      
      
    }
   }
   
clearIsOTP(){
  this.IsOTP=false;
  this.btnClose.nativeElement.click();
}

clearOTP(){
    
  this.ngOtpInput.setValue('');

}
//#endregion
}
