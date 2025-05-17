import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Hero } from '../interfaces/heroes.interfaces';
import { catchError, map, Observable, of } from 'rxjs';

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

  getSuggestions( query: string): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${ this.baseURL }/heroes?q=${query}&_limit=6`);
  }

  addHero( hero: Hero): Observable<Hero>{
    return this.httpClient.post<Hero>(`${ this.baseURL }/heroes`, hero);
  }

  updateHero( hero: Hero ): Observable<Hero>{
    if ( !hero.id ) throw Error ('Hero id is required');
    return this.httpClient.patch<Hero>(`${ this.baseURL }/heroes/${ hero.id }`, hero);
  }

  deleteHeroById( id: string ): Observable<boolean> {

    return this.httpClient.delete(`${ this.baseURL }/heroes/${ id }`)
      .pipe(
        map( resp => true),
        catchError ( err => of(false))
      );
  }



}
