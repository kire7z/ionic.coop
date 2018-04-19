import { Injectable } from '@angular/core';
import Rx from 'Rxjs/Rx';
import { DatosArchivo } from '../../Interfaces/datosArchivo.int';

@Injectable()
export class MessageProvider {
  messages:string[]=[];
  public msg$ = new Rx.Subject();


  add(message:string)
  {
    this.messages.push(message);
    this.msg$.next(message);
  }
  clear()
  {
    this.messages = [];
    this.msg$.complete();
    this.msg$ = new Rx.Subject();
  }
  persist()
  {
    console.log(this.messages);
    this.msg$.complete();
    this.msg$ = new Rx.Subject();
  }
  public getMessages():string[]
  {
    return this.messages;
  }
  public descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = reader.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
  }

  //Función de ayuda: "escapa" las entidades XML necesarias
  //para los valores (y atributos) del archivo XML
  public escaparXML(cadena) {
      if (typeof cadena !== 'string') {
          return '';
      };
      cadena = cadena.replace('&', '&amp;')
          .replace('<', '&lt;')
          .replace('>', '&gt;')
          .replace('"', '&quot;');
      return cadena;
  }
  public generarArchivoXml(doc:DatosArchivo)
  {
    this.descargarArchivo(this.generarXml(doc), `${doc.nombre}.xml`);
  }
  public generarArchivoTxt(doc:DatosArchivo)
  {
    this.descargarArchivo(this.generarTexto(doc), `${doc.nombre}.txt`);
  }
  //Genera un objeto Blob con los datos en un archivo TXT
  private generarTexto(datos: DatosArchivo) {
      var texto = [];
      texto.push('Documento ');
      texto.push(datos.nombre.toUpperCase());
      texto.push('\n');
      texto.push(datos.header);
      texto.push('\n');
      texto.push(datos.body);
      texto.push('\n');
      texto.push(datos.footer);
      texto.push('\n');
      texto.push('\n');
      texto.push('Usuario: ');
      texto.push(datos.usuario.toUpperCase());
      texto.push('\n');
      texto.push('Fecha: ');
      texto.push(datos.fecha.toISOString());
      texto.push('\n');
      texto.push('Comentario: ');
      texto.push(datos.comentario);
      texto.push('\n');
      //El contructor de Blob requiere un Array en el primer parámetro
      //así que no es necesario usar toString. el segundo parámetro
      //es el tipo MIME del archivo
      return new Blob(texto, {
          type: 'text/plain'
      });
  }

  //Genera un objeto Blob con los datos en un archivo XML
  private generarXml(datos : DatosArchivo) {
      var texto = [];
      texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
      texto.push('<header>\n');
      texto.push(this.escaparXML(datos.header));
      texto.push('</header>');
      texto.push('<body>\n');
      texto.push(this.escaparXML(datos.body));
      texto.push('</body>');
      texto.push('<footer>\n');
      texto.push(this.escaparXML(datos.footer));
      texto.push('</footer>');

      texto.push('<datos>\n');
      texto.push('\t<nombre>');
      texto.push(this.escaparXML(datos.nombre.toUpperCase()));
      texto.push('</nombre>\n');
      texto.push('\t<usuario>');
      texto.push(this.escaparXML(datos.usuario));
      texto.push('</usuario>\n');
      texto.push('\t<fecha>');
      texto.push(this.escaparXML(datos.fecha.toISOString()));
      texto.push('</fecha>\n');
      texto.push('\t<comentario>');
      texto.push(this.escaparXML(datos.comentario));
      texto.push('</comentario>\n');
      texto.push('</datos>');
      //No olvidemos especificar el tipo MIME correcto :)
      return new Blob(texto, {
          type: 'application/xml'
      });
  };

}
