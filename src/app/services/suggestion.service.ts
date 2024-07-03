import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ResultsFetcherService } from './results-fetcher.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestionsSubject = new BehaviorSubject<string[]>([]);
  suggestions$ = this.suggestionsSubject.asObservable();

  constructor(private resultsFetcherService: ResultsFetcherService) {}

  updateSuggestions(suggestions: string[]): void {
    this.suggestionsSubject.next(suggestions);
  }

  fetchSuggestions(query: string): Observable<string[]> {
    return this.resultsFetcherService.fetchPeopleByName(query).pipe(
      map(people => people.map(person => person.result.properties.name)),
      catchError(error => {
        console.error('Error fetching suggestions:', error);
        return of([]);
      })
    );
  }
}
