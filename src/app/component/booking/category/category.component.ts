import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  mainList:any;
locationName='';
loading=true;
    constructor(private title: Title,private route: Router,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private sharedService:SharedService) { }
    ngOnInit(): void {
      this.title.setTitle(" Mirrors Beauty Lounge | Category"); // <-- Update the title
      this.GetCategory('F');
     
    }
    GetCategory(gender:any){
  let IsHomeCate=0;
  if(this.ls.getItem('LocationId')){
    if(this.ls.getItem('LocationId')=='3'){
      IsHomeCate=1;
      let model={PageName:'Category',Title:'Salon at home',IsSearch:false}
      this.sharedService.setPageName(model);
    }
    
  this.sharedService.AddLog('Category','Salon at home');
  }
  else{
    let model={PageName:'Category',Title:'Salon Service',IsSearch:false}
    this.sharedService.setPageName(model);
    this.route.navigate(['/location']);
  }
  if(IsHomeCate==0){
      this.categoryService.GetCategory().subscribe((data:any)=>{
        
        
        this.mainList=data.filter((x:any)=>x.status == 1&& x.id!=48 && x.gender==gender);
        this.loading=false;
        
  });
  }
  else{
    
    this.categoryService.GetHomeCategory().subscribe((data:any)=>{
      
      
      this.mainList=data.filter((x:any)=>x.status == 1 && x.id!=50);
      this.loading=false;
      
});
  }
}
getSubCategory(id:any,name:any,slug:any)
 {
      if(this.ls.getItem('LocationId')=='3'){
        if(id==35 || id==46){
          this.route.navigate(['/expert-consultation/'+slug]);
        }
        else{
        this.route.navigate(['/service-detail/'+slug]);
        }
  }
  else{
   
    if(id==30 || id==3){
      this.route.navigate(['/expert-consultation/'+slug]);
    }
    else{
    this.route.navigate(['/service-detail/'+slug]);
    }
  }
  this.ls.setItem('CatName',name);
  this.ls.setItem('CatId',id);
  
  }
  
  Back(){
    this.route.navigate(['/home-salon-retail']);
  }
}