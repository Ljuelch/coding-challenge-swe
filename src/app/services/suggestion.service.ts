import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestionsSubject = new BehaviorSubject<string[]>([]);
  suggestions$: Observable<string[]> = this.suggestionsSubject.asObservable();

  constructor() { }

  updateSuggestions(suggestions: string[]) {
    this.suggestionsSubject.next(suggestions);
  }
}
