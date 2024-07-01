import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sword',
  templateUrl: './sword.component.html',
  styleUrl: './sword.component.scss'
})
export class SwordComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      this.clickCheckbox('on-off-left');
    }, 1000);

    setTimeout(() => {
      this.clickCheckbox('on-off-right');
    }, 1500);
  }

  clickCheckbox(id: string): void {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    if (checkbox) {
      checkbox.click();
    }
  }
}
