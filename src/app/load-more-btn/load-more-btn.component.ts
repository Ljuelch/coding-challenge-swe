import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrl: './load-more-btn.component.scss'
})
export class LoadMoreBtnComponent{

  @Output() loadMoreClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() loading: boolean = false;

  loadMore(): void {
    this.loading = true;
    this.loadMoreClicked.emit();
  }
}
