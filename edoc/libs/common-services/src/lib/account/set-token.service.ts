import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetTokenService {

  constructor(
    private http: HttpClient
  ) { }

  setToken(apiUrl, token) {
    return this.http.post(`${apiUrl}/account/insertToken`, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      })
    }).pipe(
      tap(data => {
        localStorage.setItem('userObj', JSON.stringify(data['response']));
        localStorage.setItem('token', data['response'].userObject.token);
        localStorage.setItem('PLId', '7');
      })
    )
  }
}
