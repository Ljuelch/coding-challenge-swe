import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultsFetcherService } from '../services/results-fetcher.service';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrl: './load-more-btn.component.scss'
})
export class LoadMoreBtnComponent implements OnInit {

  @Output() loadMoreClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() loading: boolean = false;
  constructor(private resultService: ResultsFetcherService) { }

  ngOnInit(): void {
  }

  loadMore(): void {
    this.loading = true;
    this.loadMoreClicked.emit();
  }
}
