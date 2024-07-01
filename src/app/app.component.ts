import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isDisplayed: boolean = true;

  ngOnInit() {
    this.removeElement();
  }

  removeElement() {
    setTimeout(() => {
        this.isDisplayed = false;
    }, 6000);
  }
}
