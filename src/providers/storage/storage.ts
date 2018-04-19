import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Almacen de datos peristentes en el smartphone
*/
@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {

  }
  public consultarDato(key:string,funcion:Function)
  {
    let data=this.storage.get(key);
    data.then((val)=>{      
      funcion(val);
    });
  }
  public guardarDato(key:string,value:object){
      this.storage.set(key, value);
  }
  public borrarDato(key:string){
    this.storage.remove(key);
  }
}
