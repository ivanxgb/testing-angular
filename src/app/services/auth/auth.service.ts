import { Injectable } from '@angular/core';
import {environment} from "../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {AuthInterface} from "../../response-interfaces/authInterface";
import {Observable} from "rxjs";
import {AuthBodyInterface} from "../../response-interfaces/AuthBody.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host = environment.urlApi;
  constructor(private httpClient: HttpClient) { }

  login(body: AuthBodyInterface): Observable<AuthInterface> {
    return this.httpClient.post<AuthInterface>(`${this.host}login`, body);
  }

  register(body: AuthBodyInterface): Observable<AuthInterface> {
    return this.httpClient.post<AuthInterface>(`${this.host}register`, body);
  }
}
