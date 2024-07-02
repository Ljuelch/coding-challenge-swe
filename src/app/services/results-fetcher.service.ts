import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Person } from '../interfaces/person';
import { CachingService } from './caching.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsFetcherService {
  private baseUrl = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient, private cachingService: CachingService) {}

  fetchPeople(page: number, pageSize: number): Observable<Person[]> {
    const cacheKey = `people_${page}_${pageSize}`;

    return from(this.cachingService.getFromCache(cacheKey)).pipe(
      switchMap(cachedPeople => {
        if (cachedPeople) {
          return of(cachedPeople);
        }
        const url = `${this.baseUrl}/people?page=${page}&limit=${pageSize}`;
        return this.http.get<any>(url).pipe(
          map(response => response.results.map((result: any) => ({
            result: {
              uid: result.uid,
              name: result.name,
              url: result.url
            }
          }))),
          tap(mappedPeople => this.cachingService.addToCache(cacheKey, mappedPeople)),
          catchError(error => throwError(error))
        );
      })
    );
  }

  fetchPersonDetails(id: string): Observable<Person> {
    const cacheKey = `person_${id}`;

    return from(this.cachingService.getFromCache(cacheKey)).pipe(
      switchMap(cachedPerson => {
        if (cachedPerson) {
          return of(cachedPerson);
        }
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
          tap(person => this.cachingService.addToCache(cacheKey, person)),
          catchError(error => throwError(error))
        );
      })
    );
  }

  fetchPlanetDetails(url: string): Observable<any> {
    const cacheKey = `planet_${url}`;

    return from(this.cachingService.getFromCache(cacheKey)).pipe(
      switchMap(cachedPlanet => {
        if (cachedPlanet) {
          return of(cachedPlanet);
        }
        return this.http.get<any>(url).pipe(
          map(response => ({
            name: response.result.properties.name,
            terrain: response.result.properties.terrain
          })),
          tap(planet => this.cachingService.addToCache(cacheKey, planet)),
          catchError(error => throwError(error))
        );
      })
    );
  }
}
