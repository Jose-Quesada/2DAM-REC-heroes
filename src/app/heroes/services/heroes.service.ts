import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Hero } from '../interfaces/heroes.interfaces';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseURL: string = environments.baseURL

  constructor( private httpClient: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseURL}/heroes`)
  }

  getHeroById(id: string):Observable<Hero|undefined>{
    return this.httpClient.get<Hero>(`${ this.baseURL }/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined) )
      )
  }

}
