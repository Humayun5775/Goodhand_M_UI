import { IfStmt } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent,NgOtpInputConfig } from 'ng-otp-input';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { vatPercent } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(private title: Title,private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
  mainList:any=[];
  IsAdded:any=[];
  locationList:any;
  count:any={};
  breakDownItem:any={}
  isDisable:any=[]
  IsValidCoupon=false;
  IsOtherAmount=false;
  ValidCouponCode='';
  TotalService=0;
  vatPercent=vatPercent;
  ServiceAmount:any=[];
  TotalPrice=0;
  tip:any;
  tipList:any=[false,false,false,false];
  IsCartExist=false;
  IsLoggedIn=false;
  IsOTP=false;
  IsValidNo=false;
  otpDetail:any={};
  timeLeft: number = 30;
  interval:any;
  IsResendOTP=false;
  CouponCount=0;
  CouponCountList:any;
  ProcessName="";  
  LocationName="";  
  LocationAddress="";  
  HomeAddress="";
  SlotDate="";
  SlotTime="";
  fatList:any=[];
  IsOTPProceed=false;
  IsOTPLogin=false;
  InvalidCoupon=false;
  IsPreLoading=true;
  IsLoading=false;
  addressId=0;
  EditaddressId=0;
  chkFutureTip=false;
  IsMobile=false;
  mobiletxt='';
  mobileNos=''
  IsNameExist=true;
  NameDetail:any={name:'',email:''}
  @ViewChild('btnClose') btnClose:any;
  @ViewChild('btnareyousure') btnareyousure:any;
  @ViewChild('btnCloseLocation') btnCloseLocation:any;
  @ViewChild('btnCloseDateSlot') btnCloseDateSlot:any;
  @ViewChild('btnCloseCoupon') btnCloseCoupon:any;
  @ViewChild('btnCloseSaveAddress') btnCloseSaveAddress:any;
  @ViewChild('btnCloseSelectaddresss') btnCloseSelectaddresss:any;
  @ViewChild('btncouponnyousave') btncouponnyousave:any;
  @ViewChild('btncouponnoexist') btncouponnoexist:any;
  @ViewChild('btninvalidotp') btninvalidotp:any;
  @ViewChild('btnselectaddresss') btnselectaddresss:any;
  @ViewChild('btnaddnewaddressmap') btnaddnewaddressmap:any;
  @ViewChild('btndataandslot') btndataandslot:any;
  @ViewChild('btnPrice') btnPrice:any;
  @ViewChild('mobileNo') mobileNo:any;
  @ViewChild('btntermsncondition') btntermsncondition:any;
  @ViewChild('btnprivacypolicy') btnprivacypolicy:any;
  @ViewChild('btncancellationpolicy') btncancellationpolicy:any;
  IsServiceAvb=false;
  DiffPrice=0;
  totalServiceMin=0;
  tipAmt:any;
  newLocationId=0;
  updatedLocationPriceList:any=[];
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 5,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };
  @ViewChild(NgOtpInputComponent, { static: false})
   ngOtpInput:any;
  ngOnInit(): void {

    this.title.setTitle(" Mirrors Beauty Lounge | Viewcart"); // <-- Update the title 
    
  this.sharedService.AddLog('Viewcart','load');
    if(this.sharedService.IsloggedIn()){
      this.IsLoggedIn=true;
    
    }
    else{
      this.IsLoggedIn=false;
    }
    let model={PageName:'Cart Summary',Title:'Cart Summary',IsSearch:false}
    this.sharedService.setPageName(model);
    this.SlotDate="";
    this.SlotTime="";
this.SubCategoryServices(0);
this.GetServiceCart();
this.CouponList();
window.scroll(0,0);
this.ls.removeItem('slot');
this.GetLocation();
this.GetDetail();
  }
 
  GetLocation(){
    
        this.locationService.GetLocation().subscribe((data:any)=>{
           this.locationList=data.filter((x:any)=>x.id!=3 && x.id!=this.ls.getItem('LocationId')); 
       
    });
    }
GetServiceCart(){
  this.TotalPrice=0;
  let cart=this.ls.getItem('cart')
  if(this.ls.getItem('LocationId')){
if(cart){
  
  if(cart.length>0)
  {
    let p_master_service_ids='';
    for (let ab = 0; ab < cart.length; ab++) {
      const c = cart[ab];
      p_master_service_ids+=c.master_service_id+',';
    }
    p_master_service_ids=  p_master_service_ids.replace(/,\s*$/, "");
    let model={
      p_location_id:this.ls.getItem('LocationId'),
      p_master_service_ids:p_master_service_ids
    }
// this.categoryService.GetService('0','0','0',this.ls.getItem('LocationId')).subscribe((data:any)=>{
  this.categoryService.GetServiceAmountByLocation(model).subscribe((data:any)=>{
    let newcart:any=[];
    this.fatList=[];
    for (let index = 0; index < data.length; index++) {
      
      const fq = data[index];
      let fmodel={
        p_location_id:this.ls.getItem('LocationId'),
        p_master_service_ids:fq.frequently_bought
      }
  
      this.categoryService.GetServiceAmountByLocation(fmodel).subscribe((f:any)=>{
        for (let index = 0; index < f.length; index++) {
          const element = f[index];
          
        let IsExistCart=cart.filter((x:any)=>x.master_service_id==element.master_service_id);
          let isExists=this.fatList.filter((x:any)=>x.master_service_id==element.master_service_id)
  if(isExists.length==0 && IsExistCart.length==0){
          this.fatList.push(element);
  }
        }
        
      });
    }
    cart.forEach((c:any) => {

      for (let index = 0; index < data.length; index++) {

        const d = data[index];
      if(d.master_service_id==c.master_service_id){
        newcart.push(c);
        this.ServiceAmount[c.master_service_id]=d.amount;
        // let TolSerAmt=(parseFloat(this.ServiceAmount[c.master_service_id])+(parseFloat(vatPercent)*parseFloat(this.ServiceAmount[c.master_service_id])))
        this.TotalPrice+=(this.ServiceAmount[c.master_service_id]*c.qty);
        break;
      }
      }
});
this.ls.setItem('cart',newcart);
this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
  });
  
  this.IsCartExist=true;
  }
  else this.IsCartExist=false;

}
else{
  this.IsCartExist=false;
  //this.router.navigate(['/service-detail']);
}
  }
}

  SubCategoryServices(IsReload:number){
    debugger
    let cart= this.ls.getItem('cart')
    if(cart){
      if(cart.length==0){
        this.IsCartExist=false;
      //  this.router.navigate(['/service-detail']);
      }
      this.TotalService= cart.reduce((total:any,line:any) => total + line.qty ,0);
    }
    else{
      this.IsCartExist=false;
      //this.router.navigate(['/service-detail']);
    }
    
    this.totalServiceMin=0;
   if(IsReload==0) this.mainList=[];
    this.breakDownItem.total=0;
    this.breakDownItem.discount=0;
    this.breakDownItem.offer=0;
    this.breakDownItem.mebership=0;
    this.breakDownItem.tip=0;
    this.breakDownItem.grandTotal=0;
    this.breakDownItem.vat=0;
    if(this.ls.getItem('BillDetail')){
      this.breakDownItem.mebership=this.ls.getItem('BillDetail').Mebership;
      this.breakDownItem.offer=this.ls.getItem('BillDetail').Offer;
      this.breakDownItem.tip=isNaN(this.ls.getItem('BillDetail').TIP)==true?0:this.ls.getItem('BillDetail').TIP;
      if(!this.breakDownItem.tip) 
      {
      this.breakDownItem.tip=0;
      }
      if(this.breakDownItem.tip==5) this.tipList[0]=true;
      if(this.breakDownItem.tip==10) this.tipList[1]=true;
      if(this.breakDownItem.tip==20) this.tipList[2]=true;
      if(this.breakDownItem.tip!=0 && this.breakDownItem.tip!=5 && this.breakDownItem.tip!=10 && this.breakDownItem.tip!=20) {
        this.tipList[3]=true;
    
        this.tipAmt=this.breakDownItem.tip;
      }
   
    }
    if(isNaN(this.breakDownItem.tip)){
      this.breakDownItem.tip=0
    }
    if(this.breakDownItem.tip==0){
      if(this.ls.getItem('customer')){
        let tip=this.ls.getItem('customer')[0].tip;
        if(tip!='' && tip!='0'){
          this.breakDownItem.tip=tip;
          this.chkFutureTip=true;
          if(this.breakDownItem.tip==5) this.tipList[0]=true;
          if(this.breakDownItem.tip==10) this.tipList[1]=true;
          if(this.breakDownItem.tip==20) this.tipList[2]=true;
          if(this.breakDownItem.tip!=0 && this.breakDownItem.tip!=5 && this.breakDownItem.tip!=10 && this.breakDownItem.tip!=20) 
          {
            this.tipList[3]=true;
            this.tipAmt=this.breakDownItem.tip;
          }
       
        }
       
      }
    }
    if(cart){
    
      cart.forEach((element:any) => {
        let model={
          p_location_id:this.ls.getItem('LocationId'),
          p_master_service_ids:element.master_service_id
        }
    //  this.categoryService.GetService(element.master_service_id,'0','0',this.ls.getItem('LocationId')).subscribe((obj:any)=>{
      this.categoryService.GetServiceAmountByLocation(model).subscribe((obj:any)=>{    
    this.isDisable[obj.master_service_id]=false;
        if(obj.length>0){
          obj=obj[0];
          this.count[obj.master_service_id]=element.qty;
          this.breakDownItem.total+=(obj.original_price*element.qty);
       //   this.breakDownItem.discount+=(obj.discount_price*element.qty);
       if(isNaN(this.breakDownItem.tip)){
        this.breakDownItem.tip=0
      }
          this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership  -this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
          this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+ parseFloat(this.breakDownItem.tip) -this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
          if(IsReload==0) 
          { this.mainList.push(obj);
            let amt=parseFloat(obj.duration)*element.qty
            this.totalServiceMin=amt+this.totalServiceMin
          this.IsPreLoading=false;
          }
          else{
            let IsExist=this.mainList.filter((x:any)=>x.master_service_id==obj.master_service_id);
            let amt=parseFloat(IsExist.reduce((prev:any,next:any)=>prev+next.duration,0))
            this.totalServiceMin=amt+this.totalServiceMin
            if(IsExist.length==0){
              this.mainList.push(obj);
            }
          }
         
        }
        });
    
    });
   }
   
    
       
 

  }

  AddToCart(master_service_id:string,qty:number,amount:any){
    
  this.sharedService.AddLog('Viewcart','AddToCart='+master_service_id);
    this.IsLoading=true;
    this.ServiceAmount[master_service_id]=amount;
    this.isDisable[master_service_id]=true;

//     if(this.ls.getItem('customer')){
// let CustId=this.ls.getItem('customer')[0].id;
// let req={
//   p_customer_Id:CustId,
//   p_master_service_id:master_service_id,
//   p_qty:qty
// }
// this.categoryService.SaveBookingCart(req).subscribe((data:any)=>{
//   this.updateCart(master_service_id,1);
//   //this.sharedService.Message('Added to cart','success');
  

// });

//     }
//     else
    {
      //
      this.updateCart(master_service_id,1,this.ServiceAmount[master_service_id]);
     // this.ngOnInit();  

  }
  setTimeout(() => {
      
    this.IsLoading=false;
    this.isDisable[master_service_id]=false;

        }, 1000);
}
 
minus(id:any){

  this.sharedService.AddLog('Viewcart','minus='+id);
  this.IsLoading=true;
  this.isDisable[id]=true;
  if(parseInt(this.count[id])<=1){
    let cart= this.ls.getItem('cart')
    cart = cart.filter((x:any) => x.master_service_id !== id);
    this.ls.setItem("cart",cart);
    this.IsAdded[id]=false;
    let TolSerAmt=this.ServiceAmount[id];
TolSerAmt=-TolSerAmt;    
this.TotalPrice+=TolSerAmt;
this.count[id]=this.count[id]-1;
    this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
    this.sharedService.setreload('');
    if(cart.length>0)this.IsCartExist=true;
    else this.IsCartExist=false;
    this.mainList=this.mainList.filter((x:any)=>x.master_service_id!=id)
 
    this.SubCategoryServices(1);
    this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
  

    
  //   this.categoryService.DeleteBookingCustomerCart(id).subscribe((data:any)=>{
   
  // })
//       Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes'
//       }).then((result) => {
//         if (result.isConfirmed) {
        
//           this.categoryService.DeleteBookingCustomerCart(id).subscribe((data:any)=>{
//             let cart= this.ls.getItem('cart')
//           cart = cart.filter((x:any) => x.master_service_id !== id);
//           this.ls.setItem("cart",cart);
//           this.IsAdded[id]=false;
//           let TolSerAmt=this.ServiceAmount[id];
//  TolSerAmt=-TolSerAmt;    
//   this.TotalPrice+=TolSerAmt;
//           this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
//           this.sharedService.setreload('');
//          // this.sharedService.Message('Removed from cart','success');
//           })
//         }
//       })
//this.ngOnInit();
  }
else
{

this.count[id]=this.count[id]-1
let addCart:any=[];

//   if(this.ls.getItem('customer')){
//     let CustId=this.ls.getItem('customer')[0].id;
//     let req={
//       p_customer_Id:CustId,
//       p_master_service_id:id,
//       p_qty:-1
//     }
//     this.categoryService.SaveBookingCart(req).subscribe((data:any)=>{
//  this.updateCart(id,-1);
//  //this.sharedService.Message('Remove from cart','success');
  
//     });
//         }
// else
{

this.updateCart(id,-1,this.ServiceAmount[id]);

}
}
setTimeout(() => {
    
  this.IsLoading=false;
  this.isDisable[id]=false;
      }, 1000);

} 
plus(id:any){
  
  this.sharedService.AddLog('Viewcart','plus='+id);
  this.IsLoading=true;
  this.isDisable[id]=true;
  this.count[id]=this.count[id]+1
  let addCart:any=[];
  
// if(this.ls.getItem('customer')){
//   let CustId=this.ls.getItem('customer')[0].id;
//   let req={
//     p_customer_Id:CustId,
//     p_master_service_id:id,
//     p_qty:1
//   }
//   this.categoryService.SaveBookingCart(req).subscribe((data:any)=>{
    
//     this.updateCart(id,1);
//     //this.sharedService.Message('Added to cart','success');
//   });
//       }
// else
{
this.updateCart(id,1,this.ServiceAmount[id]);
//this.sharedService.Message('Added to cart','success');
  }
  
setTimeout(() => {
      
    
  this.IsLoading=false;
  this.isDisable[id]=false;
      }, 1000);
}
  AddTip(tip:any){
    
  this.sharedService.AddLog('Viewcart','AddTip='+tip);
  this.IsLoading=true;
    tip=tip==''?0:tip;
    if(tip>=0){
      this.breakDownItem.tip=parseFloat(tip);
      this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
      this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
     
    }
    this.BillDetail();
    this.SaveTip();
 
setTimeout(() => {
      
    
  this.IsLoading=false;
      }, 1000);
  }
//   scroll(el: HTMLElement) {
    
//     el.scrollIntoView({behavior: 'smooth'});
// }

  OtherAmount(other:number){
    
  this.sharedService.AddLog('Viewcart','OtherAmount='+other);
    this.IsLoading=true;
    if(other==0){
      this.tipList[0]= this.tipList[1]= this.tipList[2]= false;
      if(this.tipList[3]==false) other=0;
      this.IsOtherAmount=true;
      this.tipAmt=null
    //  this.tipAmt.nativeElement.focus();
     
      
    }
    if(other==5){
      this.tipList[1]= this.tipList[2]= this.tipList[3]= false;
     
      if(this.tipList[0]==false) {
        other=0;
     
      }
    }
    if(other==10){
      this.tipList[0]= this.tipList[2]= this.tipList[3]= false;
      if(this.tipList[1]==false) other=0;
    }
    if(other==20){
      this.tipList[0]= this.tipList[1]= this.tipList[3]= false;
      if(this.tipList[2]==false) other=0;
    }
   
if(other==0){
 
}
else{

  this.IsOtherAmount=false;
  
}
debugger
// if(this.breakDownItem.tip==other)
//     {
//       other=0;
//       this.breakDownItem.tip=0;
//     }
this.breakDownItem.tip=other;
this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
  this.BillDetail();
   this.SaveTip();
setTimeout(() => {
      
    
  this.IsLoading=false;
      }, 1000);
}
  ValidCoupon(CouponCode:any,IsLoad:any){
    
  this.sharedService.AddLog('Viewcart','ValidCoupon='+CouponCode);
    this.IsLoading=true;
    if(!IsLoad){
    this.btnCloseCoupon.nativeElement.click();
    }
    let model={
      p_coupon_code:CouponCode,
      p_customer_id:this.ls.getItem('customer')[0]["id"],
      p_amount:this.breakDownItem.total
    }
    this.categoryService.ValidCouponCode(model).subscribe((obj:any)=>{
      this.breakDownItem.offer=0
      
if(obj.length>0){
  this.IsValidCoupon=true;
  this.ValidCouponCode=CouponCode;
  this.breakDownItem.offer=obj[0].amount;
  if(!IsLoad){
  this.btncouponnyousave.nativeElement.click();
  }
 
}
else{
  this.IsValidCoupon=false;
  if(!IsLoad){
    this.InvalidCoupon=true;
  this.btncouponnoexist.nativeElement.click();
  }
}
this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
this.IsLoading=false;   
});
  }
  RemoveCoupon(){
    
  this.sharedService.AddLog('Viewcart','RemoveCoupon');
   this.IsLoading=true;
      this.breakDownItem.offer=0

  this.IsValidCoupon=false;
  this.ValidCouponCode="0";
this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
   
setTimeout(() => {
      
    
  this.IsLoading=false;
      }, 1000);
  }
  BillDetail(){
  let model={
    Total :this.breakDownItem.total,
    Discount :this.breakDownItem.discount,
  ValidCouponCode :this.ValidCouponCode,
    Offer:this.breakDownItem.offer,
    Mebership :this.breakDownItem.mebership,
    TIP :this.breakDownItem.tip,
    VAT:this.breakDownItem.vat,
    GrandTotal :this.breakDownItem.grandTotal
  }
  this.ls.setItem('BillDetail',model)
  }
  Proceed(){
    
    this.sharedService.SetTotalServiceMin(this.totalServiceMin);
    this.BillDetail();
    if(this.sharedService.IsloggedIn()) {
      if(this.ls.getItem('LocationId')=='3'){
        if(this.TotalPrice<=199){
          this.sharedService.Message('Minimum AED 199 for Home service','error');
       
        }
      else{
        if(this.ls.getItem('slot') && this.ls.getItem('DefaultAddressId')){
          this.route.navigate(['/checkout']);
        }
 else{
  this.btnselectaddresss.nativeElement.click();
 }
    //  this.route.navigate(['/address']);
      }
      }
      else{
        if(this.ls.getItem('slot')){
          this.route.navigate(['/checkout']);
        }
        else{      
  this.btndataandslot.nativeElement.click();
      //  this.route.navigate(['/date-slot']);
        }
      }
    }
else this.route.navigate(['/enter-mobile']);
  }
  updateCart(master_service_id:any,qty:any,amount:any){
    let addCart:any=[];
    let model={
      master_service_id:master_service_id,
      qty:qty,
      amount:qty==-1?-amount:amount
    }
 addCart=this.ls.getItem('cart');
 if(addCart) 
 { 
  let obj=addCart.filter((x:any)=>x.master_service_id==master_service_id);
if(obj.length>0){
  model.qty=obj[0].qty+qty;
  addCart=addCart.filter((x:any)=>x.master_service_id!=master_service_id);
}
  }
  else{
    addCart=[];
  }
  addCart.push(model)
  this.ls.setItem('cart',addCart);
  this.IsAdded[master_service_id]=true;
  this.count[master_service_id]= model.qty;
  // let TolSerAmt=(parseFloat(this.ServiceAmount[master_service_id])+(parseFloat(vatPercent)*parseFloat(this.ServiceAmount[master_service_id])))
  let TolSerAmt=this.ServiceAmount[master_service_id];
  if(qty==-1)  TolSerAmt=-TolSerAmt;    
  this.TotalPrice+=TolSerAmt;
  this.SubCategoryServices(1);
  this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);

  if(addCart.length>0)this.IsCartExist=true;
  else this.IsCartExist=false;
  this.CouponList();
  }
  Back(){
    this.router.navigate(['/service-detail']);
  }
CouponList(){
  this.categoryService.GetCouponList().subscribe((data:any)=>{
    let CouponCountList=data.filter((x:any)=>x.amount<this.breakDownItem.total);
this.CouponCountList=CouponCountList
this.CouponCount=CouponCountList.length;
  });
}
  //#region Enter Mobile
  ValidMobile(MobileNo:string){
    
  this.sharedService.AddLog('Viewcart','ValidMobile='+MobileNo);
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
    
  this.sharedService.AddLog('Viewcart','SendSMS='+MobileNo);
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
       this.mobileNos=MobileNo;
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
       this.sharedService.Message(otpDetail.msg,'success')
       // this.route.navigate(['/enter-otp']); 
      }
      else{
        this.sharedService.Message('Invalid mobile no.','error')
        this.mobileNo='';
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
  this.IsOTPProceed=false;
  
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
      
  this.sharedService.AddLog('Viewcart','ResendOTP='+MobileNo);
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
          this.mobileNo='';
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
                p_phone:this.mobileNos,
                p_email:this.NameDetail.email,
                p_image:data[0].image
              }
              this.categoryService.UpdateProfile(model).subscribe((x:any) => {
                this.IsLoggedIn=true;
            if(this.ls.getItem('LocationId')=='3'){
              this.ProcessName="Add address";
              this.LocationName="Home";
            }
            else{
              this.ProcessName="Select Date & Slot";
              this.LocationName="Salon";
              this.LocationAddress=this.ls.getItem('LocationName');
            }
            this.sharedService.Message('Logged in successfully','success');
  this.btnClose.nativeElement.click();
            this.LoggedInCart(data)
  this.ls.setItem('customer',data);
  this.SaveTip();
  if(this.ls.getItem('LocationId')=='3'){
    //this.route.navigate(['/address']);
    this.btnselectaddresss.nativeElement.click();
    this.addressId= this.addressId-1;
    }
    else{
      if(this.ls.getItem('slot')){
        this.route.navigate(['/checkout']);
      }
      else{
    // this.route.navigate(['/date-slot']);
                  
  this.btndataandslot.nativeElement.click();
      }
    }
    this.IsOTPLogin=false;
              })
            }
            else{
              this.IsLoggedIn=true;
            if(this.ls.getItem('LocationId')=='3'){
              this.ProcessName="Add address";
              this.LocationName="Home";
            }
            else{
              this.ProcessName="Select Date & Slot";
              this.LocationName="Salon";
              this.LocationAddress=this.ls.getItem('LocationName');
            }
            this.sharedService.Message('Logged in successfully','success');
  this.btnClose.nativeElement.click();
            this.LoggedInCart(data)
  this.ls.setItem('customer',data);
  this.SaveTip();
  if(this.ls.getItem('LocationId')=='3'){
    //this.route.navigate(['/address']);
    this.btnselectaddresss.nativeElement.click();
    this.addressId= this.addressId-1;
    }
    else{
      if(this.ls.getItem('slot')){
        this.route.navigate(['/checkout']);
      }
      else{
    // this.route.navigate(['/date-slot']);
                  
  this.btndataandslot.nativeElement.click();
      }
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
    
  //#endregion
  GetDetail(){
    if(this.ls.getItem('LocationId')=='3'){
      this.ProcessName="Add address";
      this.LocationName="Home";
    }
    else{
      this.ProcessName="Select Date & Slot";
      this.LocationName="Salon";
      this.LocationAddress=this.ls.getItem('LocationName');
    }
    if(this.ls.getItem('slot')){
      this.ProcessName="Proceed to pay";
      this.SlotDate=this.ls.getItem('slot').selectedSlotDate;
      this.SlotTime=this.ls.getItem('slot').selectedTime;
              }
  }
  eventHandler($event:any) {
  this. GetDetail();
  }
  ChangeLocation(Id:any){
    
  this.sharedService.AddLog('Viewcart','ChangeLocation='+Id);
    let LocationName=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.location_name)
    this.ls.setItem('LocationId',Id);
    this.ls.setItem('LocationName',LocationName);
this.ls.setItem('LocationAddress',this.mainList.filter((x:any)=>x.id==Id).map((y:any)=>y.address));
    this.btnCloseLocation.nativeElement.click();
   this.ngOnInit();
  }
  AddNewAddress(){
    this.btnaddnewaddressmap.nativeElement.click();
    this.categoryService.SetAddressId(null);
    if(this.EditaddressId==0){
      this.EditaddressId=this.EditaddressId-1;
    }
    else{
      this.EditaddressId=0;
    }
  }
  GetAddressList(val:any){
    
  this.btnselectaddresss.nativeElement.click();
  this.btnCloseSaveAddress.nativeElement.click();
  this.addressId=this.addressId-1;
  }
  
SelectedLocation(Id:any){
  this.newLocationId=Id;
  
  this.sharedService.AddLog('Viewcart','SelectedLocation='+Id);
  this.btnCloseLocation.nativeElement.click();
  this.btnCloseDateSlot.nativeElement.click();
let cart=this.ls.getItem('cart');
if(cart){
  if(cart.length>0){
let cartAmt=cart.reduce((total:any,line:any) => total + line.amount ,0);
  let model={
    p_location_id:Id,
    p_master_service_ids:''
  }

  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    model.p_master_service_ids+=element.master_service_id+',';
  }
  model.p_master_service_ids = model.p_master_service_ids.replace(/,\s*$/, "");
  this.categoryService.GetServiceAmountByLocation(model).subscribe((data:any)=>{
    this.updatedLocationPriceList=data;
let newAmt=data.reduce((total:any,line:any) =>parseFloat(total) +parseFloat(line.amount)  ,0); 
let isOpen=0;
if(newAmt==0){
  this.IsServiceAvb=true;
 isOpen=1;
}

if(cartAmt!=newAmt && newAmt!=0){
  
  this.DiffPrice=newAmt;
  isOpen=1;
}
if(isOpen==1){
  this.btnPrice.nativeElement.click();
}
else{
  this.ChangeLocation(Id);
}
  });

}
}
  else{
    this.ChangeLocation(Id);
  }
 
  
  }
  GotIt(){
    let cart=this.ls.getItem('cart');
    let upCart:any=[];
    for (let index = 0; index < this.updatedLocationPriceList.length; index++) {
      const element = this.updatedLocationPriceList[index];

      let crt=cart.filter((x:any)=>x.master_service_id=element.master_service_id)
  let model={master_service_id:crt[0].master_service_id,qty:crt[0].qty,amount:element.amount}
  upCart.push(model);
    }
    this.ls.setItem('cart',upCart);
    this.ChangeLocation(this.newLocationId);
   
    }
    clearOTP(){
    
        this.ngOtpInput.setValue('');
      
    }
      
    clearAddress(){
    
      this.ngOtpInput.setValue('');
    
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
    AddressContinue(){
      if(this.ls.getItem('slot')){
        this.route.navigate(['/checkout']);
      }
      else{
        this.btnCloseSelectaddresss.nativeElement.click();
  this.btndataandslot.nativeElement.click();
      // this.route.navigate(['/date-slot']);
      }
    }
    selectAddressCount(val:any){
      
this.addressId=val.id;
this.HomeAddress=val.address
    }
    IsDelete(val:any){
      this.btnareyousure.nativeElement.click();
      this.btnCloseSelectaddresss.nativeElement.click();
      this.addressId=val.id;
      this.HomeAddress=val.address;
    }
    IsEdit(val:any){
      this.btnCloseSelectaddresss.nativeElement.click();
      this.btnaddnewaddressmap.nativeElement.click();
      this.EditaddressId=val;
    }
    DeleteAddress(){
      
  this.sharedService.AddLog('Viewcart','DeleteAddress='+this.addressId);
             this.categoryService.DeleteCustomerAddress(this.addressId.toString()).subscribe((data:any)=>{
            
            this.sharedService.Message(data[0].Msg,'success');
            this.addressId=0;
           this.btnselectaddresss.nativeElement.click();
          })
    }
    SaveTip(){
      if(this.ls.getItem('customer')){
        let model={
          p_customer_id:this.ls.getItem('customer')[0].id,
          p_tip:this.chkFutureTip==true?this.breakDownItem.tip:'0'
        }
        this.categoryService.SaveCustomerTip(model).subscribe((data:any)=>{
  let cust=this.ls.getItem('customer');

  cust[0].tip=model.p_tip;
this.ls.setItem('customer',cust) ;
        })
      }
    }
    GetTermAndCondition(val:any){
      
  this.sharedService.AddLog('Viewcart','GetTermAndCondition='+val);
      if(val=='term'){
        this.btntermsncondition.nativeElement.click();
      }
      if(val=='privacy'){
        this.btnprivacypolicy.nativeElement.click();
      }
      if(val=='cancellation'){
        this.btncancellationpolicy.nativeElement.click();
      }
    }
    SaveNameDetail(){
      if(this.NameDetail.name!='' && this.NameDetail.email!=''){
        this.IsNameExist=true;
        let MobileNo=this.mobileNos;
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
           this.sharedService.Message(otpDetail.msg,'success')
           // this.route.navigate(['/enter-otp']); 
          }
          else{
            this.sharedService.Message('Invalid mobile no.','error')
            this.mobileNo='';
          }
              
              });
      }
    
    }
}
