import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent implements OnDestroy {
  suggestions: string[] = [];
  private subscription: Subscription;

  @Output() suggestionSelected = new EventEmitter<string>();

  constructor(
    private suggestionService: SuggestionService,
    private searchService: SearchService
  ) {
    this.subscription = this.suggestionService.suggestions$.subscribe(suggestions => {
      this.suggestions = suggestions;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectSuggestion(suggestion: string) {
    console.log('Suggestion clicked:', suggestion);
    this.searchService.setSearchQuery(suggestion);
    this.suggestionService.updateSuggestions([]);
  }
}
