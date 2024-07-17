import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  CURRENT_USER = {};
  constructor(
    private http: HttpClient,
    ) { }


  httpOptionsBearer() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      })
    };
  }

  httpOptionsAttachment() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'mimeType': 'multipart/form-data',
        'Authorization': `bearer ${token}`
      })
    };
  }

  httpOptionsImage() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };
  }
}
