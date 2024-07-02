import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  endpointBaseUrl = `https://www.swapi.tech/api`;
  constructor(private http: HttpClient) {}

  getBaseEP(): Observable<unknown> {
    return this.http.get(this.endpointBaseUrl);
  }
}
