

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class ResultsFetcherService {
  private baseUrl = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) {}

  fetchPeople(): Observable<Person[]> {
    const url = `${this.baseUrl}/people`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Fetch people response:', response); // Log the response
        return response.results.map((result: any) => ({
          result: {
            uid: result.uid,
            name: result.name,
            url: result.url
          }
        }));
      }),
      catchError(error => {
        console.error('Error fetching people:', error); // Log the error
        return throwError(error);
      })
    );
  }

  fetchPersonDetails(id: string): Observable<Person> {
    const url = `${this.baseUrl}/people/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => ({
        message: 'ok',
        result: {
          ...response.result.properties,
          uid: response.result.uid,
          __v: response.result.__v,
          _id: response.result._id,
          description: response.result.description
        }
      })),
      catchError(error => {
        console.error(`Error fetching person details for ID ${id}:`, error); // Log the error
        return throwError(error);
      })
    );
  }
}

