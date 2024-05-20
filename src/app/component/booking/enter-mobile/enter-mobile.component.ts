import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-enter-mobile',
  templateUrl: './enter-mobile.component.html',
  styleUrls: ['./enter-mobile.component.css']
})
export class EnterMobileComponent implements OnInit {
  constructor(private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }


  ngOnInit(): void {
    
    let model={PageName:'Login',Title:'Login',IsSearch:false}
    this.sharedService.setPageName(model);
    if(this.sharedService.IsloggedIn()) this.route.navigate(['/category']);
  

  }
  

  SendSMS(MobileNo:string){
    debugger
   if(MobileNo.trim()!=""){
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
    // let otpDetail={
    //       otp:'1111',
    //       msg:"OTP has been sent succesfully to +971 ** *** **"+MobileNo.slice(-2),
    //       mobile:MobileNo
    //     }
    //       this.categoryService.SetOTPDetail(otpDetail);
    //       this.route.navigate(['/enter-otp']);
    let smodel={
      MobileNo:MobileNo,
      CartSession:"CartSession"
    } 
    this.categoryService.SendSMS(smodel).subscribe((data:any)=>{
      MobileNo=MobileNo.replace(/\s/g, '');
      debugger
      if(data.statusCode=="200"){
        let otp=data.data.messages[0].message.split(" ")[1];
      let otpDetail={
        otp:otp,
        msg:"OTP has been sent succesfully to +971 ** *** **"+MobileNo.slice(-2),
        mobile:MobileNo
      }
        this.categoryService.SetOTPDetail(otpDetail);
        this.route.navigate(['/enter-otp']); 
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
