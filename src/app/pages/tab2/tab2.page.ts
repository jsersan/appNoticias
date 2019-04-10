import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

 constructor( private noticiasService: NoticiasService) {

 }

  ngOnInit() {
    this.segment.value = this.categorias[0]; // Por defecto el primer valor del array
    this.cargarNoticias( this.segment.value);
  }

  cambioCategoria( event) {
    this.noticias = []; // Cuando cambio limpio para luego cargar de nuevo
    console.log(event.detail.value);
    this.cargarNoticias( event.detail.value);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
      .subscribe( resp => {
        console.log(resp);
        this.noticias.push( ...resp.articles ); // Insertamos cada uno de los elementos de forma independientes

        if ( event ) {
          event.target.complete();
        }

      });
  }

  loadData ($event) {
    this.cargarNoticias(this.segment.value, event);
  }

}
