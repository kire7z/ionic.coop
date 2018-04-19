import { Component } from '@angular/core';
import { NavController,Slides,MenuController } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { PRESENTACION }   from '../../assets/catalogos/imagenesdesktop';
import { Presentacion }   from '../../Interfaces/presentacion.int';

import { LoginPage } from '../index.pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  presentacion:Presentacion[]=[];
  esLogin:boolean=false;
  login:any= LoginPage;

  constructor(public navCtrl: NavController,public menuCtrl: MenuController) {
    this.presentacion = PRESENTACION.slice(0);
  }
  //(ionSlideDidChange)="slideChanged()"
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log(this.slides);
    if(currentIndex==0){
      this.slides.stopAutoplay();
    }
  }
  goToSlide() {
    //this.slides.slideTo(0, 1);
    console.log("hello");
    if(this.slides)
      this.slides.slideTo(1, 2);
  }
  logout()
  {
    this.esLogin=false;
  }
  mostrarMenu()
  {
    this.menuCtrl.toggle();
  }
}
