import { Component } from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.scss'
})
export class SuggestionListComponent {
  suggestions: string[] = [];
  private subscription: Subscription;

  constructor(private suggestionService: SuggestionService) {
    this.subscription = this.suggestionService.suggestions$.subscribe(suggestions => {
      this.suggestions = suggestions;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
