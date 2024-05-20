import { Injectable } from '@angular/core';
import { baseApiUrl, baseApiUrlLocal } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient:HttpClient) { }
 
  otpDetail:any;
 addressDetail:any;
addressId:any;
categoryValue:any;
subCategoryValue:any;
serviceId:any;
serviceMin:any;
paymentTypeId:any;
GetCategoryValue(){
return this.categoryValue;
}
SetSubCategoryValue(val:any){
  this.subCategoryValue=val;
}
GetSubCategoryValue(){
return this.subCategoryValue;
}
SetCategoryValue(val:any){
  this.categoryValue=val;
}
GetServiceId(){
  return this.serviceId;
  }
  SetServiceId(val:any){
    this.serviceId=val;
  }
  GetPaymentType(){
    return this.paymentTypeId;
    }
    SePaymentType(val:any){
      this.paymentTypeId=val;
    }
    

  GetCategory(){
    return this.httpclient.get(`${baseApiUrl}/api/Category/GetCategory`);
  }
  GetHomeCategory(){
    return this.httpclient.get(`${baseApiUrl}/api/Category/GetHomeCategory`);
  }
  SubCategory(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/SubCategory`,model);
  }
  GetCategoryBySlug(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/GetCategoryBySlug`,model);
  }
  GetHomePageOfferBanner(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/GetHomePageOfferBanner`,model);
  }
  GetBookingSubCategoryCount(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/GetBookingSubCategoryCount`,model);
  }
  GetMasterServiceFaq(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/GetMasterServiceFaq`,model);
  }
  GetWhyMirror(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/GetWhyMirror`,model);
  }
  SearchService(p_category_id:string,p_service_name:string,p_locationId:string){
    return this.httpclient.get(`${baseApiUrl}/api/Category/SearchService/`+p_category_id+'/'+p_service_name+'/'+p_locationId);
  }
  SubCategoryServices(){
    return this.httpclient.get(`${baseApiUrl}/api/Category/SubCategoryServices`);
  }
  GetService(p_service_id:string,p_category_id:string,p_sub_category_id:string,p_location:string){
    
    return this.httpclient.get(`${baseApiUrl}/api/Category/GetService/`+p_service_id+'/'+p_category_id+'/'+p_sub_category_id+'/'+p_location);
  }
  GetServiceAmountByLocation(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/GetServiceAmountByLocation`,model);
  }
  GetServiceOption(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/GetServiceOption`,model);
  }
  ValidCouponCode(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Category/ValidCouponCode`,model);
  }
  GetCouponCount(){
    return this.httpclient.get(`${baseApiUrl}/api/Category/GetCouponCount`);
  }
  GetCouponList(){
    return this.httpclient.get(`${baseApiUrl}/api/Category/GetCouponList`);
  }
  SendSMS(model:any){
  //  return this.httpclient.get(`${baseApiUrl}/api/Integration/SendSMS/`+MobileNo+'/'+CartSession);
    return this.httpclient.post(`${baseApiUrl}/api/Integration/SendSMS`,model);
  }
  SMS(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Integration/SMS`,model);
  }
  SetOTPDetail(val:any){
    this.otpDetail=val;
  }
GetOTPDetail(){
 return this.otpDetail;
}
CheckCustomers(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/CheckCustomer`,model);
}
GetCustomerAddress(p_customer_id:string,p_id:string){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/GetCustomerAddress/`+p_customer_id+'/'+p_id);
}
SaveCustomerAddress(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/SaveCustomerAddress`,model);
}

DeleteCustomerAddress(p_id:string){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/DeleteCustomerAddress/`+p_id);
}
DeleteCustomer(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/DeleteCustomer`,model);
}

UpdateCustomerSetting(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/UpdateCustomerSetting`,model);
}

SaveCustomerTip(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/SaveCustomerTip`,model);
}

GetWallet(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/Wallet`,model);
}

decrypt(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/decrypt`,model);
}

encrypt(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/encrypt`,model);
}
SetAddressDetail(val:any){
  this.addressDetail=val;
}
GetAddressDetail(){
return this.addressDetail;
}

SetAddressId(val:any){
  this.addressId=val;
}
GetAddressId(){
return this.addressId;
}
GetAddressFromLatLng(lat:string,lag:string){
  return this.httpclient.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lag+'&sensor=true&key=AIzaSyBCOG6E5SOknPmpX-CvDMHYt7h4HoNPDFg');
  }
  CardOrder(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/payment/purchase`,model);
  }
  PayByCard(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/payment/create-order`,model);
  }
  RetrieveCardTransaction(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/payment/retrieve-order`,model);
  }
  SaveCustomerCard(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Customer/SaveCustomerCard`,model);
  }
  GetCustomerCard(p_id:string,p_customer_id:string){
    return this.httpclient.get(`${baseApiUrl}/api/Customer/GetCustomerCard/`+p_id+"/"+p_customer_id);
  }
  DeleteCustomerCard(model:any){
    return this.httpclient.post(`${baseApiUrl}/api/Customer/DeleteCustomerCard`,model);
  }
  
  GetBookingCustomerCart(p_customer_id:string){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/GetBookingCustomerCart/`+p_customer_id);
}

DeleteBookingCustomerCart(p_id:string){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/DeleteBookingCustomerCart/`+p_id);
}
SaveBookingCart(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/SaveBookingCart`,model);
}
SaveOrder(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/SaveOrder`,model);
}
CardPayementLog(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/CardPayementLog`,model);
}
UpdateOrderStatus(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/UpdateOrderStatus`,model);
}
GetBookingOrder(p_ref_id:string){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/GetBookingOrder/`+p_ref_id);
}
GetBookingOrderDetail(p_ref_id:string){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/GetBookingOrderDetail/`+p_ref_id);
}
Reschedule(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/Reschedule`,model);
}
GetCancellationReasons(){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/GetCancellationReasons`);
}
CancelOrder(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/CancelOrder`,model);
}
SaveCancelOrderOffer(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Category/SaveCancelOrderOffer`,model);
}
UpdateCancelOffer(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Category/UpdateCancelOffer`,model);
}
GetOrderService(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/GetOrderService`,model);
}
UpdateProfile(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/UpdateProfile`,model);
}
UploadImage(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/image-upload`,model);
}

GetCustomer(p_customer_id:any){
  return this.httpclient.get(`${baseApiUrl}/api/Customer/GetCustomer/`+p_customer_id);
}
GetImage(p_image:any){
  return this.httpclient.get(`${baseApiUrl}/api/image/`+p_image);
}

Notify(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Customer/NotifyMobile`,model);
}
Outside(url:any,model:any,header:any){
  return this.httpclient.post(url,model,header);
}
GetBlog(){
  return this.httpclient.get(`${baseApiUrl}/api/Blog/GetBlog`);
}
GetBlogDetail(model:any){
  return this.httpclient.post(`${baseApiUrl}/api/Blog/GetBlogDetail`,model);
}
}
