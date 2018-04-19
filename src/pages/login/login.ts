import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,TextInput } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { AlertsProvider,TITULOS,TIPOS } from '../../providers/alerts/alerts';
//import str2rstr_utf8 from '../../md5';
import md5 from '../../md5';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private trxs:BackendProvider,private alerts:AlertsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loggin(txtusuario:TextInput,txtPass:TextInput)
  {
    let dat:object={"email":txtusuario.value,"usuario":null,"password":md5(txtPass.value),"hash":false};
    this.trxs.TrxLogin(dat,dato=>{
      console.log(dato);
      if(dato.estado=="ok")
      {
        this.alerts.presentarAlerta(TITULOS.sistema,"Bienvenido al sistema",TIPOS.ok);
      }
      else
      {
        this.alerts.presentarAlerta(TITULOS.sistema,"Se ha presentado un problema\n"+dato.mensaje ,TIPOS.advertencia);
      }
    });
  }
}
