import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { ImagekitUrlEndpoint, vatPercent } from 'src/environments/environment';
import Swal from 'sweetalert2'
import SwiperCore, { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  mainList:any=[];
  optionList:any=[];
  IsMobile=false; 
  editList:any=[];
  locationList:any;
  SubCategoryServicesList:any;
  IsLoading=true;
  IsMinMenu=false;
  IsOptionFooterShow=false;
  IsEditFooterShow=false;
  locationName='';
  IsAdded:any=[];
  categoryId:any;
  serviceId='0'
  TotalService=0;
  ServiceAmount:any=[];
  TotalPrice=0;
  Service:any;
  count:any={};
  isDisable:any=[];
  IsCartExist=false;
  optionCount=0;
  editCount=0;
  parentCount:any={};
  totalOption=0;
  totalEdit=0;
  totalAddedEdit=0;
  totalAmtOption=0;
  totalAmtEdit=0;
  totalEditPackage=0;
  catOrder=0;
  classAdd:any=[];
isButtonScroll=0;
IsStripAmt=0;
optionIds='';
editIds='';
h1_tag='';
IsPreLoading=true;
IsViewDetailLoading=true;
IsPackage=false;
SubCatCount=0;
meet_artist='';
look_book='';
fixed_top=false;
config: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 3,
  pagination: {
    clickable: true,
    el: ".swiper-pagination",
    type: "progressbar"
  },
};
    @HostListener("window:scroll", [])
    onWindowScroll() {
      if (window.scrollY >= 395) {
        this.fixed_top=true;
    }
    else {
      this.fixed_top=false;
    }
      if(this.isButtonScroll>75){
        this.classAdd = [];
      }
      this.isButtonScroll++;
    }
    titleName='';
    optionName='';
    optionTotal='';
    optionImg='';
    editName='';
    editTotal='';
    editImg='';
    optionLoader=true;
    editLoader=true;
    imagekitUrlEndpoint='';
    @ViewChild('btntermsncondition') btntermsncondition:any;
    @ViewChild('btnprivacypolicy') btnprivacypolicy:any;
    @ViewChild('btncancellationpolicy') btncancellationpolicy:any;
    @ViewChild('btnLocation') btnLocation:any;
    constructor(private title: Title,private meta: Meta,private scroller: ViewportScroller,private activatedRoute: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
    ngOnInit(): void {
      
      if(window.innerWidth>=1080){
        this.IsMobile=false;
       }
       else{
        this.IsMobile=true;
       }
       if(this.activatedRoute.snapshot.paramMap.get('slug')){
        
  this.sharedService.AddLog('sub-category',this.activatedRoute.snapshot.paramMap.get('slug'));
    
        this.GetCategoryBySlug(this.activatedRoute.snapshot.paramMap.get('slug'));
     
      
      }
      else{
      if(this.ls.getItem('LocationId')){
        this.categoryId = this.ls.getItem('CatId');
        this.titleName=this.ls.getItem('CatName');
        
    this.sharedService.AddLog('sub-category',this.ls.getItem('CatName'));
        let model={PageName:'Category',Title:this.ls.getItem('CatName'),IsSearch:true}
        this.sharedService.setPageName(model);
        this.SubCategory(this.categoryId,0);
      this.GetServiceCart();
      this.GetBookingSubCategoryCount();
  this. GetCategory();
      }
      else{
        this.GetLocation();
      }
      }

   this.imagekitUrlEndpoint=ImagekitUrlEndpoint
      
    

  }
  GetLocation(){
    
    this.locationService.GetLocation().subscribe((data:any)=>{
      
      this.locationList=data; 
      setTimeout(() => {
      
        this.btnLocation.nativeElement.click();
    
            }, 1000);


    });
  }
  

  GetCategoryBySlug(slug:any){
    let locationId=0;

    if(slug=='salon-for-men' || slug=='spa-for-men'){
      this.ls.setItem('LocationId','9')
      locationId=9
    }
    if(this.ls.getItem('LocationId')){
      locationId=this.ls.getItem('LocationId');
    }
   if(locationId==0){
    this.GetLocation();
   }
   else{
    let model={
      p_slug:slug,
      p_location_id:locationId
    }
        this.categoryService.GetCategoryBySlug(model).subscribe((data:any)=>{
          
    if(data.length>0){
      this.ls.setItem('CatId',data[0].id)
    this.ls.setItem('CatName',data[0].category_name)
    
    this.categoryId = this.ls.getItem('CatId');
    this.titleName=this.ls.getItem('CatName');
    let model={PageName:'Category',Title:this.ls.getItem('CatName'),IsSearch:true}
    this.sharedService.setPageName(model);
    this.SubCategory(this.categoryId,0);
    this.GetServiceCart();
    this.GetBookingSubCategoryCount();
    this. GetCategory();
    }
    else if(this.ls.getItem('CatId')){
    
        this.categoryId = this.ls.getItem('CatId');
    this.titleName=this.ls.getItem('CatName');
    let model={PageName:'Category',Title:this.ls.getItem('CatName'),IsSearch:true}
    this.sharedService.setPageName(model);
    this.SubCategory(this.categoryId,0);
    this.GetServiceCart();
    this.GetBookingSubCategoryCount();
    this. GetCategory();
      
    }
        });
   }

  }
  GetCategory(){
    this.categoryService.GetCategory().subscribe((data:any)=>{
      let lst=data.filter((x:any)=>x.id ==this.categoryId);
      this.title.setTitle(" Mirrors Beauty Lounge | "+lst[0].category_name); // <-- Update the title 
   
      this.meta.updateTag({ 
        name: 'title',
        content: lst[0].meta_title
    });
    this.meta.updateTag({ 
      name: 'keywords',
      content:lst[0].meta_keywords
  });
  this.meta.updateTag({ 
    name: 'description',
    content:lst[0].meta_description
});
    })
  }
    SubCategory(p_category_id:any,p_sub_category_id:any){
 
    

     let model={
      p_category_id:p_category_id,
      p_sub_category_id:p_sub_category_id,
      p_location:this.ls.getItem('LocationId')

     }
     
      this.categoryService.SubCategory(model).subscribe((data:any)=>{
let master_service_ids='';
this.GetPakage();
        this.mainList=data;
        this.h1_tag=this.mainList[0].h1_tag;
        this.mainList=this.mainList.sort((a:any,b:any)=> a['position'] - b['position']);
        
        this.categoryService.GetService('0',p_category_id,p_sub_category_id,this.ls.getItem('LocationId')).subscribe((x:any)=>{
         let SubCatId=0;
         
          this.SubCategoryServicesList=x;
            this.SubCategoryServicesList=this.SubCategoryServicesList.sort((a:any,b:any)=> a['sub_category_id'] - b['sub_category_id']);
            for (let index = 0; index < this.SubCategoryServicesList.length; index++) {
              this.isDisable[this.SubCategoryServicesList[index].master_service_id]=false;
            }
            // for (let index = 0; index < this.SubCategoryServicesList.length; index++) {
        //   master_service_ids+=this.SubCategoryServicesList[index].master_service_id+',';
        //   if(this.SubCategoryServicesList[index].sub_category_id!=SubCatId){
        //   SubCatId=this.SubCategoryServicesList[index].sub_category_id;
        //   this.SubCategoryServicesList[index]['is_first']=1;
        //   // if(this.SubCategoryServicesList[index].position==1){
        //   // this.SubCategoryServicesList[index]['is_first']=1; 
        //   // }
        //   // else{
        //   //   this.SubCategoryServicesList[index]['is_first']=0;
        //   // }
        //   }
        //   else{
        //     this.SubCategoryServicesList[index]['is_first']=0;
        //   }
         
        // }
       // master_service_ids = master_service_ids.replace(/,\s*$/, "");
        
        this.SubCategoryServicesList=this.SubCategoryServicesList.sort(
          function(a:any, b:any) {          
             if (a.sub_category_id === b.sub_category_id) {
                // Price is only important when cities are the same
                return a.position - b.position;
             }
             return a.sub_category_position > b.sub_category_position ? 1 : -1;
          });
  
if(this.categoryService.GetServiceId()){
  let serId=this.categoryService.GetServiceId();
  this.categoryService.SetServiceId(null)
  this.GetServiceSearch(serId);
}

else if(this.categoryService.GetSubCategoryValue()){
  let subCatId=this.categoryService.GetSubCategoryValue();
  this.categoryService.SetSubCategoryValue(null)
  this.jumpToService(subCatId);
}
else{
  this.jumpToService(0);
  
}
        });
        
        this.IsLoading=false;
          
  });
}

GetServiceCart(){
  
  this.TotalPrice=0;
  let cart=this.ls.getItem('cart')
  if(this.ls.getItem('LocationId'))
  {
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
    
    for (let ab = 0; ab < cart.length; ab++) {
      
      const c=cart[ab]
      for (let index = 0; index < data.length; index++) {
        
        const d = data[index];
      if(d.master_service_id==c.master_service_id){
        newcart.push(c);
        this.ServiceAmount[c.master_service_id]=d.amount;
        this.TotalPrice+=(this.ServiceAmount[c.master_service_id]*c.qty);
        break;
      } 
    
      }
}
this.ls.setItem('cart',newcart);
this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
  });
  
  this.IsCartExist=true;
  }
  else this.IsCartExist=false;
  
 

}
else{
  this.IsCartExist=false;
}
  } else{
    this.router.navigate(['/location']);
  }
}

GetServiceSearch(serviceId:any){
  this.IsMinMenu=false;
  
  //this.categoryService.GetService(serviceId,'0','0',this.ls.getItem('LocationId')).subscribe((data:any)=>{
    
  this.sharedService.AddLog('sub-category','serviceId='+serviceId);
   // this.SubCategoryServicesList=data;
   let data=this.SubCategoryServicesList;
    let cart= this.ls.getItem('cart')
    
    this.IsMinMenu=true;
    if(cart){
  
      cart.forEach((c:any) => {
        this.IsAdded[c.master_service_id]=true;
    for (let index = 0; index < data.length; index++) {
      
      if(!this.IsAdded[c.master_service_id])  this.IsAdded[c.master_service_id]=false;
      const d = data[index];
      if(d.master_service_id==c.master_service_id){
        
        this.count[d.master_service_id]=c.qty;

        break;
      }
      // else if(d.is_options!='1'){
      //   d.is_options.split(',').forEach((e:any) => {
          
      //     if(e==c.master_service_id){
            
      //   if(!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id]=0;
      //       this.parentCount[d.master_service_id]+=c.qty;
    
      //     }
         
      //   });
      // }
     
    }
      });
  
    }
    this.IsLoading=false;
    
    setTimeout(() => {
      
      this.classAdd['s-'+serviceId]=true;
      this.scroller.scrollToAnchor('s-'+serviceId);
      
    this.isButtonScroll=0;
  }, 250);

}
jumpToService(id:any){
  this.IsMinMenu=false;
  
  //this.categoryService.GetService('0','0',id,this.ls.getItem('LocationId')).subscribe((data:any)=>{
   // this.SubCategoryServicesList=data; 
  this.parentCount={};
    let data=this.SubCategoryServicesList;
  
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
      if(d.is_count>1){
         for (let p = 0; p < d.is_options.split(',').length; p++) {
          const e = d.is_options.split(',')[p];
          
         
          if(e==c.master_service_id){
           
        if(!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id]=0;
        this.parentCount[d.master_service_id]+=c.qty;
    
          }
         
        }
        if(this.parentCount[d.master_service_id]>0){
          this.IsAdded[d.master_service_id]=true;
        }
      }
      if(d.master_service_id==c.master_service_id){
        
        this.count[d.master_service_id]=c.qty;
break;
      }
      
    }
      });
  
    }
    
    this.IsLoading=false;
    if(id!=0){
      
      
      
      this.classAdd[id]=true;
    setTimeout(() => {
      
  this.scroller.scrollToAnchor(id);
  
  this.isButtonScroll=0;
  //this.classAdd[id]=false;
  //if(this.SubCategoryServicesList.length>0)   window.scrollTo(window.scrollX, window.scrollY - 115);
 
  }, 250);
}
// });

}

SelectedLocation(Id:any){
  let LocationName=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.location_name)
  this.ls.setItem('LocationId',Id);
  this.ls.setItem('LocationName',LocationName);
  this.ngOnInit();
  }
  GoTop(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return false;
  }

  AddToCart(master_service_id:string,qty:number,amount:any,discount:any){
   // this.IsStripAmt=parseFloat(discount)-parseFloat(amount);
   this.IsStripAmt=0;
    this.isDisable[master_service_id]=true;
this.ServiceAmount[master_service_id]=amount;
   
this.sharedService.AddLog('sub-category','AddToCart=master_service_id'+master_service_id+',qty=1,amount='+amount+',discount='+discount);
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
      
      if(this.ls.getItem('LocationId')!=3){
        if(this.categoryId==1){
          this.IsStripAmt=(parseFloat(discount)-parseFloat(this.ServiceAmount[master_service_id]));
          }
          else{
          this.IsStripAmt=0;
          }
      }
      else{
        if(this.categoryId==48){
          this.IsStripAmt=(parseFloat(discount)-parseFloat(this.ServiceAmount[master_service_id]));
          }
          else{
          this.IsStripAmt=0;
          }
      }
      this.updateCart(master_service_id,1,this.ServiceAmount[master_service_id]);
 // this.sharedService.Message('Added to cart','success');
  }
  setTimeout(() => {
      
    
  this.isDisable[master_service_id]=false;
    }, 250);
}

  ServiceDetail(service:any,Id:string){

this.serviceId=Id;
this.Service=service;
this.sharedService.setreload(this.Service);



  }
  
  minus(id:any,discount:any){
    
    //this.IsStripAmt=0;
    if(this.ls.getItem('LocationId')!=3){
      if(this.categoryId==1){
        this.IsStripAmt=this.IsStripAmt-(parseFloat(discount)-parseFloat(this.ServiceAmount[id]));
        }
        else{
        this.IsStripAmt=0;
        }
    }
    else{
      if(this.categoryId==48){
        this.IsStripAmt=this.IsStripAmt-(parseFloat(discount)-parseFloat(this.ServiceAmount[id]));
        }
        else{
        this.IsStripAmt=0;
        }
    }
    this.isDisable[id]=true;
    if(parseInt(this.count[id])<=1){
      let cart= this.ls.getItem('cart')
      cart = cart.filter((x:any) => x.master_service_id !== id);
      this.ls.setItem("cart",cart);
      this.IsAdded[id]=false;
      let TolSerAmt=this.ServiceAmount[id];
TolSerAmt=-TolSerAmt;    
this.TotalPrice+=TolSerAmt;
this.sharedService.AddLog('sub-category','minus='+id);

this.count[id]=this.count[id]-1;
      this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
      this.sharedService.setreload(null);
     
      if(cart.length>0)this.IsCartExist=true;
      else this.IsCartExist=false;
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
    }
else{
  
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
// this.sharedService.Message('Remove from cart','success');
}
  }
  setTimeout(() => {
      
    
    this.isDisable[id]=false;
        }, 250);

  } 
  plus(id:any,discount:any){
   
    this.sharedService.AddLog('sub-category','plus='+id);
    this.isDisable[id]=true;
    this.count[id]=this.count[id]+1
   
      if(this.ls.getItem('LocationId')!=3){
        if(this.categoryId==1){
          this.IsStripAmt=(parseFloat(discount)-parseFloat(this.ServiceAmount[id]))*this.count[id];
          }
          else{
          this.IsStripAmt=0;
          }
      }
      else{
        if(this.categoryId==1){
          this.IsStripAmt=(parseFloat(discount)-parseFloat(this.ServiceAmount[id]))*this.count[id];
          }
          else{
          this.IsStripAmt=0;
          }
      }
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
//      // this.sharedService.Message('Added to cart','success');
//     });
//         }
// else
{
  this.updateCart(id,1,this.ServiceAmount[id]);
 // this.sharedService.Message('Added to cart','success');
    }
    
    setTimeout(() => {
      
    
      this.isDisable[id]=false;
          }, 250);
  }
  SubCategoryServices(id:any){
    let cart= this.ls.getItem('cart')

    this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
    if(cart){
  
      cart.forEach((element:any) => {
   
      //this.categoryService.GetService(element.master_service_id,'0','0',this.ls.getItem('LocationId')).subscribe((obj:any)=>{
     let obj;
      obj=this.SubCategoryServicesList ; 
      this.isDisable[obj.master_service_id]=false;
        if(obj.length>0){
          obj=obj[0];
          this.count[obj.master_service_id]=element.qty;
          this.IsAdded[obj.master_service_id]=true;
        }
        });
    
    //});
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
  model.amount=obj[0].amount+amount;
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
  this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
  this.sharedService.setreload(null);
  if(addCart.length>0)this.IsCartExist=true;
  else this.IsCartExist=false;
  
  }
  UpdateService(e:any){
    
    if(!this.count[e.master_service_id])this.count[e.master_service_id]=0;
    this.count[e.master_service_id]+= e.qty;
    let TolSerAmt=this.ServiceAmount[e.master_service_id];
    if(!TolSerAmt) TolSerAmt=e.amount;
    if(e.qty==-1)  TolSerAmt=-TolSerAmt;    
    this.TotalPrice+=TolSerAmt;
    this.TotalService= this.ls.getItem('cart').reduce((total:any,line:any) => total + line.qty ,0);
    if(this.count[e.master_service_id]==0) this.IsAdded[e.master_service_id]=false;
    else this.IsAdded[e.master_service_id]=true;
//this.updateCart(e.master_service_id,e.qty);
  }
  
onImgError(event:any) { 
  event.target.src = './assets/img/image-not-available.jpg';
}
ViewCart(){
  
  if(this.ls.getItem('LocationId')==3){
    if(this.TotalPrice<=199){
      this.sharedService.Message('Minimum AED 199 for Home service','error');
   
    }
  else{
    this.router.navigate(['/view-cart']);
  }

}else{
  this.router.navigate(['/view-cart']);
}
}
GetOption(ids:any,name:any,total:any,image:any){
  this.IsOptionFooterShow=false;
  this.totalOption=0;
  this.totalAmtOption=0;
  this.optionName=name;
  this.optionTotal=total;
  this.optionImg=image;
  this.optionLoader=true;
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

this.optionLoader=false;
this.optionIds='';
if(this.optionList[0].option_position){
  this.optionList=this.optionList.sort((a:any,b:any)=> a['option_position'] - b['option_position']);
}
else{
this.optionList=this.optionList.sort((a:any,b:any)=> a['amount'] - b['amount']);
}
this.optionCount=this.optionList.length;
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
});
}
minusOption(id:any,amount:any,discount:any){
  
  this.sharedService.AddLog('sub-category','minusOption='+id);
this.IsOptionFooterShow=true;
this.totalOption=this.totalOption-1;
this.totalAmtOption=this.totalAmtOption-amount;
this.minus(id,discount);
}
plusOption(id:any,amount:any,discount:any){
  
  this.sharedService.AddLog('sub-category','plusOption='+id);
  this.IsOptionFooterShow=true;
  this.optionIds+=id+',';
this.totalOption=this.totalOption+1;
this.totalAmtOption=this.totalAmtOption+amount;
this.plus(id,discount);
}
AddToCartOption(master_service_id:string,qty:number,amount:any,discount:any,name:any){
  
  this.sharedService.AddLog('sub-category','AddToCartOption='+master_service_id);
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
  this.minusOption(exists[0].master_service_id,amt,discount);
  
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
  
  this.IsMinMenu=false;
  this.categoryService.GetService('0','0',id,this.ls.getItem('LocationId')).subscribe((data:any)=>{
    this.parentCount={};
    //let data=this.SubCategoryServicesList
 //  this.SubCategoryServicesList=data;
  
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
      if(d.is_count>1){
         for (let p = 0; p < d.is_options.split(',').length; p++) {
          const e = d.is_options.split(',')[p];
          
         
          if(e==c.master_service_id){
           
        if(!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id]=0;
        this.parentCount[d.master_service_id]+=c.qty;
    
          }
         
        }
        if(this.parentCount[d.master_service_id]>0){
          this.IsAdded[d.master_service_id]=true;
        }
      }
      if(d.master_service_id==c.master_service_id){
        
        this.count[d.master_service_id]=c.qty;
break;
      }
      
    }
      });
  
    }
    
    this.IsLoading=false;
    
  
});

}
ViewDetailUpdateOption( e:any){
  
  //this.UpdateOption(e.id);
  this.ngOnInit();
  
}
search(){
  this.router.navigate(['/search-service']);
}
Back(){
  if(this.IsMobile){
  this.router.navigate(['/category']);
  }
  else{
    this.router.navigate(['/']);
  }
}

//#region Edit

GetEdit(ids:any,name:any,total:any,image:any,package_count:any){
  this.IsPreLoading=true;
  this.IsEditFooterShow=false;
  this.totalAddedEdit=0;
  this.totalEdit=0;
  this.totalAmtEdit=0;
  this.editName=name;
  this.editTotal=total;
  this.editImg=image;
  this.totalEditPackage=package_count;
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
this.editList=data;
this.editIds='';
// if(this.editList[0].option_position){
//   this.optionList=this.optionList.sort((a:any,b:any)=> a['option_position'] - b['option_position']);
// }
// else{
// this.optionList=this.optionList.sort((a:any,b:any)=> a['amount'] - b['amount']);
// }

this.editList=this.editList.sort((a:any,b:any)=> a['amount'] - b['amount']);
this.editCount=this.editList.length;
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
        this.editIds+=d.master_service_id+',';
        this.count[d.master_service_id]=c.qty;
        this.totalAddedEdit=this.totalAddedEdit+1
        this.totalEdit+=c.qty;
        this.totalAmtEdit+=d.amount;
        this.IsEditFooterShow=true;
break;
      }
      
    }
      });
  
    }
    this.IsPreLoading=false;
});
}
minusEdit(id:any,amount:any,discount:any){
this.IsEditFooterShow=true; 
this.totalEdit=this.totalEdit-1;
if(this.totalAddedEdit)
this.totalAddedEdit=this.totalAddedEdit-1; 
this.totalAmtEdit=this.totalAmtEdit-amount;
this.minus(id,discount);
}
plusEdit(id:any,amount:any,discount:any){
//   this.totalAddedEdit=this.totalAddedEdit+1;
//   if(this.totalAddedEdit>this.totalEditPackage){
// this.sharedService.Message('You can add maximum '+this.totalEditPackage.toString()+' services from this package, not more than '+this.totalEditPackage.toString(),'error');
// this.totalAddedEdit=this.totalAddedEdit-1;  
// }
// else{
//   this.IsEditFooterShow=true;
//   this.editIds+=id+',';
// this.totalEdit=this.totalEdit+1;
// this.totalAmtEdit=this.totalAmtEdit+amount;
// this.plus(id,discount);
// }
}
AddToCartEdit(master_service_id:string,qty:number,amount:any,discount:any){
  this.totalAddedEdit=this.totalAddedEdit+1;
  if(this.totalAddedEdit>this.totalEditPackage){
    this.sharedService.Message('You can add maximum '+this.totalEditPackage.toString()+' services from this package, not more than '+this.totalEditPackage.toString(),'error');
    this.totalAddedEdit=this.totalAddedEdit-1;  
}
  else{
  this.IsEditFooterShow=true;
  this.editIds+=master_service_id+',';
  this.isDisable[master_service_id]=true;
  this.totalEdit=this.totalEdit+1;
  this.totalAmtEdit=this.totalAmtEdit+amount;
  this.AddToCart(master_service_id,qty,amount,discount);
  setTimeout(() => {
      
    
    this.isDisable[master_service_id]=false;
        }, 250);
      }
}

UpdateEdit(id:any){
  this.IsMinMenu=false;
  this.categoryService.GetService('0','0',id,this.ls.getItem('LocationId')).subscribe((data:any)=>{
    this.parentCount={};
    //let data=this.SubCategoryServicesList
 //  this.SubCategoryServicesList=data;
  
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
      if(d.is_count>1){
         for (let p = 0; p < d.is_options.split(',').length; p++) {
          const e = d.is_options.split(',')[p];
          
         
          if(e==c.master_service_id){
           
        if(!this.parentCount[d.master_service_id]) this.parentCount[d.master_service_id]=0;
        this.parentCount[d.master_service_id]+=c.qty;
    
          }
         
        }
        if(this.parentCount[d.master_service_id]>0){
          this.IsAdded[d.master_service_id]=true;
        }
      }
      if(d.master_service_id==c.master_service_id){
        
        this.count[d.master_service_id]=c.qty;
break;
      }
      
    }
      });
  
    }
    
    this.IsLoading=false;
    
  
});

}

GetBookingSubCategoryCount(){
  let model={
    p_category_id:this.categoryId,
    p_location_id:this.ls.getItem('LocationId')
  }

this.categoryService.GetBookingSubCategoryCount(model).subscribe((data:any)=>{
 this.catOrder=data[0].count;
});
}
//#endregion
GetTermAndCondition(val:any){
  
  this.sharedService.AddLog('sub-category','GetTermAndCondition='+val);
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
getMeetArtist(val:any){
  this.meet_artist=val;
  
  this.sharedService.AddLog('sub-category','getMeetArtist='+val);
}
getLookBook(val:any){
  
  this.sharedService.AddLog('sub-category','getLookBook='+val);
  this.look_book=val;
}
GetPakage(){
  if(this.ls.getItem('LocationId')){
    if(this.ls.getItem('LocationId')==3){
      if(this.ls.getItem('CatId')==48)this.IsPackage=true;
      else this.IsPackage=false;
  }
  else{
    if(this.ls.getItem('CatId')==1)this.IsPackage=true;
    else this.IsPackage=false;
  }
}
}
  }
