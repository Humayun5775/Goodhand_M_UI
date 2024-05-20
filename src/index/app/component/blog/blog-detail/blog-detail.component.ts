import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  constructor(private title: Title,private meta: Meta,private scroller: ViewportScroller,private activatedRoute: ActivatedRoute,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }
  
  mainList:any=[];
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('slug')){
      this.GetBlogDetail(this.activatedRoute.snapshot.paramMap.get('slug'));
    }
  }
  GetBlogDetail(link:any){
    
    let model={
      p_link:link
    }
    this.categoryService.GetBlogDetail(model).subscribe((data:any)=>{
      this.mainList=data;
    })
  }

}
