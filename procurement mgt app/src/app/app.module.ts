import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { Properties } from '../shared/properties';
import { ItemServiceProvider } from '../providers/item-service/item-service';

import { PurchaseRequestPage } from '../pages/purchase-request/purchase-request';
import { PurchaseRequestProceedPage } from '../pages/purchase-request-proceed/purchase-request-proceed';
import { PurchaseRequestServiceProvider } from '../providers/purchase-request-service/purchase-request-service';
import { ViewPurchaseRequestsPage } from '../pages/view-purchase-requests/view-purchase-requests';
import { ViewOrdersPage } from '../pages/view-orders/view-orders';
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { CreateGrnPage } from '../pages/create-grn/create-grn';
import { GrnServiceProvider } from '../providers/grn-service/grn-service';
import { ViewRequestDetailsPage } from '../pages/view-request-details/view-request-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PurchaseRequestPage,
    PurchaseRequestProceedPage,
    ViewPurchaseRequestsPage,
    ViewOrdersPage,
    CreateGrnPage,
    ViewRequestDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PurchaseRequestPage,
    PurchaseRequestProceedPage,
    ViewPurchaseRequestsPage,
    ViewOrdersPage,
    CreateGrnPage,
    ViewRequestDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageServiceProvider,
    AuthServiceProvider,
    HttpClientModule,
    HttpClient,
    Properties,
    ItemServiceProvider,
    PurchaseRequestServiceProvider,
    OrderServiceProvider,
    GrnServiceProvider
  ]
})
export class AppModule {}
