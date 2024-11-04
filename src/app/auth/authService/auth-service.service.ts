import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterLogin, } from '../interface/interface'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private miUrl = 'https://bolt-backend-chi.vercel.app'; 

  constructor(private http: HttpClient) {}

  login(credentials: InterLogin): Observable<any> {
    return this.http.post(`${this.miUrl}/api/auth/login`, credentials);
  }


}