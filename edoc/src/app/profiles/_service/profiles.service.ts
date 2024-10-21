import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfilesService {
  profilePath;
  updateDetail = new BehaviorSubject<any>(false);

  constructor(
    private httpObj: HttpClient
  ) { }
  getProfileDetails(): Observable<any> {
    // const userId = localStorage.getItem('userId');
    return this.httpObj.get(`${environment.lucyApiUrl}/user/getUserDetails`, this.httpOptionsBearer());
  }

  uploadProfilePhoto(file: File): Observable<any> {
    const userId = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpObj.post(`${environment.lucyApiUrl}/user/uploadProfile/${userId}`, formData, this.httpOptionsAttachment());
  }
  


  updateProfileData(data: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    const body = {
      firstname: data.firstname,
      lastname: data.lastname,
      bloodgrp: data.bloodgrp,
      contactnumber: data.contactnumber,
      countrycode: data.countrycode,
      dob: this.convertDate(data.dob),
      gender: data.gender,
      usermail: data.usermail,
      altemail: data.altemail,
      prodClientId: '1'
    };
    return this.httpObj.put(`${environment.lucyApiUrl}/user/updateUserData/${userId}`, body);
  }

  convertDate(date) {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
  }

  httpOptionsImage() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };
  }

  httpOptionsBearer() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
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


}



