import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../interfaces/person';
import { Subscription, forkJoin } from 'rxjs';
import { ResultsFetcherService } from '../../services/results-fetcher.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  people: any[] = [];
  detailedPeople: any[] = []; // To store detailed information
  dataLoaded: boolean = false; // Flag to indicate if data loading is complete
  private subscription: Subscription = new Subscription();

  constructor(private resultService: ResultsFetcherService) {}

  ngOnInit(): void {
    this.fetchPeople();
  }

  fetchPeople(): void {
    this.subscription = this.resultService.fetchPeople().subscribe(
      (people: any[]) => {
        console.log('Fetched people:', people); // Log the fetched people
        this.people = people;

        // Prepare an array of observables for fetching details
        const detailObservables = people
          .filter(person => person.result && person.result.uid)
          .map(person => this.resultService.fetchPersonDetails(person.result.uid));

        // Use forkJoin to wait for all detail fetches to complete
        forkJoin(detailObservables).subscribe(
          (detailedPeople: any[]) => {
            this.detailedPeople = detailedPeople;
            this.dataLoaded = true; // Set dataLoaded to true once data is loaded
            console.log('All detailed people:', this.detailedPeople); // Log all detailed people
            console.log('Length of detailed people:', this.detailedPeople.length); // Log the length of detailed people array
          },
          error => {
            console.error('Error fetching detailed people:', error);
          }
        );
      },
      error => {
        console.error('Error fetching people:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
