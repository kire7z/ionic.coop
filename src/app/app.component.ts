import { Component } from '@angular/core';
import { Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage,AcercaPage } from '../pages/index.pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  tabs:any=TabsPage;
  acerca:any=AcercaPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  cargarTab(pagina:any)
  {
    /*if(pagina==AcercaPage){
      this.rootPage=TabsPage;
      console.log(this);
    }
    else*/
      this.rootPage=pagina;
    this.menuCtrl.close();
  }

}
