import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './landing/login.component';
import { RegisterComponent } from './landing/register.component';
import { AuthGuard } from './_guards/auth.guard';
// import { CustomerDashboardComponent } from './customers/customerDashboard.component';
// import { CustomerInvoiceComponent } from './customers/customerInvoice.component';
// import { CustomerSingleInvoiceComponent } from './customers/customerSingleInvoice.component';
// import { CustomerAllLandComponent } from './customers/customerAllLand.component';
// import { CustomerSingleLandPropertyComponent } from './customers/customerSingleLandProperty.component';
// import { CustomerMyLandsComponent } from './customers/customerMyLands.component';
// import { CustomerAgreementComponent } from './customers/customerAgreement.component';
// import { AdminSalesPerformanceComponent } from './admin/adminSalesPerformance.component';
// import { CustomerSettingsComponent } from './customers/customerSettings.component';
import { AdminDashboardComponent } from './admin/adminDashboard.component';
import { AdminInvoiceComponent } from './admin/adminInvoice.component';
import { AdminSingleInvoiceComponent } from './admin/adminSingleInvoice.component';
import { AdminSingleReceiptComponent } from './admin/adminSingleReceipt.component';
import { AdminAgreementComponent } from './admin/adminAgreement.component';
import { AdminAllLandComponent } from './admin/adminAllLand.component';
// import { AdminPropertySalesPerformanceComponent } from './admin/adminPropertySalesPerformance.component';
import { AdminSettingsComponent } from './admin/adminSettings.component';
import { AdminViewAllCustomerComponent } from './admin/adminViewAllCustomer.component';
import { AdminViewAllRealtorComponent } from './admin/adminViewAllRealtor.component';
import { AdminCustomerSinglePageComponent } from './admin/adminCustomerSinglePage.component';
import { AdminViewAllPurchaseComponent } from './admin/adminViewAllPurchase.component';
import { AdminReceiptComponent } from './admin/adminReceipt.component';
// import { RealtorDashboardComponent } from './realtors/realtorDashboard.component';
// import { RealtorInvoiceComponent } from './realtors/realtorInvoice.component';
// import { RealtorAgreementComponent } from './realtors/realtorAgreement.component';
// import { RealtorReceiptComponent } from './realtors/realtorReceipt.component';
import { AdminSingleLandPropertyComponent } from './admin/adminSingleLandProperty.component';
import { AdminViewAllComissionsComponent } from './admin/adminViewAllComissions.component';
// import { RealtorAllLandsComponent } from './realtors/realtorAllLands.component';
// import { RealtorSingleLandComponent } from './realtors/realtorSingleLand.component';
// import { RealtorViewSavedLandComponent } from './realtors/realtorViewSavedLand.componnt';
// import { RealtorSingleInvoiceComponent } from './realtors/realtorSingleInvoice.component';
// import { RealtorViewInspectionListComponent } from './realtors/realtorViewInspectionList.component';
// import { RealtorCustomerSinglePageComponent } from './realtors/realtorCustomerSinglePage.component';
// import { RealtorViewDownlineComponent } from './realtors/realtorViewDownline.component';
// import { RealtorProfilePageComponent } from './realtors/realtorProfilePage.component';
// import { RealtorSettingsComponent } from './realtors/realtorSettings.component';
import { AddPropertyComponent } from './admin/addProperty.component';
import { AdminRealtorSinglePageComponent } from './admin/adminRealtorSinglePage.component';
// import { CustomerSubscriptionFormComponent } from './customers/customerSubscriptionForm.component';
// import { CustomerMyPropertyComponent } from './customers/customerMyProperty.component';
// import { RealtorPurchaseFormComponent } from './realtors/realtorPurchaseForm.component';
// import { RealtorSubscriptionFormComponent } from './realtors/realtorSubscriptionForm.component';
// import { AdminElectronicIdCardComponent } from './admin/adminElectronicIdCard.component';
// import { CustomerProfilePageComponent } from './customers/customerProfilePage.component';
// import { RealtorCommissionComponent } from './realtors/realtorCommission.component';
// import { CustomerPaymentHistoryComponent } from './customers/customerPaymentHistory.component';
// import { CustomerViewAllRealtorsComponent } from './customers/customerViewAllRealtors.component';
// import { CustomerRealtorSinglePageComponent } from './customers/customerRealtorSinglePage.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'  },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
  
  
    // Customer Routes
    //  { path: 'customerdashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard] },
    // { path: 'customerinvoice', component: CustomerInvoiceComponent, canActivate: [AuthGuard] },
    // { path: 'customersingleinvoice', component: CustomerSingleInvoiceComponent, canActivate: [AuthGuard] },
    // { path: 'customerallland', component: CustomerAllLandComponent, canActivate: [AuthGuard] },
    // { path: 'customersinglelandproperty', component: CustomerSingleLandPropertyComponent, canActivate: [AuthGuard] },
    // { path: 'customermylands', component: CustomerMyLandsComponent, canActivate: [AuthGuard] },
    // { path: 'customeragreement', component: CustomerAgreementComponent, canActivate: [AuthGuard] },
    // { path: 'customersettings', component: CustomerSettingsComponent, canActivate: [AuthGuard] },
    // { path: 'customerpurchaseform', component: CustomerSubscriptionFormComponent, canActivate: [AuthGuard] },
    // { path: 'customermyproperty', component: CustomerMyPropertyComponent, canActivate: [AuthGuard] },
    // { path: 'customerprofilepage', component: CustomerProfilePageComponent, canActivate: [AuthGuard] },
    // { path: 'customersubscriptionform', component: CustomerSubscriptionFormComponent, canActivate: [AuthGuard] },
    // { path: 'customerpaymenthistory', component: CustomerPaymentHistoryComponent, canActivate: [AuthGuard] },
    // { path: 'customerviewallrealtors', component: CustomerViewAllRealtorsComponent, canActivate: [AuthGuard] },
    // { path: 'customerrealtorsinglepage', component: CustomerRealtorSinglePageComponent, canActivate: [AuthGuard] },

    // // Admin Route
    { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'admininvoice', component: AdminInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'adminsingleinvoice/:invid', component: AdminSingleInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'adminsinglereceipt/:reid', component: AdminSingleReceiptComponent, canActivate: [AuthGuard] },
    { path: 'adminagreement', component: AdminAgreementComponent, canActivate: [AuthGuard] },
    { path: 'adminallland', component: AdminAllLandComponent, canActivate: [AuthGuard] },
    { path: 'addproperty', component: AddPropertyComponent, canActivate: [AuthGuard] },
    // { path: 'adminpropertysalesperformance', component: AdminPropertySalesPerformanceComponent, canActivate: [AuthGuard] },
    { path: 'adminsettings', component: AdminSettingsComponent, canActivate: [AuthGuard] },
    { path: 'adminallcustomers', component: AdminViewAllCustomerComponent, canActivate: [AuthGuard] },
    { path: 'adminrealtorsinglepage/:rid', component: AdminRealtorSinglePageComponent, pathMatch:'full', canActivate: [AuthGuard] },
    { path: 'adminallrealtors', component: AdminViewAllRealtorComponent, canActivate: [AuthGuard] },
    { path: 'admincustomersinglepage/:cid', component: AdminCustomerSinglePageComponent, pathMatch:'full', canActivate: [AuthGuard] },
    { path: 'adminviewallpurchase', component: AdminViewAllPurchaseComponent, canActivate: [AuthGuard] },
    { path: 'adminreceipt', component: AdminReceiptComponent, canActivate: [AuthGuard] },
    { path: 'adminsinglelandproperty/:pid', component: AdminSingleLandPropertyComponent, pathMatch:'full', canActivate: [AuthGuard] },
    { path: 'adminviewallcomissions', component: AdminViewAllComissionsComponent, canActivate: [AuthGuard] },
    // { path: 'adminelectronicidcard', component: AdminElectronicIdCardComponent, canActivate: [AuthGuard] },
    // { path: 'adminsalesperformance', component: AdminSalesPerformanceComponent, canActivate: [AuthGuard] },

    // // Realtor Route
    // { path: 'realtordashboard', component: RealtorDashboardComponent, canActivate: [AuthGuard] },
    // { path: 'realtorinvoice',  component: RealtorInvoiceComponent, canActivate: [AuthGuard] },
    // { path: 'realtoragreement', component: RealtorAgreementComponent, canActivate: [AuthGuard] },
    // { path: 'realtorreceipt', component: RealtorReceiptComponent, canActivate: [AuthGuard] },
    // { path: 'realtorallland', component: RealtorAllLandsComponent, canActivate: [AuthGuard] },
    // { path: 'realtorsingleland', component: RealtorSingleLandComponent, canActivate: [AuthGuard] },
    // { path: 'realtorviewsavedland', component: RealtorViewSavedLandComponent, canActivate: [AuthGuard] },
    // { path: 'realtorsingleinvoice', component: RealtorSingleInvoiceComponent, canActivate: [AuthGuard] },
    // { path: 'realtorviewinspectionlist', component: RealtorViewInspectionListComponent, canActivate: [AuthGuard] },
    // { path: 'realtorcustomersinglepage', component: RealtorCustomerSinglePageComponent, canActivate: [AuthGuard] },
    // { path: 'realtorviewdownline', component: RealtorViewDownlineComponent, canActivate: [AuthGuard] },
    // { path: 'realtorprofilepage', component: RealtorProfilePageComponent, canActivate: [AuthGuard] },
    // { path: 'realtorsettings', component: RealtorSettingsComponent, canActivate: [AuthGuard] },
    // { path: 'realtorpurchaseform', component: RealtorPurchaseFormComponent, canActivate: [AuthGuard] },
    // { path: 'realtorsubscriptionform', component: RealtorSubscriptionFormComponent, canActivate: [AuthGuard] },
    // { path: 'realtorviewcommission', component: RealtorCommissionComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes,{onSameUrlNavigation:'reload'});