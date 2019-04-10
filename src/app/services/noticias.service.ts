import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interface';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) {}

  private ejecutarQuery<T>( query: string ) {

    query = apiUrl + query;
    return this.http.get<T>(query, { headers } );

  }

    getTopHeadlines() {

      this.headlinesPage++;

      return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);

      // tslint:disable-next-line:max-line-length
      // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=460d5892752a4e4e959868537e731b62`);
    }

    getTopHeadlinesCategoria( categoria: string ) {

      if ( this.categoriaActual === categoria ) {
        this.categoriaPage++;
      } else {
        this.categoriaPage = 1;
        this.categoriaActual = categoria;
      }

      return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${this.categoriaPage}`);

      // return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=460d5892752a4e4e959868537e731b62`);
    }
}
