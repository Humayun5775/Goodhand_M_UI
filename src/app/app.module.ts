import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { BackButtonDirective } from './back-button.directive';
import { NgxImageBlurModule } from 'ngx-image-blur';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarouselModule } from 'ngx-bootstrap/carousel/';
import { NgOtpInputModule } from 'ng-otp-input';
import { MirrorFooterComponent } from './component/shared/mirror-footer/mirror-footer.component';
import { SharedModule } from './shared/shared/shared.module';
import { LoginComponent } from './component/shared/login/login.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { ImagekitAuthenticationEndpoint, ImagekitPublicKey, ImagekitUrlEndpoint } from 'src/environments/environment';
import { LocationComponent } from './component/booking/location/location.component';
import { CategoryComponent } from './component/booking/category/category.component';
import { SubCategoryComponent } from './component/booking/sub-category/sub-category.component';
import { ViewCartComponent } from './component/booking/view-cart/view-cart.component';
import { EnterMobileComponent } from './component/booking/enter-mobile/enter-mobile.component';
import { EnterOTPComponent } from './component/booking/enter-otp/enter-otp.component';
import { AddressComponent } from './component/booking/address/address.component';
import { AddAddressComponent } from './component/booking/add-address/add-address.component';
import { SearchLocationComponent } from './component/booking/search-location/search-location.component';
import { SearchServiceComponent } from './component/booking/search-service/search-service.component';
import { DateSlotComponent } from './component/booking/date-slot/date-slot.component';
import { CheckoutComponent } from './component/booking/checkout/checkout.component';
import { AddCardComponent } from './component/booking/add-card/add-card.component';
import { MyBookingComponent } from './component/booking/my-booking/my-booking.component';
import { RetailComponent } from './component/booking/retail/retail.component';
import { BookingConfirmedComponent } from './component/booking/booking-confirmed/booking-confirmed.component';
import { BookingRescheduleComponent } from './component/booking/booking-reschedule/booking-reschedule.component';
import { BookingCancelledComponent } from './component/booking/booking-cancelled/booking-cancelled.component';
import { HomeSalonRetailComponent } from './component/booking/home-salon-retail/home-salon-retail.component';
import { SelectStaffComponent } from './component/booking/select-staff/select-staff.component';
import { ExpertConsultationComponent } from './component/booking/expert-consultation/expert-consultation.component';
import { BookingComponent } from './component/booking/booking.component';
import { ServiceDetailComponent } from './component/booking/service-detail/service-detail.component';
import { PopupAddAddressComponent } from './component/booking/popup-add-address/popup-add-address.component';
import { PopupAddCardComponent } from './component/booking/popup-add-card/popup-add-card.component';
import { PopupDateSlotComponent } from './component/booking/popup-date-slot/popup-date-slot.component';
import { PopupSaveAddressComponent } from './component/booking/popup-save-address/popup-save-address.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { HelpComponent } from './component/booking/help/help.component';
import { CardOrderComponent } from './component/booking/card-order/card-order.component';
import { TermsAndConditionsComponent } from './component/booking/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './component/booking/privacy-policy/privacy-policy.component';
import { CancellationPolicyComponent } from './component/booking/cancellation-policy/cancellation-policy.component';
import { BookingFailedComponent } from './component/booking/booking-failed/booking-failed.component';
import { HomeComponent } from './component/mirror/home/home.component';
import { AccountMenuComponent } from './component/mirror/account-menu/account-menu.component';
import { HelpcenterComponent } from './component/mirror/helpcenter/helpcenter.component';
import { BookingsComponent } from './component/mirror/bookings/bookings.component';
import { AccountComponent } from './component/mirror/account/account.component';
import { ChangePhoneComponent } from './component/mirror/change-phone/change-phone.component';
import { CheckSaveAddressComponent } from './component/mirror/check-save-address/check-save-address.component';
import { ChangeEmailComponent } from './component/mirror/change-email/change-email.component';
import { SeePaymentDetailsComponent } from './component/mirror/see-payment-details/see-payment-details.component';
import { GettingStartedWithMirrorsComponent } from './component/mirror/getting-started-with-mirrors/getting-started-with-mirrors.component';
import { PaymentCreditsComponent } from './component/mirror/payment-credits/payment-credits.component';
import { MirrorsMembershipComponent } from './component/mirror/mirrors-membership/mirrors-membership.component';
import { MirrorsSafetyComponent } from './component/mirror/mirrors-safety/mirrors-safety.component';
import { WhatIsMirrorsComponent } from './component/mirror/what-is-mirrors/what-is-mirrors.component';
import { HowToPlaceBookingComponent } from './component/mirror/how-to-place-booking/how-to-place-booking.component';
import { CanIRebookTheSameProfessionalComponent } from './component/mirror/can-i-rebook-the-same-professional/can-i-rebook-the-same-professional.component';
import { PreferredProfessionalComponent } from './component/mirror/preferred-professional/preferred-professional.component';
import { MinimumOrderComponent } from './component/mirror/minimum-order/minimum-order.component';
import { CancellationFeeComponent } from './component/mirror/cancellation-fee/cancellation-fee.component';
import { CheckWalletBalanceComponent } from './component/mirror/check-wallet-balance/check-wallet-balance.component';
import { UseMirrorsCreditsComponent } from './component/mirror/use-mirrors-credits/use-mirrors-credits.component';
import { ValidityRewardsComponent } from './component/mirror/validity-rewards/validity-rewards.component';
import { HowDoesReferralWorkComponent } from './component/mirror/how-does-referral-work/how-does-referral-work.component';
import { NotReceivedRewardReferralComponent } from './component/mirror/not-received-reward-referral/not-received-reward-referral.component';
import { SavedPaymentDetailsComponent } from './component/mirror/saved-payment-details/saved-payment-details.component';
import { CovidSafetyComponent } from './component/mirror/covid-safety/covid-safety.component';
import { CheckProfessionalVaccinatedComponent } from './component/mirror/check-professional-vaccinated/check-professional-vaccinated.component';
import { MirrorWalletComponent } from './component/mirror/mirror-wallet/mirror-wallet.component';
import { ReferAndEarnComponent } from './component/mirror/refer-and-earn/refer-and-earn.component';
import { SettingComponent } from './component/mirror/setting/setting.component';
import { CardListComponent } from './component/mirror/card-list/card-list.component';
import { ProfileComponent } from './component/booking/profile/profile.component';
import { AssignMePreferredProfessionalComponent } from './component/mirror/assign-me-preferred-professional/assign-me-preferred-professional.component';
import { AddRemoveServiceBookingComponent } from './component/mirror/add-remove-service-booking/add-remove-service-booking.component';
import { MakePaymentBookingComponent } from './component/mirror/make-payment-booking/make-payment-booking.component';
import { UnableMakePaymentComponent } from './component/mirror/unable-make-payment/unable-make-payment.component';
import { DidntGetTheCashbackComponent } from './component/mirror/didnt-get-the-cashback/didnt-get-the-cashback.component';
import { PriceingIssueComponent } from './component/mirror/priceing-issue/priceing-issue.component';
import { ChangeAddressPhoneComponent } from './component/mirror/change-address-phone/change-address-phone.component';
import { ContactTheProfessionalComponent } from './component/mirror/contact-the-professional/contact-the-professional.component';
import { KnowMoreAboutServicesComponent } from './component/mirror/know-more-about-services/know-more-about-services.component';
import { ReportAnotherIssueComponent } from './component/mirror/report-another-issue/report-another-issue.component';
import { NotHappyServiceExperienceComponent } from './component/mirror/not-happy-service-experience/not-happy-service-experience.component';
import { NotReceivedRefundComponent } from './component/mirror/not-received-refund/not-received-refund.component';
import { ModifyThisBookingsComponent } from './component/mirror/modify-this-bookings/modify-this-bookings.component';
import { PreferredProfessionalNotVisibleComponent } from './component/mirror/preferred-professional-not-visible/preferred-professional-not-visible.component';
import { PreferredSlotsNotAvailbleComponent } from './component/mirror/preferred-slots-not-availble/preferred-slots-not-availble.component';
import { ProfessionalNotAssignedComponent } from './component/mirror/professional-not-assigned/professional-not-assigned.component';
import { OtherPaymentRelatedIssueComponent } from './component/mirror/other-payment-related-issue/other-payment-related-issue.component';
import { PaymentsRefundsComponent } from './component/mirror/payments-refunds/payments-refunds.component';
import { AboutUsComponent } from './component/mirror/about-us/about-us.component';
import { ContactUsComponent } from './component/mirror/contact-us/contact-us.component';
import { IncorrectRefundComponent } from './component/mirror/incorrect-refund/incorrect-refund.component';
import { BlogComponent } from './component/blog/blog/blog.component';
import { BlogDetailComponent } from './component/blog/blog-detail/blog-detail.component';
import { NearMeComponent } from './near-me/near-me/near-me.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeSalonRetailComponent,
      LocationComponent,
      CategoryComponent,
      SubCategoryComponent,
      ViewCartComponent,
      EnterMobileComponent,
      EnterOTPComponent,
      AddressComponent,
      AddAddressComponent,
      SearchLocationComponent,
      SearchServiceComponent,
      DateSlotComponent,
      CheckoutComponent,
      AddCardComponent,
      MyBookingComponent,
      RetailComponent,
      BookingConfirmedComponent,
      BookingRescheduleComponent,
      BookingCancelledComponent,
      HomeSalonRetailComponent,
      SelectStaffComponent,
      ExpertConsultationComponent,
      BookingComponent,
      ServiceDetailComponent,
      PopupAddAddressComponent,
      PopupAddCardComponent,
      PopupDateSlotComponent,
      PopupSaveAddressComponent,
      HeaderComponent,
      MirrorFooterComponent,  
      LoginComponent, HelpComponent, CardOrderComponent, TermsAndConditionsComponent, PrivacyPolicyComponent, CancellationPolicyComponent, BookingFailedComponent,
   
      HomeComponent,
      AccountMenuComponent,
      HelpcenterComponent,
      BookingsComponent,
      AccountComponent,
      ChangePhoneComponent,
      CheckSaveAddressComponent,
      ChangeEmailComponent,
      SeePaymentDetailsComponent,
      GettingStartedWithMirrorsComponent,
      PaymentCreditsComponent,
      MirrorsMembershipComponent,
      MirrorsSafetyComponent,
      WhatIsMirrorsComponent,
      HowToPlaceBookingComponent,
      CanIRebookTheSameProfessionalComponent,
      PreferredProfessionalComponent,
      MinimumOrderComponent,
      CancellationFeeComponent,
      CheckWalletBalanceComponent,
      UseMirrorsCreditsComponent,
      ValidityRewardsComponent,
      HowDoesReferralWorkComponent,
      NotReceivedRewardReferralComponent,
      SavedPaymentDetailsComponent,
      CovidSafetyComponent,
      CheckProfessionalVaccinatedComponent,
      MirrorFooterComponent,
      MirrorWalletComponent,
      ReferAndEarnComponent,
      SettingComponent,
      CardListComponent,
    ProfileComponent,
    AssignMePreferredProfessionalComponent,
    AddRemoveServiceBookingComponent,
    MakePaymentBookingComponent,
    UnableMakePaymentComponent,
    DidntGetTheCashbackComponent,
    PriceingIssueComponent,
    ChangeAddressPhoneComponent,
    ContactTheProfessionalComponent,
    KnowMoreAboutServicesComponent,
    ReportAnotherIssueComponent,
    NotHappyServiceExperienceComponent,
    NotReceivedRefundComponent,
    ModifyThisBookingsComponent,
    PreferredProfessionalNotVisibleComponent,
    PreferredSlotsNotAvailbleComponent,
    ProfessionalNotAssignedComponent,
    OtherPaymentRelatedIssueComponent,
    PaymentsRefundsComponent,
    AboutUsComponent,
    ContactUsComponent,
    IncorrectRefundComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    NumbersOnlyDirective,
    BlogComponent,
    BlogDetailComponent,
    NearMeComponent
    ],
    
    
  
  imports: [
    BrowserModule,
        CommonModule,
        SweetAlert2Module,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        GooglePlaceModule,
        SwiperModule,
        AutocompleteLibModule,
        CarouselModule,
        NgOtpInputModule,
        NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...', }),
   
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBCOG6E5SOknPmpX-CvDMHYt7h4HoNPDFg',
          libraries: ['places']
        }),
        SharedModule,
       
    ImagekitioAngularModule.forRoot({
      publicKey: ImagekitPublicKey, // or environment.publicKey
      urlEndpoint:ImagekitUrlEndpoint, // or environment.urlEndpoint
      authenticationEndpoint:ImagekitAuthenticationEndpoint// or environment.authenticationEndpoint
  }),
  ],
  
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  
 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
bootstrap: [AppComponent],

})
export class AppModule { }
