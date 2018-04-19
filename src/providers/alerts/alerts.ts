import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TIPOS } from '../../assets/catalogos/imagenesdesktop';
export { TITULOS }  from '../../assets/catalogos/imagenesdesktop';
export { TIPOS }  from '../../assets/catalogos/imagenesdesktop';
@Injectable()
export class AlertsProvider {

  constructor(private alertCtrl: AlertController) {
  }
  presentarAlerta(titulo:string,msg:string,tipo:string){
    let cssClass="";
    switch(tipo){
      case TIPOS.error:
        cssClass="alertDanger";
        break;
      case TIPOS.advertencia:
        cssClass="alertWarning";
        break;
      case TIPOS.ok:
        cssClass="alertOk";
        break;
      default:
        cssClass="alert";
        break;
    }
    let alert = this.alertCtrl.create({
       title: titulo,
       subTitle: msg,
       cssClass: cssClass,
       buttons: [{
        text: 'Aceptar',
        role: 'Dismiss',
        cssClass: cssClass+"Btn",
      }]
    });
    alert.present();
  }

}
