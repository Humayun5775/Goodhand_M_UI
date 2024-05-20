import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { baseApiUrl, PaymentKey, PaymentTokenUrl, PaymentUrl } from 'src/environments/environment';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //private pageName = new Subject<string>();
 
  private pageName = new BehaviorSubject('');
  private serviceMin = new BehaviorSubject(0);
  private IsAccept = new BehaviorSubject(false);
  private reload = new BehaviorSubject([]);
  private LoginRedirect='';
  private visitId='';
 order:any;
  constructor(private httpclient:HttpClient,private ls:LocalStoreService) { }
  setPageName(title: any) {
    this.pageName.next(title);
}
 
    SetTotalServiceMin(val:any){
      this.serviceMin.next(val);
    }
    GetTotalServiceMin() {
  
      return this.serviceMin.asObservable();
    }
setLoginRedirect(title: any) {
  this.LoginRedirect=title;
}
getvisitId() {
  

  if(this.visitId==''){
      this.visitId=new Date().valueOf().toString();
    }
    return this.visitId;
}
getLoginRedirect() {
  
  return  this.LoginRedirect
}
setAccept(title: boolean) {
  this.IsAccept.next(title);
}
getAccept() {
  
  return this.IsAccept.asObservable();
}
  getreload() {
    
    return this.reload.asObservable();
}
setreload(title: any) {
  
  this.reload.next(title);
}

getPageName() {
  
  return this.pageName.asObservable();
}
IsloggedIn(){
  if(this.ls.getItem('customer'))return true;
  return false;
}
 Message(msg:string,type:string) {
  let x:any;
  if(type=='error')x = document.getElementById("red_notification");
  if(type=='success')x = document.getElementById("notification");
  
  x.className = "show";
  x.innerHTML=msg 
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
GetToken(){
  let headers = new HttpHeaders({
    'Content-Type': 'application/vnd.ni-identity.v1+json',
    'Authorization': `Basic ${PaymentKey}` });
    const requestOptions = { headers: headers };
  return this.httpclient.post(`${PaymentTokenUrl}`,null,requestOptions);
}
PaymentTransaction(model:any,token:any){
  let headers = new HttpHeaders({
    'Accept': 'application/vnd.ni-payment.v2+json',
    'Content-Type': 'application/vnd.ni-payment.v2+json',
    'Authorization': `Basic ${token}` });
let options = { headers: headers, 
body:model
};
  return this.httpclient.post(`${PaymentUrl}`,options);
}

GetOrder(){
 return this.order;
}
SetOrder(model:any){
  this.order=model;
}
Encrypt(str:any) {
  
  let result = '';
  let val=str.toString();
  for (let i = 0; i < val.length; i++) {
    let char = val[i];
   if(char=='0')result+='A';
   if(char=='1')result+='b';
   if(char=='2')result+='C';
   if(char=='3')result+='d';
   if(char=='4')result+='E';
   if(char=='5')result+='f';
   if(char=='6')result+='G';
   if(char=='7')result+='h';
   if(char=='8')result+='I';
   if(char=='9')result+='j';
  }
  return result;
}

Decrypt(str:any) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
   if(char=='A')result+='0'
   if(char=='b')result+='1';
   if(char=='C')result+='2';
   if(char=='d')result+='3';
   if(char=='E')result+='4';
   if(char=='f')result+='5';
   if(char=='G')result+='6';
   if(char=='h')result+='7';
   if(char=='I')result+='8';
   if(char=='j')result+='9';
  }
  return result;
}

encryptData(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/encrypt`,model);
}
decryptData(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/decrypt`,model);
}

AddLog(page_name:any,p_activity:any){
  
  let data={
    p_ip_address:'',
    p_customer_id:0,
    page_name:page_name,
    p_activity:p_activity,
    p_session_id:this.getvisitId()
  }
  if(this.ls.getItem('customer')){
    data.p_customer_id=this.ls.getItem('customer')[0].id
    
  }
if(this.ls.getItem('IP'))
{
data.p_ip_address=this.ls.getItem('IP');
   this.httpclient.post(`${baseApiUrl}/api/mirror/log`,data).subscribe();
}
else{
  this.getIPAddress().subscribe((res:any)=>{  
  this.ls.setItem('IP',res.ip);
  data.p_ip_address=this.ls.getItem('IP');
  return this.httpclient.post(`${baseApiUrl}/api/mirror/log`,data).subscribe();

  });
}
return  this.httpclient.post(`${baseApiUrl}/api/mirror/log`,data).subscribe();
}
public getIPAddress()  
{  
  return this.httpclient.get("//api.ipify.org/?format=json");  
}  
}
