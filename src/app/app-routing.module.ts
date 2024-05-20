import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './component/booking/booking.component';
import { LocationComponent } from './component/booking/location/location.component';
import { CategoryComponent } from './component/booking/category/category.component';
import { ViewCartComponent } from './component/booking/view-cart/view-cart.component';
import { SubCategoryComponent } from './component/booking/sub-category/sub-category.component';
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
import { ProfileComponent } from './component/booking/profile/profile.component';
import { RetailComponent } from './component/booking/retail/retail.component';
import { BookingRescheduleComponent } from './component/booking/booking-reschedule/booking-reschedule.component';
import { BookingConfirmedComponent } from './component/booking/booking-confirmed/booking-confirmed.component';
import { BookingCancelledComponent } from './component/booking/booking-cancelled/booking-cancelled.component';
import { BookingFailedComponent } from './component/booking/booking-failed/booking-failed.component';
import { CardOrderComponent } from './component/booking/card-order/card-order.component';
import { HomeSalonRetailComponent } from './component/booking/home-salon-retail/home-salon-retail.component';
import { SelectStaffComponent } from './component/booking/select-staff/select-staff.component';
import { ExpertConsultationComponent } from './component/booking/expert-consultation/expert-consultation.component';
import { HelpComponent } from './component/booking/help/help.component';
import { HomeComponent } from './component/mirror/home/home.component';
import { AboutUsComponent } from './component/mirror/about-us/about-us.component';
import { ContactUsComponent } from './component/mirror/contact-us/contact-us.component';
import { AccountMenuComponent } from './component/mirror/account-menu/account-menu.component';
import { SettingComponent } from './component/mirror/setting/setting.component';
import { ReferAndEarnComponent } from './component/mirror/refer-and-earn/refer-and-earn.component';
import { CheckProfessionalVaccinatedComponent } from './component/mirror/check-professional-vaccinated/check-professional-vaccinated.component';
import { SavedPaymentDetailsComponent } from './component/mirror/saved-payment-details/saved-payment-details.component';
import { HowDoesReferralWorkComponent } from './component/mirror/how-does-referral-work/how-does-referral-work.component';
import { UseMirrorsCreditsComponent } from './component/mirror/use-mirrors-credits/use-mirrors-credits.component';
import { MirrorWalletComponent } from './component/mirror/mirror-wallet/mirror-wallet.component';
import { CheckWalletBalanceComponent } from './component/mirror/check-wallet-balance/check-wallet-balance.component';
import { CancellationFeeComponent } from './component/mirror/cancellation-fee/cancellation-fee.component';
import { MinimumOrderComponent } from './component/mirror/minimum-order/minimum-order.component';
import { CanIRebookTheSameProfessionalComponent } from './component/mirror/can-i-rebook-the-same-professional/can-i-rebook-the-same-professional.component';
import { HowToPlaceBookingComponent } from './component/mirror/how-to-place-booking/how-to-place-booking.component';
import { WhatIsMirrorsComponent } from './component/mirror/what-is-mirrors/what-is-mirrors.component';
import { PreferredProfessionalComponent } from './component/mirror/preferred-professional/preferred-professional.component';
import { MirrorsMembershipComponent } from './component/mirror/mirrors-membership/mirrors-membership.component';
import { GettingStartedWithMirrorsComponent } from './component/mirror/getting-started-with-mirrors/getting-started-with-mirrors.component';
import { HelpcenterComponent } from './component/mirror/helpcenter/helpcenter.component';
import { BookingsComponent } from './component/mirror/bookings/bookings.component';
import { AccountComponent } from './component/mirror/account/account.component';
import { ChangePhoneComponent } from './component/mirror/change-phone/change-phone.component';
import { CheckSaveAddressComponent } from './component/mirror/check-save-address/check-save-address.component';
import { ChangeEmailComponent } from './component/mirror/change-email/change-email.component';
import { SeePaymentDetailsComponent } from './component/mirror/see-payment-details/see-payment-details.component';
import { PaymentCreditsComponent } from './component/mirror/payment-credits/payment-credits.component';
import { PaymentsRefundsComponent } from './component/mirror/payments-refunds/payments-refunds.component';
import { OtherPaymentRelatedIssueComponent } from './component/mirror/other-payment-related-issue/other-payment-related-issue.component';
import { AddRemoveServiceBookingComponent } from './component/mirror/add-remove-service-booking/add-remove-service-booking.component';
import { AssignMePreferredProfessionalComponent } from './component/mirror/assign-me-preferred-professional/assign-me-preferred-professional.component';
import { CardListComponent } from './component/mirror/card-list/card-list.component';
import { ChangeAddressPhoneComponent } from './component/mirror/change-address-phone/change-address-phone.component';
import { ContactTheProfessionalComponent } from './component/mirror/contact-the-professional/contact-the-professional.component';
import { CovidSafetyComponent } from './component/mirror/covid-safety/covid-safety.component';
import { DidntGetTheCashbackComponent } from './component/mirror/didnt-get-the-cashback/didnt-get-the-cashback.component';
import { IncorrectRefundComponent } from './component/mirror/incorrect-refund/incorrect-refund.component';
import { KnowMoreAboutServicesComponent } from './component/mirror/know-more-about-services/know-more-about-services.component';
import { MakePaymentBookingComponent } from './component/mirror/make-payment-booking/make-payment-booking.component';
import { MirrorsSafetyComponent } from './component/mirror/mirrors-safety/mirrors-safety.component';
import { ModifyThisBookingsComponent } from './component/mirror/modify-this-bookings/modify-this-bookings.component';
import { NotHappyServiceExperienceComponent } from './component/mirror/not-happy-service-experience/not-happy-service-experience.component';
import { NotReceivedRefundComponent } from './component/mirror/not-received-refund/not-received-refund.component';
import { NotReceivedRewardReferralComponent } from './component/mirror/not-received-reward-referral/not-received-reward-referral.component';
import { PreferredProfessionalNotVisibleComponent } from './component/mirror/preferred-professional-not-visible/preferred-professional-not-visible.component';
import { PreferredSlotsNotAvailbleComponent } from './component/mirror/preferred-slots-not-availble/preferred-slots-not-availble.component';
import { PriceingIssueComponent } from './component/mirror/priceing-issue/priceing-issue.component';
import { ProfessionalNotAssignedComponent } from './component/mirror/professional-not-assigned/professional-not-assigned.component';
import { ReportAnotherIssueComponent } from './component/mirror/report-another-issue/report-another-issue.component';
import { UnableMakePaymentComponent } from './component/mirror/unable-make-payment/unable-make-payment.component';
import { ValidityRewardsComponent } from './component/mirror/validity-rewards/validity-rewards.component';
import { LocationStrategy } from '@angular/common';
import { BlogComponent } from './component/blog/blog/blog.component';
import { BlogDetailComponent } from './component/blog/blog-detail/blog-detail.component';
import { NearMeComponent } from './near-me/near-me/near-me.component';

const routes: Routes = [
  // {
  //   path: 'booking',
  //   component: BookingComponent,
  //   children: [
  // {path: '', loadChildren: () => import('./component/booking/booking.module').then(m => m.BookingModule)}
  //   ]
  // },
  // {
  //   path: '',
  //   component: BookingComponent,
  //   children: [
  // {path: '', loadChildren: () => import('./component/mirror/mirror.module').then(m => m.MirrorModule)}
  //   ]
  // },
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

  { path: '', component: HomeComponent, pathMatch: 'full' },
  {path:'home-service',component:HomeComponent},
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
{path:'payments-refunds',component:PaymentsRefundsComponent},
{path:'blog',component:BlogComponent},
{path:'blog-detail',component:BlogDetailComponent},
{path:'blog-detail/:slug',component:BlogDetailComponent},
{path:'near-me',component:NearMeComponent},
{ path: '', redirectTo: '', pathMatch: 'full' },
{ path: "**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', useHash: false,})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
