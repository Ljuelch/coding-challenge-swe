import { Component } from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  showSuggestions = false;
  searchText = '';

  constructor(
    private suggestionService: SuggestionService,
    private searchService: SearchService
  ) {}

  search(inputElement?: HTMLInputElement) {
    this.searchService.setSearchQuery(this.searchText.trim());
    this.hideSuggestions();
    if (inputElement) {
      inputElement.blur();
    }
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim();

    if (inputValue.length > 0) {
      this.suggestionService.fetchSuggestions(inputValue).subscribe(suggestions => {
        this.suggestionService.updateSuggestions(suggestions);
        this.showSuggestions = true;
      });
    } else {
      this.hideSuggestions();
    }
  }

  hideSuggestions() {
    this.showSuggestions = false;
    this.suggestionService.updateSuggestions([]);
  }

  clearSearch() {
    this.searchText = '';
    this.search();
  }
}
