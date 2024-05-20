import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.css']
})
export class HelpcenterComponent implements OnInit {

  constructor(private title: Title,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }

  orderList:any;
  loading=true;
  IsLoggedIn=false;
  ngOnInit(): void {
    
    this.title.setTitle(" Mirrors Beauty Lounge | Help"); // <-- Update the title 
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
    this.orderList=data.sort((a:any, b:any) => b.order_id - a.order_id).slice(0, 2);
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
  if(type=='Cancelled'){
    this.router.navigate(['/cancelled/'+encryptedOrderId]);
  }
  else{
    this.router.navigate(['/confirm/'+encryptedOrderId]);
  }
});
  }
}
