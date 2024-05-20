import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.css']
})
export class CardOrderComponent implements OnInit {

  IsLoading=false;
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private sharedService:SharedService) { }
  

  ngOnInit(): void {

    let id=this.activatedRoute.snapshot.queryParams['ref'];
    if(id){
      this.RetriveOrder(id);
    }
  }
  RetriveOrder(orderRef:any){
this.IsLoading=true;
          let model={
            ref:orderRef
          }
              this.categoryService.RetrieveCardTransaction(model).subscribe((data:any)=>{
               let req:any;
                if(data._embedded){
                   req={
                    p_order_id:data.merchantDefinedData.id,
                    p_status:2,
                    p_created_by:1
                  }
                 if(data._embedded.payment[0].state=='PURCHASED'){

                  req.p_status=6;
                 }
                 else{

                  req.p_status=5;
                 }
                }
                this.categoryService.UpdateOrderStatus(req).subscribe((u:any)=>{
                  let encryptedOrderId=''
                  let dec={
                    value:req.p_order_id
                  }
                  this.sharedService.encryptData(dec).subscribe((en:any)=>{
                    encryptedOrderId = en.val;
if(req.p_status==6){
    this.Clear();
    this.router.navigate([confirm/'+req.encryptedOrderId]);
}
else{
    this.router.navigate([failed/'+req.encryptedOrderId]);
}
this.IsLoading=false;
                });
            });
          });
  }

  Clear(){
    this.ls.removeItem('slot');
    this.ls.removeItem('card');
    this.ls.removeItem('cart');
    this.ls.removeItem('BillDetail');
  }

}

