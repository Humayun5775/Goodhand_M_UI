import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { HelpcenterComponent } from './helpcenter/helpcenter.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AccountComponent } from './account/account.component';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { CheckSaveAddressComponent } from './check-save-address/check-save-address.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { SeePaymentDetailsComponent } from './see-payment-details/see-payment-details.component';
import { GettingStartedWithMirrorsComponent } from './getting-started-with-mirrors/getting-started-with-mirrors.component';
import { PaymentCreditsComponent } from './payment-credits/payment-credits.component';
import { MirrorsMembershipComponent } from './mirrors-membership/mirrors-membership.component';
import { MirrorsSafetyComponent } from './mirrors-safety/mirrors-safety.component';
import { WhatIsMirrorsComponent } from './what-is-mirrors/what-is-mirrors.component';
import { HowToPlaceBookingComponent } from './how-to-place-booking/how-to-place-booking.component';
import { CanIRebookTheSameProfessionalComponent } from './can-i-rebook-the-same-professional/can-i-rebook-the-same-professional.component';
import { PreferredProfessionalComponent } from './preferred-professional/preferred-professional.component';
import { MinimumOrderComponent } from './minimum-order/minimum-order.component';
import { CancellationFeeComponent } from './cancellation-fee/cancellation-fee.component';
import { CheckWalletBalanceComponent } from './check-wallet-balance/check-wallet-balance.component';
import { UseMirrorsCreditsComponent } from './use-mirrors-credits/use-mirrors-credits.component';
import { ValidityRewardsComponent } from './validity-rewards/validity-rewards.component';
import { HowDoesReferralWorkComponent } from './how-does-referral-work/how-does-referral-work.component';
import { SavedPaymentDetailsComponent } from './saved-payment-details/saved-payment-details.component';
import { NotReceivedRewardReferralComponent } from './not-received-reward-referral/not-received-reward-referral.component';
import { CovidSafetyComponent } from './covid-safety/covid-safety.component';
import { CheckProfessionalVaccinatedComponent } from './check-professional-vaccinated/check-professional-vaccinated.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MirrorFooterComponent } from '../shared/mirror-footer/mirror-footer.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { BackButtonDirective } from 'src/app/back-button.directive';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MirrorWalletComponent } from './mirror-wallet/mirror-wallet.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReferAndEarnComponent } from './refer-and-earn/refer-and-earn.component';
import { SettingComponent } from './setting/setting.component';
import { CardListComponent } from './card-list/card-list.component';
import { ProfileComponent } from '../booking/profile/profile.component';
import { SwiperModule } from 'swiper/angular';
import { AssignMePreferredProfessionalComponent } from './assign-me-preferred-professional/assign-me-preferred-professional.component';
import { AddRemoveServiceBookingComponent } from './add-remove-service-booking/add-remove-service-booking.component';
import { MakePaymentBookingComponent } from './make-payment-booking/make-payment-booking.component';
import { UnableMakePaymentComponent } from './unable-make-payment/unable-make-payment.component';
import { DidntGetTheCashbackComponent } from './didnt-get-the-cashback/didnt-get-the-cashback.component';
import { PriceingIssueComponent } from './priceing-issue/priceing-issue.component';
import { ChangeAddressPhoneComponent } from './change-address-phone/change-address-phone.component';
import { ContactTheProfessionalComponent } from './contact-the-professional/contact-the-professional.component';
import { KnowMoreAboutServicesComponent } from './know-more-about-services/know-more-about-services.component';
import { ReportAnotherIssueComponent } from './report-another-issue/report-another-issue.component';
import { NotHappyServiceExperienceComponent } from './not-happy-service-experience/not-happy-service-experience.component';
import { NotReceivedRefundComponent } from './not-received-refund/not-received-refund.component';
import { ModifyThisBookingsComponent } from './modify-this-bookings/modify-this-bookings.component';
import { PreferredProfessionalNotVisibleComponent } from './preferred-professional-not-visible/preferred-professional-not-visible.component';
import { PreferredSlotsNotAvailbleComponent } from './preferred-slots-not-availble/preferred-slots-not-availble.component';
import { ProfessionalNotAssignedComponent } from './professional-not-assigned/professional-not-assigned.component';
import { OtherPaymentRelatedIssueComponent } from './other-payment-related-issue/other-payment-related-issue.component';
import { PaymentsRefundsComponent } from './payments-refunds/payments-refunds.component';

import { ImagekitioAngularModule } from 'imagekitio-angular';
import { LoginComponent } from '../shared/login/login.component';
import { BookingModule } from '../booking/booking.module';
import { ImagekitAuthenticationEndpoint, ImagekitPublicKey, ImagekitUrlEndpoint } from 'src/environments/environment';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { IncorrectRefundComponent } from './incorrect-refund/incorrect-refund.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
  //   HomeComponent,
  //   AccountMenuComponent,
  //   HelpcenterComponent,
  //   BookingsComponent,
  //   AccountComponent,
  //   ChangePhoneComponent,
  //   CheckSaveAddressComponent,
  //   ChangeEmailComponent,
  //   SeePaymentDetailsComponent,
  //   GettingStartedWithMirrorsComponent,
  //   PaymentCreditsComponent,
  //   MirrorsMembershipComponent,
  //   MirrorsSafetyComponent,
  //   WhatIsMirrorsComponent,
  //   HowToPlaceBookingComponent,
  //   CanIRebookTheSameProfessionalComponent,
  //   PreferredProfessionalComponent,
  //   MinimumOrderComponent,
  //   CancellationFeeComponent,
  //   CheckWalletBalanceComponent,
  //   UseMirrorsCreditsComponent,
  //   ValidityRewardsComponent,
  //   HowDoesReferralWorkComponent,
  //   NotReceivedRewardReferralComponent,
  //   SavedPaymentDetailsComponent,
  //   CovidSafetyComponent,
  //   CheckProfessionalVaccinatedComponent,
  //   MirrorFooterComponent,
  //   MirrorWalletComponent,
  //   ReferAndEarnComponent,
  //   SettingComponent,
  //   CardListComponent,
  // ProfileComponent,
  // AssignMePreferredProfessionalComponent,
  // AddRemoveServiceBookingComponent,
  // MakePaymentBookingComponent,
  // UnableMakePaymentComponent,
  // DidntGetTheCashbackComponent,
  // PriceingIssueComponent,
  // ChangeAddressPhoneComponent,
  // ContactTheProfessionalComponent,
  // KnowMoreAboutServicesComponent,
  // ReportAnotherIssueComponent,
  // NotHappyServiceExperienceComponent,
  // NotReceivedRefundComponent,
  // ModifyThisBookingsComponent,
  // PreferredProfessionalNotVisibleComponent,
  // PreferredSlotsNotAvailbleComponent,
  // ProfessionalNotAssignedComponent,
  // OtherPaymentRelatedIssueComponent,
  // PaymentsRefundsComponent,
  // AboutUsComponent,
  // ContactUsComponent,
  // IncorrectRefundComponent
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
       
      {path:'', redirectTo: 'home', pathMatch: 'full'},
      {path:'home',component:HomeComponent},
      {path:'home/:category',component:HomeComponent},
      {path:'about-us',component:AboutUsComponent},
      {path:'contact-us',component:ContactUsComponent},
  {path:'account',component:AccountMenuComponent},
  {path:'help',component:HelpcenterComponent},
  {path:'bookings',component:BookingsComponent},
  {path:'accounts',component:AccountComponent},
  {path:'change-phone',component:ChangePhoneComponent},
  {path:'check-save-address',component:CheckSaveAddressComponent},
  {path:'change-email',component:ChangeEmailComponent},
  {path:'see-payment-details',component:SeePaymentDetailsComponent},
  {path:'getting-started-with-mirrors',component:GettingStartedWithMirrorsComponent},
  {path:'payment-credits',component:PaymentCreditsComponent},
  {path:'mirror-membership',component:MirrorsMembershipComponent},
  {path:'mirror-safety',component:MirrorsSafetyComponent},
  {path:'what-is-mirrors',component:WhatIsMirrorsComponent},
  {path:'how-to-place-booking',component:HowToPlaceBookingComponent},
  {path:'rebook-same-professional',component:CanIRebookTheSameProfessionalComponent},
  {path:'preferred-professional',component:PreferredProfessionalComponent},
  {path:'minimum-order',component:MinimumOrderComponent},
  {path:'cancellation-fee',component:CancellationFeeComponent},
  {path:'check-wallet-balance',component:CheckWalletBalanceComponent},
  {path:'mirror-wallet',component:MirrorWalletComponent},
  {path:'use-mirrors-credit',component:UseMirrorsCreditsComponent},
  {path:'validity-rewards',component:ValidityRewardsComponent},
  {path:'how-does-referral-work',component:HowDoesReferralWorkComponent},
  {path:'not-received-reward-referral',component:NotReceivedRewardReferralComponent},
  {path:'saved-payment-details',component:SavedPaymentDetailsComponent},
  {path:'covid-19-safety',component:CovidSafetyComponent},
  {path:'check-professional-vaccine',component:CheckProfessionalVaccinatedComponent},
  {path:'refer-earn',component:ReferAndEarnComponent},
  {path:'setting',component:SettingComponent},
  {path:'card-list',component:CardListComponent},
  {path:'assign-preferred-professional',component:AssignMePreferredProfessionalComponent},
  {path:'add-remove-service-booking',component:AddRemoveServiceBookingComponent},
  {path:'make-payment-booking',component:MakePaymentBookingComponent},
  {path:'unable-make-payment',component:UnableMakePaymentComponent},
  {path:'didnt-get-the-cashback',component:DidntGetTheCashbackComponent},
  {path:'priceing-issue',component:PriceingIssueComponent},
  {path:'change-address-phone',component:ChangeAddressPhoneComponent},
  {path:'contact-the-professional',component:ContactTheProfessionalComponent},
  {path:'know-more-about-services',component:KnowMoreAboutServicesComponent},
  {path:'report-another-issue',component:ReportAnotherIssueComponent},
  {path:'not-happy-service-experience',component:NotHappyServiceExperienceComponent},
  {path:'not-received-refund',component:NotReceivedRefundComponent},
  {path:'incorrect-refund',component:IncorrectRefundComponent},
  {path:'modify-this-bookings',component:ModifyThisBookingsComponent},
  {path:'preferred-professional-not-visible',component:PreferredProfessionalNotVisibleComponent},
  {path:'preferred-slots-not-availble',component:PreferredSlotsNotAvailbleComponent},
  {path:'professional-not-assigned',component:ProfessionalNotAssignedComponent},
  {path:'other-payment-related-issue',component:OtherPaymentRelatedIssueComponent},
  {path:'payments-refunds',component:PaymentsRefundsComponent}
      
  ])
],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
exports: [RouterModule]
})
export class MirrorModule { }
