import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl = environments.baseURL;
  private user?: User;


  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }


  login ( email: string, password: string): Observable<User> {
    // http.post ('login', {email,password});
    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString()))
      )
  }

  logout () {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticacion(): Observable<boolean>{

    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
            .pipe (
              tap ( user => this.user=user),
              map ( user => !!user),
              catchError ( err => of(false))
            )
  }




}
