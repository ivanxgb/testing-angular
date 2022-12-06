import { Injectable } from '@angular/core';
import {environment} from "../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {AuthInterface} from "../../response-interfaces/authInterface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host = environment.urlApi;
  constructor(private httpClient: HttpClient) { }

  login(email: string | null = null, password: string | null = null): Observable<AuthInterface> {
    return this.httpClient.post<AuthInterface>(`${this.host}login`, {
      email,
      password
    });
  }

  register(email: string | null = null, password: string | null = null): Observable<AuthInterface> {
    return this.httpClient.post<AuthInterface>(`${this.host}register`, {
      email,
      password
    });
  }
}
