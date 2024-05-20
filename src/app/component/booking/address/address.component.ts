import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

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
        
        debugger
        this.mainList=data;
         this.count=this.mainList.length; 
    });
    }
    Edit(Id:any){
      this.categoryService.SetAddressId(Id);
    this.route.navigate(['/new-address']);
    
    }
    Delete(Id:any){
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.categoryService.DeleteCustomerAddress(Id).subscribe((data:any)=>{
            
            this.sharedService.Message(data[0].Msg,'success');
            if(this.ls.getItem('customer')){
              this.customerId=this.ls.getItem('customer')[0].id;
              this.GetCustomerAddress(this.customerId);
            }
          })
        }
      })
    }
    SetDefaultAdd(id:any){
      
      this.ls.setItem('DefaultAddressId',id);

    }
    Continue(){
      if(this.ls.getItem('slot')){
        this.route.navigate(['/checkout']);
      }
      else{
      this.route.navigate(['/date-slot']);
      }
    }
}
