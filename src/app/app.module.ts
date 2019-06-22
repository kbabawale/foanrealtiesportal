import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AuthGuard } from './_guards/auth.guard';
import { AppComponent } from './app.component';
import { routing } from './app-routing.module';

// import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './landing/login.component';
import { RegisterComponent } from './landing/register.component';
// import { CustomerDashboardComponent } from './customers/customerDashboard.component';
// import { CustomerTopBarComponent } from './customers/shared/customerTopBar.component';
// import { CustomerMobileMenuComponent } from './customers/shared/customerMobileMenu.component';
// import { CustomerMainMenuComponent } from './customers/shared/customerMainMenu.component';
// import { CustomerInvoiceComponent } from './customers/customerInvoice.component';
// import { CustomerSingleInvoiceComponent } from './customers/customerSingleInvoice.component';
// import { CustomerAllLandComponent } from './customers/customerAllLand.component';
// import { CustomerSingleLandPropertyComponent } from './customers/customerSingleLandProperty.component';
// import { CustomerMyLandsComponent } from './customers/customerMyLands.component';
// import { CustomerSettingsComponent } from './customers/customerSettings.component';
// import { CustomerSubscriptionFormComponent } from './customers/customerSubscriptionForm.component';
// import { AdminSalesPerformanceComponent } from './admin/adminSalesPerformance.component';
// import { CustomerAgreementComponent } from './customers/customerAgreement.component';
import { AdminMainMenuComponent } from './admin/shared/adminMainMenu.component';
import { AdminMobileMenuComponent } from './admin/shared/adminMobileMenu.component';
import { AdminTopBarComponent } from './admin/shared/adminTopBar.component';
import { AdminDashboardComponent } from './admin/adminDashboard.component';
// import { AdminInvoiceComponent } from './admin/adminInvoice.component';
// import { AdminSingleInvoiceComponent } from './admin/adminSingleInvoice.component';
import { AdminAgreementComponent } from './admin/adminAgreement.component';
import { AdminAllLandComponent } from './admin/adminAllLand.component';
import { AddPropertyComponent } from './admin/addProperty.component';
// import { AdminPropertySalesPerformanceComponent } from './admin/adminPropertySalesPerformance.component';
// import { AdminSettingsComponent } from './admin/adminSettings.component';
// import { AdminViewAllCustomerComponent } from './admin/adminViewAllCustomer.component';
// import { AdminViewAllRealtorComponent } from './admin/adminViewAllRealtor.component';
import { AdminSingleLandPropertyComponent } from './admin/adminSingleLandProperty.component';
// import { AdminViewAllRentalComponent } from './admin/adminViewAllRental.component';
// import { AdminViewAllDownlineComponent } from './admin/adminViewAllDownline.component';
// import { AdminCustomerSinglePageComponent } from './admin/adminCustomerSinglePage.component';
// import { AdminViewAllPurchaseComponent } from './admin/adminViewAllPurchase.component';
// import { AdminReceiptComponent } from './admin/adminReceipt.component';
// import { RealtorDashboardComponent } from './realtors/realtorDashboard.component';
// import { RealtorMainMenuComponent } from './realtors/shared/realtorMainMenu.component';
// import { RealtorMobileMenuComponent } from './realtors/shared/realtorMobileMenu.component';
// import { RealtorTopBarComponent } from './realtors/shared/realtorTopBar.component';
// import { RealtorInvoiceComponent } from './realtors/realtorInvoice.component';
// import { RealtorAgreementComponent } from './realtors/realtorAgreement.component';
// import { RealtorSettingsComponent } from './realtors/realtorSettings.component';
// import { RealtorReceiptComponent } from './realtors/realtorReceipt.component';

// import { ToastrModule } from 'ngx-toastr';
// import { AdminViewAllComissionsComponent } from './admin/adminViewAllComissions.component';
// import { RealtorAllLandsComponent } from './realtors/realtorAllLands.component';
// import { RealtorSingleLandComponent } from './realtors/realtorSingleLand.component';
// import { RealtorViewSavedLandComponent } from './realtors/realtorViewSavedLand.componnt';
// import { RealtorSingleInvoiceComponent } from './realtors/realtorSingleInvoice.component';
// import { RealtorViewInspectionListComponent } from './realtors/realtorViewInspectionList.component';
// import { RealtorCustomerSinglePageComponent } from './realtors/realtorCustomerSinglePage.component';
// import { RealtorViewDownlineComponent } from './realtors/realtorViewDownline.component';
// import { RealtorProfilePageComponent } from './realtors/realtorProfilePage.component';
// import { AdminRealtorSinglePageComponent } from './admin/adminRealtorSinglePage.component';
// import { CustomerMyPropertyComponent } from './customers/customerMyProperty.component';
// import { RealtorPurchaseFormComponent } from './realtors/realtorPurchaseForm.component';
// import { RealtorSubscriptionFormComponent } from './realtors/realtorSubscriptionForm.component';
// import { AdminElectronicIdCardComponent } from './admin/adminElectronicIdCard.component';
// import { CustomerProfilePageComponent } from './customers/customerProfilePage.component';
// import { InvoiceComponent } from './shared/invoices/invoice.component';
// import { RealtorCommissionComponent } from './realtors/realtorCommission.component';
// import { CustomerPaymentHistoryComponent } from './customers/customerPaymentHistory.component';
// import { CustomerViewAllRealtorsComponent } from './customers/customerViewAllRealtors.component';
// import { CustomerRealtorSinglePageComponent } from './customers/customerRealtorSinglePage.component';


// Fusion Chart //
import { FusionChartsModule } from 'angular-fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionCharts from 'fusioncharts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeSeries';
import { ProgressComponent } from './admin/progress/progress.component';
import { PropertyimageComponent } from './admin/propertyimage/propertyimage.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, TimeSeries);

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        routing
        
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,

        // CustomerDashboardComponent,
        // CustomerTopBarComponent,
        // CustomerMobileMenuComponent,
        // CustomerMainMenuComponent,
        // CustomerInvoiceComponent,
        // CustomerSingleInvoiceComponent,
        // CustomerAllLandComponent,
        // CustomerSingleLandPropertyComponent,
        // CustomerMyLandsComponent,
        // CustomerSettingsComponent,
        // CustomerSubscriptionFormComponent,
        // CustomerAgreementComponent,
        // CustomerMyPropertyComponent,
        // CustomerProfilePageComponent,
        // CustomerPaymentHistoryComponent,
        // CustomerViewAllRealtorsComponent,
        // CustomerRealtorSinglePageComponent,
    
    
        
        AdminMainMenuComponent,
        AdminMobileMenuComponent,
        AdminTopBarComponent,
        AdminDashboardComponent,
        // AdminInvoiceComponent,
        // AdminSingleInvoiceComponent,
        AdminAgreementComponent,
        AdminAllLandComponent,
        AddPropertyComponent,
        ProgressComponent,
        PropertyimageComponent,
        // AdminPropertySalesPerformanceComponent,
        // AdminSettingsComponent,
        // AdminViewAllCustomerComponent,
        // AdminViewAllRealtorComponent,
        AdminSingleLandPropertyComponent,
        // AdminViewAllRentalComponent,
        // AdminViewAllDownlineComponent,
        // AdminCustomerSinglePageComponent,
        // AdminViewAllPurchaseComponent,
        // AdminReceiptComponent,
        // AdminRealtorSinglePageComponent,
        // AdminViewAllComissionsComponent,
        // AdminElectronicIdCardComponent,
        // AdminSalesPerformanceComponent,
    
    
    
        // RealtorDashboardComponent,
        // RealtorMainMenuComponent,
        // RealtorMobileMenuComponent,
        // RealtorTopBarComponent,
        // RealtorAllLandsComponent,
        // RealtorInvoiceComponent,
        // RealtorAgreementComponent,
        // RealtorSettingsComponent,
        // RealtorReceiptComponent,
        // RealtorSingleLandComponent,
        // RealtorViewSavedLandComponent,
        // RealtorSingleInvoiceComponent,
        // RealtorViewInspectionListComponent,
        // RealtorCustomerSinglePageComponent,
        // RealtorViewDownlineComponent,
        // RealtorProfilePageComponent,
        // RealtorPurchaseFormComponent,
        // RealtorSubscriptionFormComponent,
        // RealtorCommissionComponent,

        // InvoiceComponent
    ],
    providers: [
        AuthGuard
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }