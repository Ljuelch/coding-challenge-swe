import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../interfaces/person';
import { Subscription, forkJoin } from 'rxjs';
import { ResultsFetcherService } from '../services/results-fetcher.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  people: Person[] = [];
  detailedPeople: any[] = [];
  dataLoaded: boolean = false;
  loading: boolean = false;
  allDataLoaded: boolean = false;
  private subscription: Subscription = new Subscription();
  private page: number = 1;
  private pageSize: number = 10;

  constructor(private resultService: ResultsFetcherService) {}

  ngOnInit(): void {
    this.loadMorePeople();
  }

  loadMorePeople(): void {
    this.loading = true;
    this.subscription.add(
      this.resultService.fetchPeople(this.page, this.pageSize).subscribe(
        (people: Person[]) => {
          this.people = [...this.people, ...people];
          this.loadMoreDetails();
        },
        error => {
          console.error('Error fetching people:', error);
        }
      )
    );
  }

  loadMoreDetails(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    const peopleToLoad = this.people.slice(start, end);

    if (peopleToLoad.length === 0) {
      this.allDataLoaded = true;
      this.loading = false;
      return;
    }

    const detailObservables = peopleToLoad
      .filter(person => person.result && person.result.uid)
      .map(person => this.resultService.fetchPersonDetails(person.result.uid));

    forkJoin(detailObservables).subscribe(
      (detailedPeople: any[]) => {
        this.detailedPeople = [...this.detailedPeople, ...detailedPeople];
        this.dataLoaded = true;
        this.page++;
        if (this.detailedPeople.length >= this.people.length) {
          this.allDataLoaded = true;
        }
        this.loading = false;
      },
      error => {
        console.error('Error fetching detailed people:', error);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
