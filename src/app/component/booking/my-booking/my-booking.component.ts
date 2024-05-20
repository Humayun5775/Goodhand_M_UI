import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { PaymentCancelUrl, PaymentRedirectUrl } from 'src/environments/environment';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {

  constructor(private title: Title,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }

  // OngoingList:any=[];
  // HistoryList:any=[];
  orderList:any;
  loading=true;
  IsLoggedIn=false;
  IsLoading=false;
  ngOnInit(): void {
    this.title.setTitle(" Mirrors Beauty Lounge | My Booking"); // <-- Update the title 
    let model={PageName:'My Booking',Title:'My Booking',IsSearch:false}
    this.sharedService.setPageName(model);
    this.GetOrderService();

  }
  GetOrderService(){
 if(this.ls.getItem('customer')){
  let custId=this.ls.getItem('customer')[0].id;
  let model={
    p_customer_id:custId
  }
  this.IsLoggedIn=true;
  this.categoryService.GetOrderService(model).subscribe((data:any)=>{
    this.orderList=data.sort((a:any,b:any) =>  a.order_id < b.order_id ? 1 : a.order_id > b.order_id ? -1 : 0);
    this.loading=false;
  //  if(data.length>0){
    
  //   this.OngoingList=data.filter((x:any)=>x.status=='Created');
  //   this.OngoingList=this.OngoingList.sort((a:any,b:any) =>  a.order_id < b.order_id ? 1 : a.order_id > b.order_id ? -1 : 0)	// descending
  //     this.HistoryList=data.filter((x:any)=>x.status=='Completed' ||  x.status=='Cancelled');
  //     this.HistoryList=this.HistoryList.sort((a:any,b:any) =>  a.order_id < b.order_id ? 1 : a.order_id > b.order_id ? -1 : 0)	// descending
  //  }

  })
 }
 else{
  this.loading=false;
 }
}
GetOrderDetail(type:any,id:any){
let encryptedOrderId=''
  let dec={
    value:id
  }
  this.sharedService.encryptData(dec).subscribe((en:any)=>{
    encryptedOrderId = en.val;
if(type=='3'){
  this.router.navigate(['/cancelled/'+encryptedOrderId]);
}
else if(type=='5'){
  this.router.navigate(['/failed/'+encryptedOrderId]);
} 
else{
  this.router.navigate(['/confirm/'+encryptedOrderId]);
}
  });
}
Retry(id:any,amount:any){
  this.IsLoading=true;
  let model={
    merchantDefinedData:{ id:id},
    amount: parseFloat(amount)*100,
    emailAddress:this.ls.getItem('customer')[0].email,
    merchantAttributes :{ redirectUrl:PaymentRedirectUrl,
    cancelUrl:PaymentCancelUrl
    }
  }
  this.categoryService.PayByCard(model).subscribe((dataRes:any)=>{
    let req={
      p_order_id:id,
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
}
