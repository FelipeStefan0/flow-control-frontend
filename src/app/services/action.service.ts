import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Action } from '../models/Action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  http = inject(HttpClient);

  private endpoints = {
    root: () => `/actions`
  }

  constructor() { }

  public listAll(): Observable<any> {
    return this.http.get<any>(`${environment.server}${this.endpoints.root()}`);
  }

  public create(params: any): Observable<any> {
    return this.http.post(`${environment.server}${this.endpoints.root()}`, params)
  }

  public delete(id: number) {
    return this.http.delete<any>(`${environment.server}${this.endpoints.root()}?id=${id}`)
  } 

  public edit(params: Action): Observable<any> {
    return this.http.put(`${environment.server}${this.endpoints.root()}`, params)
  }
}
