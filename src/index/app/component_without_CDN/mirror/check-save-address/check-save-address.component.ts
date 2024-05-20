import { IfStmt } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-check-save-address',
  templateUrl: './check-save-address.component.html',
  styleUrls: ['./check-save-address.component.css']
})
export class CheckSaveAddressComponent implements OnInit {

  IsLoading=false;
  addressId=0;
  EditaddressId=0;
  HomeAddress="";
  IsLoggedIn=true
  @ViewChild('btnselectaddresss') btnselectaddresss:any;
  @ViewChild('btnareyousure') btnareyousure:any;
  @ViewChild('btnaddnewaddressmap') btnaddnewaddressmap:any;
  @ViewChild('btnCloseSaveAddress') btnCloseSaveAddress:any;
  @ViewChild('btnCloseSelectaddresss') btnCloseSelectaddresss:any;
  constructor(private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }


  ngOnInit(): void {
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
           this.categoryService.DeleteCustomerAddress(this.addressId.toString()).subscribe((data:any)=>{
          
          this.sharedService.Message(data[0].Msg,'success');
          this.addressId=0;
         this.btnselectaddresss.nativeElement.click();
        })
  }
  AddNewAddress(){
    this.btnaddnewaddressmap.nativeElement.click();
  }
  GetAddressList(val:any){
    
  this.btnselectaddresss.nativeElement.click();
  this.btnCloseSaveAddress.nativeElement.click();
  this.addressId=this.addressId-1;
  }
  OpenModel(){
    if(this.ls.getItem('customer')){
      
  this.btnselectaddresss.nativeElement.click();
    }
    else{
      this.IsLoggedIn=false;
    }
  }
}
