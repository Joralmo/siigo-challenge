import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http$: HttpClient) {}

  get(url, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http$.get(`${url}`, { params });
  }

  post(url, data, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http$.post(`${url}`, data, { params });
  }

  delete(url, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http$.delete(`${url}`, { params });
  }

  put(url, body, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http$.put(url, body, { params });
  }
}
