import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';


@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  customer:any=[];
customerId=0;
IsLoggedIn=true;
@ViewChild('btnprofile') btnprofile:any;
constructor(private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }


  ngOnInit(): void {
    if(this.ls.getItem('customer')){
      this.customer=this.ls.getItem('customer')
      this.customerId=this.customer[0].id;
    }
  }

  OpenPopUp(){
    if(this.ls.getItem('customer')){
      this.customerId=this.customer[0].id;
      this.btnprofile.nativeElement.click();
    }
    else{
      this.IsLoggedIn=false;
    }
    
  }
}
