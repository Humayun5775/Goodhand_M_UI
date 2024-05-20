import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { vatPercent } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  CustomerCardList:any=[];
  card_shot_number:any=[];
  IsLoading=false;
  selectedId=0;
  @ViewChild('btnareyousure') btnareyousure:any;
  constructor(private route: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
 

  ngOnInit(): void {
    this.GetCustomerCard(0);
  }

  GetCustomerCard(Id:any){
  
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
        this.CustomerCardList.push(model);

      }

      
      this.CustomerCardList.forEach((element:any) => {
        
      
        this.card_shot_number[element.id]=element.card_number.substr(element.card_number.length - 4)
      });
  });
}
}

DeleteCard(){
    if(this.selectedId!=0){
      let model={
        p_id: this.selectedId
      }
    
    this.IsLoading=true;
    this.categoryService.DeleteCustomerCard(model).subscribe((data:any)=>{
      this.IsLoading=false;
      if(data[0].msg){
     
       if(data[0].code==1){
        this.sharedService.Message(data[0].msg,'success');
        
  this.CustomerCardList=this.CustomerCardList.filter((x:any)=>x.id!=this.selectedId);
  this.selectedId=0;
       }
       else{
        
        this.sharedService.Message(data[0].Msg,'error');
       }
      }
   });
    }
}
SelectId(Id:any){
  this.selectedId=Id;
  this.btnareyousure.nativeElement.click();
}
}