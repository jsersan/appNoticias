import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interface';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController) {

    this.cargarFavoritos();

  }

  async presentToast(message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia( noticia: Article) {

    // Las noticias no tienen un id para que no nos guarde dos veces la misma noticia:
    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ) {
      console.log('Guardando noticia');
      this.noticias.unshift( noticia ); // Lo pone al principio del arreglo.
      this.storage.set('favoritos', this.noticias ); // Guardar en el Storage
      this.presentToast('Agregado a favorito');

    } else {
      console.log('Noticia duplicada');
    }

  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get('favoritos');

    if ( favoritos ){
      this.noticias = favoritos;
    }

    // En este punto tenemos todas las noticias cargadas

  }

  borrarNoticia( noticia: Article ) {

    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );

    this.storage.set('favoritos', this.noticias);
    this.presentToast('Eliminado de favorito');
    // actualizar ya filtrada la noticia
    
    // Me pide una condición que es que la noticia interna debe ser diferente a la noticia que estoy recibiendo
  }
}
