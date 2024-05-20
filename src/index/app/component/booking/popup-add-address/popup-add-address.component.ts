import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-add-address',
  templateUrl: './popup-add-address.component.html',
  styleUrls: ['./popup-add-address.component.css']
})
export class PopupAddAddressComponent implements OnInit {

 
  @Output() DefaultAddress = new EventEmitter<any>();
  @Output() IsDelete = new EventEmitter<any>();
  @Output() IsEdit = new EventEmitter<any>();
  @Input() someInput: any;
  @ViewChild('btnareyousure') btnareyousure:any;
  mainList:any;
  count=0;
  isFirst=0;
  customerId='0';
  id=0;
    constructor(private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) {
    
     
     }
    ngOnInit(): void {
   
    let model={PageName:'Save Address',Title:'Save Address',IsSearch:false}
    this.sharedService.setPageName(model);
      if(this.ls.getItem('customer')){
        this.customerId=this.ls.getItem('customer')[0].id;
        this.GetCustomerAddress(this.customerId);
      }
    }
    GetCustomerAddress(id:string){
  
      this.categoryService.GetCustomerAddress(id,'0').subscribe((data:any)=>{
        
        
        this.mainList=data;
         this.count=this.mainList.length; 
    });
    }
    Edit(Id:any){
      this.categoryService.SetAddressId(Id);
     
    this.IsEdit.emit(Id);
    }
    Delete(item:any){
     this.IsDelete.emit(item);
      
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
          
      //     this.categoryService.DeleteCustomerAddress(Id).subscribe((data:any)=>{
            
      //       this.sharedService.Message(data[0].Msg,'success');
      //       if(this.ls.getItem('customer')){
      //         this.customerId=this.ls.getItem('customer')[0].id;
      //         this.GetCustomerAddress(this.customerId);
      //       }
      //     })
      //   }
      // })
    }
    SetDefaultAdd(item:any){
      
      this.ls.setItem('DefaultAddressId',item.id);

      this.DefaultAddress.emit(item);
    }
    ngOnChanges() {
      this.ngOnInit();
      console.log(this.someInput);
      } 
  }