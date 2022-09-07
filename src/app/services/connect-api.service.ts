import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtResponse } from '../models/jtw-response';
import { tap } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ConnectAPIService {

  AUTH_SERVER: string = '';
  authSubject = new BehaviorSubject(false);
  private token: string | undefined;
  constructor(private httpClient: HttpClient) { }

  login(user: UsuarioModel): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/login`, user).pipe(tap((res: JwtResponseI) => {
      if (res) {
        this.saveToken(res.dataUser.accessToken, res.dataUser.expireTime)
      }
    }));
  }

  private saveToken(token: string, expireTime: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expireTime);
    this.token = token;
  }
}
