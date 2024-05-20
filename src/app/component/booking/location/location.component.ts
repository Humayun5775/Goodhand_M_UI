import { AfterContentChecked, AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import SwiperCore, { Pagination, Swiper, SwiperOptions } from 'swiper';
SwiperCore.use([Pagination])
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
 ],
})
export class LocationComponent implements OnInit  {
  swiper: any;
mainList:any;
silderList:any=[];
locationCount=0;
loading=true;
IsLogin=false;
type='';
currentLocation:any;
   timing:any;
   slides = [
    {image: 'https://mirrorsbeautylounge.com/mirror-admin/public/images/master-services/services/Muraqbat.gif', text: 'First'},
    {image: './assets/img/makeup.jpg',text: 'Second'},
    {image: './assets/img/massage.jpg',text: 'Third'}
 ];
 noWrapSlides = false;
 showIndicator = true;

  constructor(@Inject(ElementRef) private elementRef: ElementRef,private locationService:LocationService,private sharedService:SharedService,private ls:LocalStoreService,private router: Router ) { }

  ngOnInit(): void {
        
    let model={PageName:'Choose Location',Title:'Choose Location',IsSearch:false}
    this.sharedService.setPageName(model);
    this.IsLoggedIn();
    this.GetLocation();
this.GetOpenTime();
  }
  
  // ngAfterViewInit(): void {
    
  //   const nativeElement = this.elementRef.nativeElement;
  //   if(nativeElement.querySelector('swiper')){
  //   this.swiper = new Swiper(nativeElement.querySelector('swiper'), this.config);
  //   }
  // }

  GetLocation(){
this.type='';
if(this.locationService.GetType()){
  this.type=this.locationService.GetType();
  this.locationService.SetType(null);
}
    this.locationService.GetLocation().subscribe((data:any)=>{
      
      
      this.mainList=data; 
      this.mainList.forEach((element:any) => {
        this.locationService.GetLocationImage(element.id).subscribe((x:any)=>{
          this.silderList[element.id]=x;
      });
    });
      
      // if(this.type=='salon'){
      //   this.mainList=this.mainList.filter((x:any)=>x.id!=3); 
      // } 
      if(this.type=='home'){
        this.mainList=this.mainList.filter((x:any)=>x.id==3); 
      }
      else{
        this.mainList=this.mainList.filter((x:any)=>x.id!=3); 
      }
this.locationCount=this.mainList.length;
this.loading=false;



if(localStorage.getItem('currentLatitude') && localStorage.getItem('currentLongitude')){
  this.NearestCity(localStorage.getItem('currentLatitude'),localStorage.getItem('currentLongitude'))
}
       
});
}
IsLoggedIn(){
  if(this.ls.getItem('customer')){
    this.IsLogin=true;
  }else{
    this.IsLogin=false;
  }
}
SelectedLocation(Id:any){
let LocationName=this.mainList.filter((x:any)=>x.id==Id).map((y:any)=>y.location_name)
this.ls.setItem('LocationId',Id);
this.ls.setItem('LocationName',LocationName);
this.ls.setItem('LocationAddress',this.mainList.filter((x:any)=>x.id==Id).map((y:any)=>y.address));
this.router.navigate(['/category']);

}
loggedIn(){
  if(this.sharedService.IsloggedIn()) this.router.navigate(['/my-booking']);
  else this.router.navigate(['/category']);
} 
home(){
    
  window.location.href="https://mirrorsbeautylounge.com"
}
loggedOut(){
  this.ls.clear();
  this.router.navigate(['/location']);
}
onImgError(event:any) { 
  event.target.src = './assets/img/image-not-available.jpg';
}
// Convert Degress to Radians
 Deg2Rad(deg:any) {
  return deg * Math.PI / 180;
}
 PythagorasEquirectangular(lat1:any, lon1:any, lat2:any, lon2:any) {
  lat1 = this.Deg2Rad(lat1);
  lat2 = this.Deg2Rad(lat2);
  lon1 = this.Deg2Rad(lon1);
  lon2 = this.Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}



 NearestCity(latitude:any, longitude:any) {
  var minDif = 99999;
  let closest:any;

  for (let index = 0; index < this.mainList.length; ++index) {
    this.mainList[index].IsClose=0;
    var dif = this.PythagorasEquirectangular(latitude, longitude,  this.mainList[index].latitude,  this.mainList[index].longitude);
    if (dif < minDif) {
      closest = index;
      minDif = dif;
    }
  }
  

this.currentLocation=this.mainList[closest];
this.mainList[closest].IsClose=1;
this.mainList = this.mainList.reduce((acc:any, element:any) => {
  if (element.IsClose==1) {
    return [element, ...acc];
  }
  return [...acc, element];
}, []);
 
}
Back(){
  this.router.navigate(['/home-salon-retail']);
}
GetOpenTime(){
  
  let currentMin=((new Date().getHours())*60)+(new Date().getMinutes());
  let openMin=((new Date("July 21, 1983 10:00:00").getHours())*60)+(new Date("July 21, 1983 10:00:00").getMinutes());
  let alarmMin=((new Date("July 21, 1983 21:15:00").getHours())*60)+(new Date("July 21, 1983 21:15:00").getMinutes())
  let closeMin=((new Date("July 21, 1983 22:00:00").getHours())*60)+(new Date("July 21, 1983 22:00:00").getMinutes())

  if(alarmMin<=currentMin && currentMin<closeMin){
  this.timing='alarm';
} 
else  if(openMin<=currentMin && currentMin<=closeMin){
  this.timing='open';
}
else if(currentMin>closeMin || currentMin<openMin){
this.timing='close';
}

  
 
}
loadSlider(){
  
}

ngAfterViewInit() {
  console.log('Parent After View Init');
}
}

