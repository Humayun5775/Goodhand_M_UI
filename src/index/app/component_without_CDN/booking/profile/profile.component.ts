import { Component, Input, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { baseApiUrl, baseApiUrlImage } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  mainForm :any;
  mainList:any;
  profilePic='';
  imageName='';
  @Input() customerId: any;
  data={
    name:'',
    phone:'',
    email:'',
    image:''
  }
  constructor(private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService,private formBuilder:FormBuilder) { }


  ngOnInit(): void {
    this.mainForm=this.formBuilder.group({
     
      name:[''],
      phone:[''],
      image:['']
  });  
  this.GetCustomer();
  }
  GetCustomer(){
 if(this.ls.getItem('customer')){
  this.categoryService.GetCustomer(this.customerId).subscribe((x:any)=>{
    
if(x.length>0){
  this.data.name=x[0].name;
  this.data.phone=x[0].phone;
  this.data.email=x[0].email;
  this.data.image=`${baseApiUrl}/api/image/`+x[0].image;
}
  })
 }
}
  // onFileChange(event:any) {
   
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.mainForm.patchValue({
  //       image: file
  //     });
  //     const formData = new FormData();
  //     formData.append('file', this.mainForm.get('image').value,this.mainForm.get('image').value.name);
  //     this.categoryService.UploadImage(formData).subscribe((x:any) => {
  //       debugger
  //       this.profilePic=`${baseApiUrl}/api/image/`+x.response;
  //       this.imageName=x.response;
  //     })
  //   }
    
  // }
  Save(){
    
let model={
  p_customer_id:this.ls.getItem('customer')[0].id,
  p_name:this.data.name,
  p_phone:this.data.phone,
  p_email:this.data.email,
  p_image:this.data.image
}
this.categoryService.UpdateProfile(model).subscribe((x:any) => {
  this.sharedService.Message('Profile updated successfully  ','success');
  this.GetCustomer();
  
});           


   
  }
}
