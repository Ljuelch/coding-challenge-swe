import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  displayLoader: boolean = true;
  displayContent: boolean = false;

  ngOnInit() {
    this.removeLoader();
  }

  removeLoader() {
    setTimeout(() => {
        this.displayLoader = false;
    }, 6000);
    setTimeout(() => {
        this.displayContent = true;
    }, 6300);
  }
}
