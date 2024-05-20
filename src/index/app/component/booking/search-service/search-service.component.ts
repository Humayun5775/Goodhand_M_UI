import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.css']
})
export class SearchServiceComponent implements OnInit,AfterViewInit {
  mainList:any=[];
  subCatList:any=[];
  categoryId:any;
  categoryName:any;
  IsNoResult=false;
  txtSearch='';
  IsSearch=false;
  IsReset=false;
  @ViewChild('auto') auto:any;
  @ViewChild('search') search:any;
  constructor(private categoryService:CategoryService,private router: Router,private ls:LocalStoreService,private sharedService:SharedService,private locationService:LocationService,private route: ActivatedRoute) { }
 

  ngOnInit(): void {
    
    let model={PageName:'Search services',Title:'Search services',IsSearch:false}
    this.sharedService.setPageName(model);
    this.categoryId = this.ls.getItem('CatId');
    this.categoryName = this.ls.getItem('CatName');
    this.SubCategory(this.categoryId,0);
  }
  
ngAfterViewInit() { 

  this.search.nativeElement.focus();
}
  SearchService(){
    
    this.mainList=[];
 if(this.txtSearch!=''){
     if(this.txtSearch.length>1){
      this.IsSearch=true;
      this.IsReset=true;
      if(!this.categoryId){
        this.categoryId=0;
      }
      this.categoryService.SearchService(this.categoryId,this.txtSearch,this.ls.getItem('LocationId')).subscribe((data:any)=>{

        this.mainList=data;
   
        if(this.mainList.length==0)this.Clear();
        else  this.IsNoResult=false;
        this.IsSearch=false; 

  });
     }
     else{
      this.Clear();
      this.IsSearch=false; 
      this.IsReset=false; 
     }
    }
    else{
      this.Clear();
      this.IsSearch=false; 
      this.IsReset=false;
    }
 
}

SearchSubCat(id:any){
    
  this.mainList=[];

  this.categoryService.GetService('0','0',id,this.ls.getItem('LocationId')).subscribe((data:any)=>{
       
      
    this.mainList=data;
   
    if(this.mainList.length<=0)this.Clear();
    else  this.IsNoResult=false;
      
});
 

}
GetServiceId(catId:any,serviceId:any){
  this.ls.setItem('CatId',catId)
  this.categoryService.SetServiceId(serviceId);
this.router.navigate(['/service-detail'], { fragment: serviceId });
}
Clear(){
  this.mainList=[];
  this.IsNoResult=true;
}
Reset(){
  this.txtSearch='';
  this.mainList=[];
  this.IsNoResult=false;
  this.IsReset=false;
}
SubCategory(p_category_id:any,p_sub_category_id:any){
 
  let model={
   p_category_id:p_category_id,
   p_sub_category_id:p_sub_category_id,
   p_location:this.ls.getItem('LocationId')

  }
   this.categoryService.SubCategory(model).subscribe((data:any)=>{

     this.subCatList=data;
});
}
GetSubCategory(SubCatId:any){
  this.categoryService.SetSubCategoryValue(SubCatId);
  this.router.navigate(['/service-detail'], { fragment: SubCatId });
}
onImgError(event:any) { 
  event.target.src = './assets/img/image-not-available.jpg';
}
}
