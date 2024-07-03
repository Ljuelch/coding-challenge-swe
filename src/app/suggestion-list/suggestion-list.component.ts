import { Component, OnDestroy } from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent implements OnDestroy {
  suggestions: string[] = [];
  private subscription: Subscription;

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
    this.searchService.setSearchQuery(suggestion);
    this.suggestionService.updateSuggestions([]);
  }
}
