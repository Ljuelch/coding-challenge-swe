import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResultsFetcherService } from '../services/results-fetcher.service';
import { SearchService } from '../services/search.service';
import { Person } from '../interfaces/person';

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
  private planetCache: { [url: string]: any } = {};

  constructor(private resultService: ResultsFetcherService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadMorePeople();
    this.subscription.add(
      this.searchService.searchQuery$.subscribe(query => {
        if (query) {
          this.searchPeopleByName(query);
        }
      })
    );
  }

  loadMorePeople(): void {
    this.loading = true;
    this.subscription.add(
      this.resultService.fetchPeople(this.page, this.pageSize).subscribe(
        (people: Person[]) => {
          this.people = [...this.people, ...people];
          this.loadMoreDetails();
          this.allDataLoaded = false;
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
        this.loadPlanetDetails();
      },
      error => {
        console.error('Error fetching detailed people:', error);
        this.loading = false;
      }
    );
  }

  loadPlanetDetails(): void {
    const planetObservables = this.detailedPeople
      .filter(person => person.result.homeworld)
      .map(person => {
        const url = person.result.homeworld;
        if (this.planetCache[url]) {
          return of(this.planetCache[url]);
        }
        return this.resultService.fetchPlanetDetails(url).pipe(
          tap(planet => this.planetCache[url] = planet)
        );
      });

    forkJoin(planetObservables).subscribe(
      (planetDetails: any[]) => {
        this.detailedPeople.forEach(person => {
          const url = person.result.homeworld;
          person.planetDetails = this.planetCache[url];
        });
        this.dataLoaded = true;
        this.page++;
        if (this.detailedPeople.length >= this.people.length) {
          this.allDataLoaded = true;
        }
        this.loading = false;
      },
      error => {
        console.error('Error fetching planet details:', error);
        this.loading = false;
      }
    );
  }

  searchPeopleByName(name: string): void {
    this.loading = true;
    this.subscription.add(
      this.resultService.fetchPeopleByName(name).subscribe(
        (people: Person[]) => {
          this.people = people;
          this.detailedPeople = [];
          this.page = 1;
          this.loadMoreDetails();
        },
        error => {
          console.error('Error searching people:', error);
          this.loading = false;
        }
      )
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
