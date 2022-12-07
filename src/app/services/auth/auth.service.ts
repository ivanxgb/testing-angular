import { Injectable } from '@angular/core';
import {environment} from "../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {AuthInterface} from "../../response-interfaces/authInterface";
import {map, Observable} from "rxjs";
import {AuthBodyInterface} from "../../response-interfaces/AuthBody.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host = environment.urlApi;
  constructor(private httpClient: HttpClient) { }

  login(body: AuthBodyInterface): Observable<Boolean> {
    return this.httpClient.post<AuthInterface>(`${this.host}login`, body).pipe(
      map((response: AuthInterface) => {
        if (response.token) {
          this.handleSave(response);
        }
        return !!response.token;
      },
    ));
  }

  register(body: AuthBodyInterface): Observable<Boolean> {
    return this.httpClient.post<AuthInterface>(`${this.host}register`, body).pipe(
      map((response: AuthInterface) => {
        if (response.token) {
          this.handleSave(response);
        }
        return !!response.token;
      },
    ));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  handleSave(response: AuthInterface) {
    this.saveToken(response.token!);
  }
}
