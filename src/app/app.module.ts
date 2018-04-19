import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage,LoginPage,TabsPage,AcercaPage } from '../pages/index.pages';

import { AlertController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { BackendProvider } from '../providers/backend/backend';
import { MessageProvider } from '../providers/message/message';
import { StorageProvider } from '../providers/storage/storage';
import { AlertsProvider } from '../providers/alerts/alerts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,LoginPage,TabsPage,AcercaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydbBankless',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,LoginPage,TabsPage,AcercaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertController,
    BackendProvider,
    MessageProvider,
    StorageProvider,
    AlertsProvider
  ]
})
export class AppModule {}
