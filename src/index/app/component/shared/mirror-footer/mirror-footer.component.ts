import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-mirror-footer',
  templateUrl: './mirror-footer.component.html',
  styleUrls: ['./mirror-footer.component.css']
})
export class MirrorFooterComponent implements OnInit {
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
  IsMobile=false;
  mobiletxt='';
  mobileNo=''
  IsNameExist=true;
  NameDetail:any={name:'',email:''}
  @ViewChild('btnClose') btnClose:any;
  @ViewChild('btnLogin') btnLogin:any;
  @ViewChild('btninvalidotp') btninvalidotp:any;
   @ViewChild(NgOtpInputComponent, { static: false})
  ngOtpInput:any;
  constructor(private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }


  ngOnInit(): void {
    if(this.ls.getItem('customer')){
    if(this.router.url === '/account'){
    this.IsActive=true;
    }
    else{
      this.IsActive=false;
    }
    }
    else{
      this.IsActive=false;
    }
    
   if(window.innerWidth>=1080){
    this.IsMobile=false;
   }
   else{
    this.IsMobile=true;
   }
  }
//#region login

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
   this.mobileNo=MobileNo;
   this.categoryService.CheckCustomer(MobileNo).subscribe((cust:any)=>{
    debugger
   if(cust.length>0){
    if(cust[0].name=='' || cust[0].name==null  || cust[0].email=='' || cust[0].email==null  ){
      this.IsNameExist=false;
    }
    else{
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
 
   }
   else{
    this.IsNameExist=false;

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
 this.IsNameExist=true;
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
      
   this.mobileNo=MobileNo;
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
          if(this.NameDetail.name!='' && this.NameDetail.email!=''){
            let model={
              p_customer_id:data[0].id,
              p_name:this.NameDetail.name,
              p_phone:this.mobileNo,
              p_email:this.NameDetail.email,
              p_image:data[0].image
            }
            this.categoryService.UpdateProfile(model).subscribe((x:any) => {

              this.IsLoggedIn=true;
          
           this.sharedService.Message('Logged in successfully','success');
 this.btnClose.nativeElement.click();
          
 this.ls.setItem('customer',x);
if(this.sharedService.getLoginRedirect()){
  let url=this.sharedService.getLoginRedirect();
  this.sharedService.setLoginRedirect(null);
  this.route.navigate(['/'+url]); 
}
else{
 this.route.navigate(['/account']); 
}
   this.IsOTPLogin=false;
            });
          }
          else{
            this.IsLoggedIn=true;
          
           this.sharedService.Message('Logged in successfully','success');
 this.btnClose.nativeElement.click();
          
 this.ls.setItem('customer',data);
if(this.sharedService.getLoginRedirect()){
  let url=this.sharedService.getLoginRedirect();
  this.sharedService.setLoginRedirect(null);
  this.route.navigate(['/'+url]); 
}
else{
 this.route.navigate(['/account']); 
}
   this.IsOTPLogin=false;
          }
           
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
  this.mobiletxt=''
}
ResetLogin(){
  this.mobiletxt=''
  this.IsOTP=false;
  this.btnClose.nativeElement.click();
  this.ngOtpInput.setValue('');
}
clearOTP(){
  this.mobiletxt=''
  this.ngOtpInput.setValue('');

}
//#endregion

SaveNameDetail(){
  if(this.NameDetail.name!='' && this.NameDetail.email!=''){
    this.IsNameExist=true;
    let MobileNo=this.mobileNo;
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
}
}
