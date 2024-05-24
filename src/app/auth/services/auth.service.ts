import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environments } from "../../../environments/environment";
import { User } from "../interfaces/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject( HttpClient );

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor() { }

  get currentUser():User | undefined {
    if ( !this.user ) return undefined;

    return structuredClone( this.user );
  }

  login ( email: string, password: string ): Observable<User> {

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem( 'token', 'asasasafssd.45646547sasa.44456asagj' )),
      );
  }

  checkAuthentication(): Observable<boolean> {

    const token = localStorage.getItem('token' );
    if ( !token ) return of( false );

    return this.http.get<User>( `${ this.baseUrl }/users/1`)
      .pipe(
        tap ( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false) )
      );


  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
