import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { PaymentCancelUrl, PaymentRedirectUrl, vatPercent } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private httpclient:HttpClient,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
  mainList:any=[];
  IsAdded:any=[];
  CustomerCardList:any=[];
  addList:any;
  slotDetail:any;
  count:any={};
  isDisable:any=[]
  breakDownItem:any={}
  IsValidCoupon=false;
  IsOtherAmount=false;
  ValidCouponCode='';
  paymentType='';
  TotalService=0;
  vatPercent=vatPercent;
  requestData:any={}
  card_shot_number:any=[];
  IsCartExist=false;
  tipList:any=[false,false,false,false];
  IsHomeService=false;
  IsLoading=false;
  selectedCard:any={};
  threeD:any={};
  @ViewChild('btnthreeD') btnthreeD:any;
  @ViewChild('btntermsncondition') btntermsncondition:any;
  @ViewChild('btnprivacypolicy') btnprivacypolicy:any;
  @ViewChild('btncancellationpolicy') btncancellationpolicy:any;
  ngOnInit(): void {
    
    let model={PageName:'Checkout',Title:'Checkout',IsSearch:false}
    this.sharedService.setPageName(model);
    this.SubCategoryServices(0);
    this.LoadDetail();
    this.GetCustomerCard(0);
  }
  SubCategoryServices(IsReload:number){
    
    let cart= this.ls.getItem('cart')
    if(cart){
      if(cart.length==0){
        this.IsCartExist=false;
        this.router.navigate([service-detail']);
      }
      this.TotalService= cart.reduce((total:any,line:any) => total + line.qty ,0);
    }
    else{
      this.IsCartExist=false;
     this.router.navigate([service-detail']);
    }
    
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
      this.breakDownItem.tip=this.ls.getItem('BillDetail').TIP;
      this.ValidCouponCode=this.ls.getItem('BillDetail').ValidCouponCode;
      if(this.breakDownItem.tip==5) this.tipList[0]=true;
      if(this.breakDownItem.tip==10) this.tipList[1]=true;
      if(this.breakDownItem.tip==20) this.tipList[2]=true;
      if(this.breakDownItem.tip!=0 && this.breakDownItem.tip!=5 && this.breakDownItem.tip!=10 && this.breakDownItem.tip!=20) this.tipList[3]=true;
   
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
          //this.breakDownItem.discount+=(obj.discount_price*element.qty);
      
          this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
          this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
          if(IsReload==0)  this.mainList.push(obj);
         
        }
        });
    
    });
   }
   
    
       
 

  }
  
  
minus(id:any,amount:any){

  this.isDisable[id]=true;
  if(parseInt(this.count[id])<=1){
    this.categoryService.DeleteBookingCustomerCart(id).subscribe((data:any)=>{
      let cart= this.ls.getItem('cart')
    cart = cart.filter((x:any) => x.master_service_id !== id);
    this.ls.setItem("cart",cart);
    this.IsAdded[id]=false;
  this.mainList=this.mainList.filter((x:any) => x.master_service_id !== id);
    this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
    this.mainList=this.mainList.filter((x:any)=>x.master_service_id!=id);
    if(this.mainList.length==0){
      this.router.navigate([service-detail']);
    }
    //this.SubCategoryServices(1);
  //  this.sharedService.Message('Removed from cart','success');
    })
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes'
    // }).then((result) => {
    //   if (result.isConfirmed) {
        
    //     this.categoryService.DeleteBookingCustomerCart(id).subscribe((data:any)=>{
    //       let cart= this.ls.getItem('cart')
    //     cart = cart.filter((x:any) => x.master_service_id !== id);
    //     this.ls.setItem("cart",cart);
    //     this.IsAdded[id]=false;
    //     let TolSerAmt=this.ServiceAmount[id];
    //     TolSerAmt=-TolSerAmt;    
    //      this.TotalPrice+=TolSerAmt;
    //   this.mainList=this.mainList.filter((x:any) => x.master_service_id !== id);
    //     this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
    //     this.SubCategoryServices(0);
    //   //  this.sharedService.Message('Removed from cart','success');
    //     })
    //   }
    // })
  }
else{

this.count[id]=this.count[id]-1
let addCart:any=[];

// if(this.ls.getItem('customer')){
//   let CustId=this.ls.getItem('customer')[0].id;
//   let req={
//     p_customer_Id:CustId,
//     p_master_service_id:id,
//     p_qty:-1
//   }
//   this.categoryService.SaveBookingCart(req).subscribe((data:any)=>{
// this.updateCart(id,-1);

// //this.sharedService.Message('Remove from cart','success');
  
//   });
//       }
// else
{

this.updateCart(id,-1,amount);
this.sharedService.Message('Remove from cart','success');
}
}
setTimeout(() => {
      
    
  this.isDisable[id]=false;
      }, 250);

} 
plus(id:any,amount:any){
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
this.updateCart(id,1,amount);
//this.sharedService.Message('Added to cart','success');
  }
  setTimeout(() => {
      
    
    this.isDisable[id]=false;
        }, 250);
}
      AddTip(tip:any){
        tip=tip==''?0:tip;
        if(tip>=0){
          this.breakDownItem.tip=parseFloat(tip);;
          this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
          this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
         
        }
      }
      OtherAmount(other:number){
        if(other==0){
          this.tipList[0]= this.tipList[1]= this.tipList[2]= false;
          if(this.tipList[3]==false) other=0;
          this.IsOtherAmount=true;
          window.scrollTo(0,document.body.scrollHeight);
          
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
    this.breakDownItem.tip=other;
    this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
     
      }
      ValidCoupon(CouponCode:any){
        this.categoryService.ValidCouponCode(CouponCode).subscribe((obj:any)=>{
          this.breakDownItem.offer=0
    if(obj.length>0){
      this.IsValidCoupon=true;
      this.ValidCouponCode=CouponCode;
      this.breakDownItem.offer=obj[0].amount;
    
    }
    else{
      this.IsValidCoupon=false;
      this.sharedService.Message('Invalid Coupon Code..!!','error')
    
    }
    this.breakDownItem.vat=((this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer)*parseFloat(vatPercent)).toFixed(2);
 this.breakDownItem.grandTotal=this.breakDownItem.total+this.breakDownItem.discount+this.breakDownItem.mebership+  this.breakDownItem.tip-this.breakDownItem.offer+parseFloat(this.breakDownItem.vat);
    
        });
      }
    
      BillDetail(){
      let model={
        Total :this.breakDownItem.total,
     //   Discount :this.breakDownItem.discount,
        //ValidCouponCode :this.ValidCouponCode,
        Offer:this.breakDownItem.offer,
        Mebership :this.breakDownItem.mebership,
        TIP :this.breakDownItem.tip,
        VAT:this.breakDownItem.vat,
        GrandTotal :this.breakDownItem.grandTotal
      }
      this.ls.setItem('BillDetail',model)
      }
      LoadDetail(){
        if(this.ls.getItem('slot')){
this.slotDetail=this.ls.getItem('slot');
        }
        if(this.ls.getItem('customer')){
        let custId=this.ls.getItem('customer')[0].id;
        this.categoryService.GetCustomerAddress(custId,'0').subscribe((data:any)=>{
          
          if(this.ls.getItem('DefaultAddressId')){
let DefaultAddressId=this.ls.getItem('DefaultAddressId');
this.addList=data.filter((x:any)=>x.id==DefaultAddressId); 
          }
          else{
            this.addList=data[0]; 
          }
         
      });
    }
      }
      PaymentType(type:any){
        
        this.paymentType=type;
        if(this.paymentType!='cash' && this.paymentType!='' && this.paymentType!='card'){
          if(this.ls.getItem('customer')){
            let CustId=this.ls.getItem('customer')[0].id;
            
          this.categoryService.GetCustomerCard(this.paymentType,CustId).subscribe((data:any)=>{
        if(data.length>0){
          this.selectedCard=  { 
            "card_no":data[0].card_number,
            "card_expiry":data[0].card_expiry_year +"-"+data[0].card_expiry_month,
            "card_cvv":data[0].cvv,
            "card_holder_name":this.ls.getItem('customer')[0].name
        
    }
        }
          })
        }
        }
        else{
          this.selectedCard={};
        }
      }
      GetCustomerCard(Id:any){
        if(this.categoryService.GetPaymentType()){
          this.paymentType=this.categoryService.GetPaymentType();
          this.categoryService.SePaymentType(null);
        }
        if(this.ls.getItem('customer')){
          let CustId=this.ls.getItem('customer')[0].id;
          
        this.categoryService.GetCustomerCard(Id,CustId).subscribe((data:any)=>{
          this.CustomerCardList=data;
          let card=this.ls.getItem('card');
        
          if(card)
          {
            let model={
              card_expiry_month:card.p_card_expiry_month,
              card_expiry_year:card.p_card_expiry_year,
              card_name:card.p_card_name,
              card_number:card.p_card_number,
              createdate:null,
              customer_id:card.p_customer_id,
              cvv:card.p_cvv,
              id:card.p_id,
              updatedate:null,
            }
            this.paymentType='0';
            this.CustomerCardList.push(model);
this.ls.removeItem('card');
          }

          
          this.CustomerCardList.forEach((element:any) => {
            
          
            this.card_shot_number[element.id]=element.card_number.substr(element.card_number.length - 4)
          });
      });
    }
  }
//   PayByCard(){
    
// this.IsLoading=true;
//     if(this.paymentType=='card'){
//       let model={
    
//         amount: this.breakDownItem.grandTotal*100,
//         emailAddress:this.ls.getItem('customer')[0].email,
//         redirectUrl:PaymentRedirectUrl,
//         cancelUrl:PaymentCancelUrl
//       }
//       this.categoryService.PayByCard(model).subscribe((dataRes:any)=>{
//         debugger
// window.location.href=dataRes.href;


// this.IsLoading=false;
//       })
//     }
//     else{
      
//       this.sharedService.Message('Please select payment mode','error');
      
//     this.IsLoading=false;
//     }
//   }
  Pay(){
 
  
  let card:any={};
  let addId=0;
  card.p_card_number=''
  let isValid=1
  if(this.addList){
   if(this.addList.length>0) addId=this.addList[0].id;
  }
  if(this.paymentType==''){
    this.sharedService.Message('Please select payment type..!!','error');
    isValid=0;

  }
else if(this.paymentType!='cash' && this.paymentType!='card')
 {
  {
    card=this.CustomerCardList.filter((x:any)=>x.id==this.paymentType);
    if(card){
      card=card[0];
    }
    else{
      this.sharedService.Message('Invalid card..!!','error');
      isValid=0;
    }
  }

 }
 
 if(this.ls.getItem('customer')){
  this.requestData.p_customer_id=this.ls.getItem('customer')[0].id;

}
else{
  this.sharedService.Message('Customer not exists..!!','error');
  isValid=0;

}
 if(this.ls.getItem('LocationId')){
  this.requestData.p_location_id=this.ls.getItem('LocationId');
  if(this.requestData.p_location_id==3){
    if(this.breakDownItem.total<200){
      this.sharedService.Message('Minimum AED 199 for Home service','error');
      isValid=0;
    }
  }
  
}
else{
  this.sharedService.Message('Location not exists..!!','error');
  isValid=0;

}
if(this.ls.getItem('slot')){
  this.slotDetail=this.ls.getItem('slot');
          }
          else{
            this.sharedService.Message('Slot not exists..!!','error');
            isValid=0;
        
          }
          this.requestData.p_details=this.ls.getItem('cart').map((data:any) => ({
            master_service_id: data.master_service_id,
            amount:this.mainList.filter((x:any)=>x.master_service_id==data.master_service_id)[0],
            qty: data.qty,

          }))
          let cart= this.ls.getItem('cart');
          this.requestData.p_details='';
          this.requestData.p_master_service_ids='';
          cart.forEach((element :any)=> {
            let str='';
            let amt='0';
            let isExists=this.mainList.filter((x:any)=>x.master_service_id==element.master_service_id)
            if(isExists.length>0)
            {
              
              amt=isExists[0].original_price
            }
            
            str=element.master_service_id+'|'+amt+'|'+element.qty+',';
            this.requestData.p_details+=str;
            this.requestData.p_master_service_ids+=element.master_service_id+',';
          });
          this.requestData.p_details = this.requestData.p_details.replace(/,\s*$/, "");
          this.requestData.p_master_service_ids = this.requestData.p_master_service_ids.replace(/,\s*$/, "");
         
 if(isValid==1){
  this.IsLoading=true;
  let selectedSlotDate = new Date(this.slotDetail.selectedSlotDate.split(',')[0])
  this.slotDetail.selectedSlotDate= selectedSlotDate.toISOString().slice(0, 10);
let model={
p_customer_id:this.requestData.p_customer_id,
p_payment_mode:this.paymentType,
p_card_number:card.card_number,
p_location_id:this.requestData.p_location_id,
p_total_amount:this.breakDownItem.total,
p_discount_amount:this.breakDownItem.discount,
p_offer_amount:this.breakDownItem.offer,
p_member_amount:this.breakDownItem.mebership,
p_tip_amount:this.breakDownItem.tip,
p_vat_amount:this.breakDownItem.vat,
p_grand_amount:this.breakDownItem.grandTotal,
p_coupon_code:this.ValidCouponCode==null?'':this.ValidCouponCode,
p_slot_date:this.slotDetail.selectedSlotDate,
p_slot_time:this.slotDetail.selectedTime,
p_customer_address_id:addId,
p_master_service_ids:this.requestData.p_master_service_ids,
p_details:this.requestData.p_details,
}

this.categoryService.SaveOrder(model).subscribe((data:any)=>{
  
  if(data[0].code=='1'){
 let encrtypted_id='';
 let enc={
value:data[0].id
 }
 this.sharedService.encryptData(enc).subscribe((en:any)=>{
  encrtypted_id=en.val;
  if(this.paymentType=='cash')
  {
    this.sharedService.Message(data[0].msg,'success');
    this.Clear();
    this.router.navigate([confirm/'+encrtypted_id]);
   
  this.IsLoading=false;
  }
  else if(this.paymentType=='card'){
    let model={
      merchantDefinedData:data[0],
      amount: this.breakDownItem.grandTotal*100,
      emailAddress:this.ls.getItem('customer')[0].email,
      redirectUrl:PaymentRedirectUrl,
      cancelUrl:PaymentCancelUrl
    }
    this.categoryService.PayByCard(model).subscribe((dataRes:any)=>{
      let req={
        p_order_id:data[0].id,
        p_state:dataRes.state,
        p_request: model.toString(),
        p_response: dataRes.toString(),
      }
      this.categoryService.CardPayementLog(req).subscribe((res:any)=>{
window.location.href=dataRes._links.payment.href;


})

this.IsLoading=false;
    })
  }
  else  if(this.paymentType!='cash' && this.paymentType!=''){
    let model={
      amount:this.breakDownItem.grandTotal*100,
      card_no:this.selectedCard.card_no,
      card_expiry:this.selectedCard.card_expiry,
      card_cvv:this.selectedCard.card_cvv,
      card_holder_name:this.selectedCard.card_holder_name
    }
    this.categoryService.CardOrder(model).subscribe((dataRes:any)=>{
      debugger
     this.threeD=dataRes.data;
this.btnthreeD.nativeElement.click();
//         if(dataRes.state=='AWAIT_3DS'){

// // append your data
// formData.append('PaReq', dataRes['3ds'].acsPaReq);
// formData.append('TermUrl', this.router.url);
// formData.append('MD', dataRes['3ds'].acsMd);
// let options = {
//   headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
// };
// this.categoryService.Outside(dataRes['3ds'].acsUrl, formData,options).subscribe((r:any)=>{
// this.threeD=r;
// this.btnthreeD.nativeElement.click();
// });
//         }
      
//window.location.href=data.href;
isValid=1;

this.IsLoading=false;
    });
  } 
  else{
    
    this.sharedService.Message('Please select payment mode','error');
    
  this.IsLoading=false;
  }
});
  }
  else{
    this.sharedService.Message(data[0].msg,'error');
    this.IsLoading=false;
  }
 
});
}
 

  }
  Clear(){
    this.ls.removeItem('slot');
    this.ls.removeItem('card');
    this.ls.removeItem('cart');
    this.ls.removeItem('BillDetail');
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
  
  this.count[master_service_id]= model.qty;
  // let TolSerAmt=(parseFloat(this.ServiceAmount[master_service_id])+(parseFloat(vatPercent)*parseFloat(this.ServiceAmount[master_service_id])))
  // if(qty==-1)  TolSerAmt=-TolSerAmt;    
  // this.TotalPrice+=TolSerAmt;
  this.SubCategoryServices(1);
  this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
  }
  Back(){
    this.router.navigate([view-cart']);
  }
  AcceptTerm(e:any){
this.sharedService.setAccept(e);
  }
  getCardReload(e:any){
this.ngOnInit();
  }
  GetTermAndCondition(val:any){
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
}
