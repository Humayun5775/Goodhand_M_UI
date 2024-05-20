import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeSalonRetailComponent } from './home-salon-retail/home-salon-retail.component';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { EnterMobileComponent } from './enter-mobile/enter-mobile.component';
import { EnterOTPComponent } from './enter-otp/enter-otp.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { SearchServiceComponent } from './search-service/search-service.component';
import { DateSlotComponent } from './date-slot/date-slot.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddCardComponent } from './add-card/add-card.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { ProfileComponent } from './profile/profile.component';
import { RetailComponent } from './retail/retail.component';
import { BookingConfirmedComponent } from './booking-confirmed/booking-confirmed.component';
import { BookingRescheduleComponent } from './booking-reschedule/booking-reschedule.component';
import { BookingCancelledComponent } from './booking-cancelled/booking-cancelled.component';
import { SelectStaffComponent } from './select-staff/select-staff.component';
import { ExpertConsultationComponent } from './expert-consultation/expert-consultation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SwiperModule } from 'swiper/angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgOtpInputModule } from 'ng-otp-input';
import { AgmCoreModule } from '@agm/core';
import { BookingComponent } from '../booking/booking.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { PopupAddAddressComponent } from './popup-add-address/popup-add-address.component';
import { PopupAddCardComponent } from './popup-add-card/popup-add-card.component';
import { PopupDateSlotComponent } from './popup-date-slot/popup-date-slot.component';
import { HeaderComponent } from '../shared/header/header.component';
import { BackButtonDirective } from 'src/app/back-button.directive';
import { PopupSaveAddressComponent } from './popup-save-address/popup-save-address.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { LoginComponent } from '../shared/login/login.component';
import { HelpComponent } from './help/help.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { CardOrderComponent } from './card-order/card-order.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { BookingFailedComponent } from './booking-failed/booking-failed.component';
import { ImagekitAuthenticationEndpoint, ImagekitPublicKey, ImagekitUrlEndpoint } from 'src/environments/environment';
@NgModule({
  declarations: [
    // HomeSalonRetailComponent,
    // LocationComponent,
    // CategoryComponent,
    // SubCategoryComponent,
    // ViewCartComponent,
    // EnterMobileComponent,
    // EnterOTPComponent,
    // AddressComponent,
    // AddAddressComponent,
    // SearchLocationComponent,
    // SearchServiceComponent,
    // DateSlotComponent,
    // CheckoutComponent,
    // AddCardComponent,
    // MyBookingComponent,
    // RetailComponent,
    // BookingConfirmedComponent,
    // BookingRescheduleComponent,
    // BookingCancelledComponent,
    // HomeSalonRetailComponent,
    // SelectStaffComponent,
    // ExpertConsultationComponent,
    // BookingComponent,
    // ServiceDetailComponent,
    // PopupAddAddressComponent,
    // PopupAddCardComponent,
    // PopupDateSlotComponent,
    // PopupSaveAddressComponent,
    // HeaderComponent,  
    // LoginComponent, HelpComponent, CardOrderComponent, TermsAndConditionsComponent, PrivacyPolicyComponent, CancellationPolicyComponent, BookingFailedComponent

  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
        ReactiveFormsModule,
        FormsModule,
        GooglePlaceModule,
        SwiperModule,
        AutocompleteLibModule,
        CarouselModule,
        NgOtpInputModule,
        SharedModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...', }),
   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBCOG6E5SOknPmpX-CvDMHYt7h4HoNPDFg',
      libraries: ['places']
    }),
    
    ImagekitioAngularModule.forRoot({
      publicKey: ImagekitPublicKey, // or environment.publicKey
      urlEndpoint:ImagekitUrlEndpoint, // or environment.urlEndpoint
      authenticationEndpoint:ImagekitAuthenticationEndpoint// or environment.authenticationEndpoint
  }),
    RouterModule.forChild([
       
				// {path:'', redirectTo: 'home-salon-retail', pathMatch: 'full'},
				{path: 'location', component: LocationComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'view-cart', component: ViewCartComponent},
  {path: 'service-detail/:slug', component: SubCategoryComponent},
  {path: 'service-detail', component: SubCategoryComponent},
  {path: 'enter-mobile', component: EnterMobileComponent},
  {path: 'enter-otp', component: EnterOTPComponent},
  {path: 'address', component: AddressComponent},
  {path: 'new-address', component: AddAddressComponent},
  {path: 'search-location', component: SearchLocationComponent},
  {path: 'search-service', component: SearchServiceComponent},
  {path: 'date-slot', component: DateSlotComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'add-card', component: AddCardComponent},
  {path: 'my-booking', component: MyBookingComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'retail', component: RetailComponent},
  {path: 'confirm/:id', component: BookingConfirmedComponent},
  {path: 'reschedule/:id', component: BookingRescheduleComponent},
  {path: 'cancelled/:id', component: BookingCancelledComponent},
  {path: 'failed/:id', component: BookingFailedComponent},
  {path: 'card-order', component: CardOrderComponent},
  {path: 'home-salon-retail', component: HomeSalonRetailComponent},
  {path: 'select-staff', component: SelectStaffComponent},
  {path: 'expert-consultation/:slug', component: ExpertConsultationComponent},
  {path: 'booking/help', component: HelpComponent},
        
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
  //   RouterModule,LoginComponent,
  //   PopupAddAddressComponent,
  //   PopupAddCardComponent,
  //   PopupDateSlotComponent,
  //   PopupSaveAddressComponent,
  // PrivacyPolicyComponent,
  // CancellationPolicyComponent,
  // TermsAndConditionsComponent
  ]
})
export class BookingModule { }
