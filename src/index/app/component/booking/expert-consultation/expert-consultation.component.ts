import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';

@Component({
  selector: 'app-expert-consultation',
  templateUrl: './expert-consultation.component.html',
  styleUrls: ['./expert-consultation.component.css']
})
export class ExpertConsultationComponent implements OnInit {
  mainList:any=[];
  categoryId:any;
  serviceId='0'
  howItWorkUrl='';
  whyMirrorUrl='';
  constructor(private route: Router,private categoryService:CategoryService,private ls:LocalStoreService) { }

  ngOnInit(): void {
    
    this.categoryId = this.ls.getItem('CatId');
    this.GetCategory();
  }

  GetCategory(){
    if( this.categoryId=='30' ||  this.categoryId=='46'){
      this.howItWorkUrl='./assets/img/how-it-work.jpg';
      this.whyMirrorUrl='./assets/img/why-laser.jpg';
    }
    else if(this.categoryId=='3' ||  this.categoryId=='35'){
      this.howItWorkUrl='./assets/img/how-it-work-facial.jpg';
      this.whyMirrorUrl='./assets/img/why-laser-facial.jpg';
    }
    let IsHomeCate=0;
    this.mainList=[];
    if(this.ls.getItem('LocationId')){
      if(this.ls.getItem('LocationId')=='3'){
        IsHomeCate=1;
     
      }
    }
    else{

    }
    if(IsHomeCate==0){
        this.categoryService.GetCategory().subscribe((data:any)=>{
          
          
          let cat=data.find((x:any)=>(x.id==this.categoryId));
          let cons=data.find((x:any)=>( x.id==48 ));
       this.mainList.push(cat);
       this.mainList.push(cons);
          
    });
    }
    else{
      
      this.categoryService.GetHomeCategory().subscribe((data:any)=>{
        
          
        let cat=data.find((x:any)=>(x.id==this.categoryId));
        let cons=data.find((x:any)=>( x.id==50 ));
     this.mainList.push(cat);
     this.mainList.push(cons);
      
        
  });
    }
  }
  
getSubCategory(id:any,name:any)
{
     
 this.ls.setItem('CatName',name);
 this.ls.setItem('CatId',id);
 
 if( this.categoryId=='30' ||  this.categoryId=='46'){
  this.route.navigate(['/service-detail/permanent-makeup']);
}
else if(this.categoryId=='3' ||  this.categoryId=='35'){
  this.route.navigate(['/service-detail/facial-services']);
}
 
 }
  Back(){
    this.route.navigate(['/category']);
  }
}
