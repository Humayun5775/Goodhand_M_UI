import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-mirror-wallet',
  templateUrl: './mirror-wallet.component.html',
  styleUrls: ['./mirror-wallet.component.css']
})
export class MirrorWalletComponent implements OnInit {

  totalAmt:any;
  constructor(private title: Title,private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
  mainList:any
  loading=true;
  ngOnInit(): void {
    this.title.setTitle(" Mirrors Beauty Lounge | Mirror Wallet"); // <-- Update the title 
this.GetWallet();
  }

  GetWallet(){
    
    if(this.ls.getItem('customer')){
     let custId=this.ls.getItem('customer')[0].id;
     let model={
       p_customer_id:custId
     }
     this.categoryService.GetWallet(model).subscribe((data:any)=>{
       this.mainList=data;
     this.totalAmt=this.mainList.reduce((sum:any, current:any) => sum + current.amount, 0);
     this.loading=false;
     })
    }
     }
}
