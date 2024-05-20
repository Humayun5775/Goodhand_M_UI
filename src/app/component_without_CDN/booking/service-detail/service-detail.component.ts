import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  @Input() Service:any; 
  @Output() UpdateService = new EventEmitter<any>();
 @Output() ViewDetailUpdateOption = new EventEmitter<any>();
  constructor(private scroller: ViewportScroller,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
 

  count:any={};
  isDisable:any=[]
  IsAdded:any=[];
  optionList:any;
  ServiceAmount:any=[];
  TotalPrice=0;
  TotalService=0;
  faqList:any=[];
  whyList:any=[];
  IsLoading=true;
  IsMinMenu=false;
  IsOptionFooterShow=false;
  optionIds='';
  optionName='';
  optionTotal='';
  optionImg='';
  optionCount=0;
  parentCount:any={};
  totalOption=0;
  totalAmtOption=0;
  IsCartExist=false;
  IsSingle=false;
  recommended:any;
  CatId:any;
  @ViewChild('h1') h1: any;
  ngOnInit(): void {

    this.IsLoading=true;
    this.sharedService.getreload().subscribe((p:any)=>{
this.CatId=this.ls.getItem('CatId');
      this.IsLoading=true;
      this.LoadData();
      this.GoTop(p);
    });
    this.LoadData();
  }
 getFAQ(p_service_id:any){
  let model={
    p_service_id:p_service_id,
    p_location_id:this.ls.getItem('LocationId')
  }

  this.categoryService.GetMasterServiceFaq(model).subscribe((x:any)=>{
   
  setTimeout(() => {
      
    this.IsLoading=false;
      
    }, 2000);
    this.faqList=x; 
});

 }
 getwhyMirror(p_category_id:any){
  let model={
    p_category_id:p_category_id
  }

  this.categoryService.GetWhyMirror(model).subscribe((x:any)=>{
    this.whyList=x; 
});

 }
  LoadData(){
    
        let data=this.Service;
        let cart= this.ls.getItem('cart')
        this.IsAdded[data.master_service_id]=false;
    this.recommended=this.Service.recommended;
        if(cart){
      let isExists=cart.filter((x:any)=>x.master_service_id==data.master_service_id);
      if(isExists && isExists.length>0){
        this.IsAdded[data.master_service_id]=true;
        this.IsSingle=true;
        this.count[data.master_service_id]=isExists[0].qty;
      }
      else{
        this.IsSingle=false;
      }
          
      
        }
       
    }
 
    minus(id:any,amount:any){
      this.IsSingle=true;
      if(parseInt(this.count[id])<=1){
        let cart= this.ls.getItem('cart')
            cart = cart.filter((x:any) => x.master_service_id !== id);
            this.ls.setItem("cart",cart);
            this.IsAdded[id]=false;
            let TolSerAmt=this.ServiceAmount[id];
   TolSerAmt=-TolSerAmt;    
    this.TotalPrice+=TolSerAmt;
    this.count[id]=this.count[id]-1;
    let model={master_service_id:id,qty:-1}
    this.UpdateService.emit(model);
            this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
           
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
  //   let model={master_service_id:id,qty:-1}
  //   this.UpdateService.emit(model);
  //           this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
  //           this.sharedService.Message('Removed from cart','success');
  //           })
  //         }
  //       })
      }
  else{
    
    this.isDisable[id]=true;
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
  //  this.sharedService.Message('Remove from cart','success');
      
  //     });
  //         }
  // else
  {
  
    this.updateCart(id,-1,amount);
  }
    }
  
  
    } 
    plus(id:any,amount:any){
      this.IsSingle=true;
      this.isDisable[id]=true;
      this.count[id]=this.count[id]+1
      let addCart:any=[];
      
  //   if(this.ls.getItem('customer')){
  //     let CustId=this.ls.getItem('customer')[0].id;
  //     let req={
  //       p_customer_Id:CustId,
  //       p_master_service_id:id,
  //       p_qty:1
  //     }
  //     this.categoryService.SaveBookingCart(req).subscribe((data:any)=>{
        
  //       this.updateCart(id,1);
  //       this.sharedService.Message('Added to cart','success');
  //     });
  //         }
  // else
  {
    this.updateCart(id,1,amount);
   // this.sharedService.Message('Added to cart','success');
      }
    }
  SubCategoryServices(id:any){
    let cart= this.ls.getItem('cart')

    if(cart){
  
      cart.forEach((element:any) => {
   
      this.categoryService.GetService(element.master_service_id,'0','0',this.ls.getItem('LocationId')).subscribe((obj:any)=>{
        this.isDisable[obj.master_service_id]=false;
        if(obj.length>0){
          obj=obj[0];
          this.count[obj.master_service_id]=element.qty;
          this.IsAdded[obj.master_service_id]=true;
        }
        });
    
    });
   }
  }
  AddToCart(master_service_id:string,qty:number,amount:any,discount:any){
    
this.IsSingle=true;
    this.isDisable[master_service_id]=true;
this.ServiceAmount[master_service_id]=amount;
//     if(this.ls.getItem('customer')){
// let CustId=this.ls.getItem('customer')[0].id;
// let req={
//   p_customer_Id:CustId,
//   p_master_service_id:master_service_id,
//   p_qty:qty
// }
// this.categoryService.SaveBookingCart(req).subscribe((data:any)=>{
//   this.updateCart(master_service_id,1);
//   this.sharedService.Message('Added to cart','success');
  

// });

//     }
//     else
    {
      this.updateCart(master_service_id,1,amount);
  //this.sharedService.Message('Added to cart','success');
  }
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
  this.isDisable[master_service_id]=false;
  this.IsAdded[master_service_id]=true;
  this.count[master_service_id]= model.qty;
  
  // let TolSerAmt=(parseFloat(this.ServiceAmount[master_service_id])+(parseFloat(vatPercent)*parseFloat(this.ServiceAmount[master_service_id])))
  let TolSerAmt=this.ServiceAmount[master_service_id];
  if(qty==-1)  TolSerAmt=-TolSerAmt;    
  this.TotalPrice+=TolSerAmt;
  this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
  let ud={master_service_id:master_service_id,qty:qty,amount:this.Service.original_price}
  this.UpdateService.emit(ud);
  }

  onImgError(event:any) { 
    event.target.src = './assets/img/image-not-available.jpg';
  }
  GoTop(model:any){
  if(model){
    
  this.getFAQ(model.master_service_id);
  this.getwhyMirror(model.category_id);
  this.GetOption(model.is_options,model.name,model.is_count,model.option_image);
  
    setTimeout(() => {
      
    if(this.h1){
    this.h1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    
  setTimeout(() => {
      
    this.IsLoading=false;
      
    }, 2000);
  
    return false;
    }
    return;
  }, 500);
  }
  }
  //#region Option 

  GetOption(ids:any,name:any,total:any,image:any){
    this.IsOptionFooterShow=false;
    this.optionList=[];
    this.totalOption=0;
    this.totalAmtOption=0;
    this.optionName=name;
    this.optionTotal=total;
    this.optionImg=image;
  //   let model={
  //     p_location_id:this.ls.getItem('LocationId'),
  //     p_master_service_ids:ids
  //   }
  // this.categoryService.GetServiceOption(model).subscribe((data:any)=>{
    let model={
      p_location_id:this.ls.getItem('LocationId'),
      p_master_service_ids:ids
    }
  this.categoryService.GetServiceAmountByLocation(model).subscribe((data:any)=>{
  this.optionList=data;
  this.optionIds='';
 
  if(this.optionList[0].option_position){
    this.optionList=this.optionList.sort((a:any,b:any)=> a['option_position'] - b['option_position']);
  }
  else{
  this.optionList=this.optionList.sort((a:any,b:any)=> a['amount'] - b['amount']);
  }
  this.optionCount=this.optionList.length;
  if(this.optionCount>0){
    this.recommended=this.optionList[0].recommended;
  }
  let cart= this.ls.getItem('cart')
      this.IsMinMenu=true;
      if(cart){
        
        if(cart.length>0)this.IsCartExist=true;
        else this.IsCartExist=false;
        cart.forEach((c:any) => {
          this.IsAdded[c.master_service_id]=true;
      for (let index = 0; index < data.length; index++) {
       
        if(!this.IsAdded[c.master_service_id])  this.IsAdded[c.master_service_id]=false;
        const d = data[index];
        
        if(d.master_service_id==c.master_service_id){
          this.optionIds+=d.master_service_id+',';
          this.count[d.master_service_id]=c.qty;
          this.totalOption+=c.qty;
          this.totalAmtOption+=d.amount;
          this.IsOptionFooterShow=true;
  break;
        }
        
      }
        });
    
      }

  setTimeout(() => {
      
  this.IsLoading=false;
    
  }, 2000);
  });
  }
  minusOption(id:any,amount:any){
  this.IsOptionFooterShow=true;
  this.totalOption=this.totalOption-1;
  this.totalAmtOption=this.totalAmtOption-amount;
  this.minus(id,amount);
  }
  plusOption(id:any,amount:any,discount:any){
    this.IsOptionFooterShow=true;
    this.optionIds+=id+',';
  this.totalOption=this.totalOption+1;
  this.totalAmtOption=this.totalAmtOption+amount;
  this.plus(id,discount);
  }
  AddToCartOption(master_service_id:string,qty:number,amount:any,discount:any,name:any){
    this.IsOptionFooterShow=true;
    let isMore=false;
    this.optionIds+=master_service_id+',';
    this.isDisable[master_service_id]=true;
  let opList=this.optionIds.split(',').filter(x=>x!='').filter(x=>x!=master_service_id);
  let cart=this.ls.getItem('cart');
  let opt=[...new Set(opList)];
  
    for (let x = 0; x < opt.length; x++) {
      const o = opt[x];
    
    
  let exists=cart.filter((x:any)=>x.master_service_id==o);
  if(exists.length>0){
    for (let index = 0; index < exists[0].qty; index++) {
     let amt=(parseFloat(exists[0].amount)/parseFloat(exists[0].qty)).toFixed(2);
    this.minusOption(exists[0].master_service_id,amt);
    
    }
   
  isMore=true;
  }
  }
  
  this.totalAmtOption=0;
    this.totalOption=1;
    this.totalAmtOption=this.totalAmtOption+amount;
    this.AddToCart(master_service_id,qty,amount,discount);
    if(isMore){
    this.sharedService.Message('Your previous type of selection for '+name+' is deselected','error');
    }
    setTimeout(() => {
        
      
      this.isDisable[master_service_id]=false;
          }, 250);
  
  }
  
  UpdateOption(id:any){
    
    let e={id:id}
  this.ViewDetailUpdateOption.emit(e);
  }
  //#endregion
}
