import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { TabsPage } from '../index.pages';
/**
 * Generated class for the AcercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acerca',
  templateUrl: 'acerca.html',
})
export class AcercaPage {
  esRoot:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App) {
    if(!this.navCtrl.parent)
      this.esRoot=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcercaPage');
  }
  volver()
  {
    console.log(this.navCtrl);
    if(!this.esRoot)
      this.navCtrl.parent.select(0);
  }
}
