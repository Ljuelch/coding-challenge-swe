import { Component } from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  showSuggestions = false;
  searchText = '';

  constructor(private suggestionService: SuggestionService) {}

  search() {
    this.hideSuggestions();
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim();

    if (inputValue.length > 0) {
      const suggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];
      this.suggestionService.updateSuggestions(suggestions);
      this.showSuggestions = true;
    } else {
      this.hideSuggestions();
    }
  }

  hideSuggestions() {
    this.showSuggestions = false;
    this.suggestionService.updateSuggestions([]);
  }
}
