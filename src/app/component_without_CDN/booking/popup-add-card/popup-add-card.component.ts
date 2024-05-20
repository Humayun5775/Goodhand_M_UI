
import { Xliff } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-popup-add-card',
  templateUrl: './popup-add-card.component.html',
  styleUrls: ['./popup-add-card.component.css']
})
export class PopupAddCardComponent implements OnInit {
  data:any={};
  years:any=[];
  months:any=[];
  isSave='0';
  cardNumberError='';
  chkTermsCondition=false;
  Isdisable=false;
  IsLoading=false;
  card_type='';
  @Input() breakDownItem:any; 
  @ViewChild('btnTermsCondition') chkCondition:any;
  @ViewChild('btnClose') btnClose:any;
  @Output() getCardReload = new EventEmitter<String>();
    
    constructor(private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) { }
  
    ngOnInit(): void {
      let model={PageName:'Add New Card',Title:'Add New Card',IsSearch:false}
      this.sharedService.setPageName(model);
    this.sharedService.getAccept().subscribe(x=>{
      if(x){
        this.IsSave(true);
      }
      this.chkTermsCondition=x;
    });
    }
    CardType(cardNo:any){
     this.card_type=this.GetCardType(cardNo); 
    }
    IsValidForm(){

      this.Isdisable=true;
      let IsValid=1;
      this.data.p_card_type='';
      
      if(!this.data.p_card_number || this.data.p_card_number=='') 
      {
      this.data.p_card_number=''
      IsValid=0;
      }
      else{
        if(this.GetCardType(this.data.p_card_number)==""){
          this.data.p_card_number
      IsValid=0;
        }
        else  if(this.data.p_card_number.length!=16){
          this.data.p_card_number
       IsValid=0;
         }
        else{
          this.data.p_card_type=this.GetCardType(this.data.p_card_number);
        }
      }
      if(this.data.p_card_expiry_month=='') 
      {
      this.data.p_card_expiry_month='';
      IsValid=0;
      }
      if(this.data.p_card_expiry_year=='') 
      {
      this.data.p_card_expiry_year=''
      IsValid=0;
      }
      if(this.data.p_card_expiry_year!='' && this.data.p_card_expiry_month!=''){
        const expiry = new Date(this.data.p_card_expiry_year, this.data.p_card_expiry_month);
        const current = new Date();
        
        if(expiry.getTime() < current.getTime()){
          this.data.p_card_expiry_year='';
          this.data.p_card_expiry_month='';
          IsValid=0;
        }
      }
      if(!this.data.p_cvv || this.data.p_cvv=='') 
      {
      this.data.p_cvv=''
      IsValid=0;
      }
      else if(this.data.p_cvv.length!=3) 
      {
        this.data.p_cvv=''
      IsValid=0;
      }
      if(this.data.p_card_type==""){
     IsValid=0;
       }
      if(IsValid==1){
        this.Isdisable=true;
      
}
    }
  Save(){
    
  
  this.IsLoading=true;
      let IsValid=1;
      this.data.p_card_type='';
      
      if(!this.data.p_card_number || this.data.p_card_number=='') 
      {
      this.data.p_card_number=''
      IsValid=0;
      }
      else{
        if(this.GetCardType(this.data.p_card_number)==""){
         this.sharedService.Message('Invalid card no.','error');
      IsValid=0;
        }
        else  if(this.data.p_card_number.length!=16){
          this.sharedService.Message('Invalid card no.','error');
       IsValid=0;
         }
        else{
          this.data.p_card_type=this.GetCardType(this.data.p_card_number);
        }
      }
      if(!this.data.p_card_expiry_month || this.data.p_card_expiry_month=='') 
      {
      this.data.p_card_expiry_month=''
      this.sharedService.Message('Please select month','error');
      IsValid=0;
      }
      if(!this.data.p_card_expiry_year || this.data.p_card_expiry_year=='') 
      {
      this.data.p_card_expiry_year=''
      this.sharedService.Message('Please select Year','error');
      IsValid=0;
      }
      if(this.data.p_card_expiry_year!='' && this.data.p_card_expiry_month!=''){
        const expiry = new Date(this.data.p_card_expiry_year, this.data.p_card_expiry_month);
        const current = new Date();
        
        if(expiry.getTime() < current.getTime()){
          this.sharedService.Message('Invalid expiry date','error');
          IsValid=0;
        }
      }
      if(!this.data.p_cvv || this.data.p_cvv=='') 
      {
      this.data.p_cvv=''
      IsValid=0;
      }
      else if(this.data.p_cvv.length!=3) 
      {
        this.sharedService.Message('Incorrect CVV code','error');
        this.data.p_cvv=''
      IsValid=0;
      }
      if(this.data.p_card_type==""){
     IsValid=0;
       }
      if(IsValid==1){
        if(!this.data.p_id) this.data.p_id=0;
   
    
    this.data.p_customer_id=this.ls.getItem('customer')[0].id;
   
  if(this.isSave=='1' || this.chkTermsCondition){
    this.sharedService.setAccept(false);
    this.categoryService.SaveCustomerCard(this.data).subscribe((data:any)=>{
      this.IsLoading=false;
      if(data[0].Msg){
     
       if(data[0].code==1){
        this.sharedService.Message(data[0].Msg,'success');
        
  this.btnClose.nativeElement.click();
        this.categoryService.SePaymentType(data[0].Id);
 
        this.getCardReload.emit('');
       }
       else{
        
  this.btnClose.nativeElement.click();
        this.sharedService.Message(data[0].Msg,'error');
       }
      }
   });
  }
  else{
    this.ls.setItem('card',this.data);
    
  this.btnClose.nativeElement.click();
  this.getCardReload.emit('');
  //  this.route.navigate([checkout']);
  }
      }
      else{
        this.Isdisable=true;
        this.btnClose.nativeElement.click();
      }
   }
   Pay(){
    let IsValid=1;
   
    if(!this.data.p_card_name || this.data.p_card_name=='') 
    {
    this.data.p_card_name=''
    IsValid=0;
    }
    else{
      if(this.GetCardType(this.data.p_card_name)==""){
       this.sharedService.Message('Invalid card no.','error');
    IsValid=0;
      }
      else{
        this.data.p_card_type=this.GetCardType(this.data.p_card_name);
      }
    }
    if(!this.data.p_card_number || this.data.p_card_number=='') 
    {
    this.data.p_card_number=''
    IsValid=0;
    }
    else{
      
    }
    if(this.data.p_card_expiry_month=='0' || this.data.p_card_expiry_month=='') 
    {
    this.data.p_card_expiry_month=''
    IsValid=0;
    }
    if(this.data.p_card_expiry_year=='0' || this.data.p_card_expiry_year=='') 
    {
    this.data.p_card_expiry_year=''
    IsValid=0;
    }
    if(!this.data.p_cvv) 
      {
      this.data.p_cvv=''
      IsValid=0;
      }
      else if(this.data.p_cvv.length>3 && this.data.p_cvv.length<2) 
      {
        this.sharedService.Message('Incorrect CVV code','error');
      IsValid=0;
      }
    if(IsValid==1){
      if(!this.data.p_id) this.data.p_id=0;
  
    
   }
   }
   IsSave(e:any){
    
  if(e) {
    this.isSave='1';
  this.Save();
  }
  else 
  {
  this.isSave='0';
  this.chkTermsCondition=false
  }
   }
   GetCardType(number:string)
  {
     
      var re = new RegExp("^4");
      if (number.match(re) != null)
          return "Visa";
  
      // Mastercard 
      // Updated for Mastercard 2017 BINs expansion
       if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
          return "Mastercard";
  
      // AMEX
      re = new RegExp("^3[47]");
      if (number.match(re) != null)
          return "AMEX";
  
      // Discover
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null)
          return "Discover";
  
      // Diners
      re = new RegExp("^36");
      if (number.match(re) != null)
          return "Diners";
  
      // Diners - Carte Blanche
      re = new RegExp("^30[0-5]");
      if (number.match(re) != null)
          return "Diners - Carte Blanche";
  
      // JCB
      re = new RegExp("^35(2[89]|[3-8][0-9])");
      if (number.match(re) != null)
          return "JCB";
  
      // Visa Electron
      re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
      if (number.match(re) != null)
          return "Visa Electron";
  
      return "";
  }
   validateExpiry () {
    
  
  if(this.data.p_card_expiry_year!='' && this.data.p_card_expiry_month!=''){
      const expiry = new Date(this.data.p_card_expiry_year, this.data.p_card_expiry_month);
      const current = new Date();
      
      if(expiry.getTime() < current.getTime()){
        this.data.p_card_expiry_month="";
        this.sharedService.Message('Invalid expiry date','error');
        
      }
    }
    }
  
  
  
    openModel() {
      this.isSave='0';
      if(this.chkTermsCondition) {
        let el: HTMLElement = this.chkCondition.nativeElement;
        el.click();
      }
      
    }
    closeModel() {
       this.chkCondition.nativeElement.className = 'modal hide';
    }
    IsValidMonthYear(type:any){
      if(type=='month'){
if(this.data.p_card_expiry_month>12){
  this.data.p_card_expiry_month='';
  
}
      }
      if(type=='year'){
       if(this.data.p_card_expiry_year.length==4){
        let currYear=(new Date().getFullYear())
        if(parseFloat(this.data.p_card_expiry_year)<parseFloat(currYear.toString())){
          this.data.p_card_expiry_year='';
          
        }
       }
    }
  }
}
  
