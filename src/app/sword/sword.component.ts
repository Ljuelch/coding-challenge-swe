import { Component, OnInit } from '@angular/core';
import { LightsaberTriggerService } from '../services/lightsaber-trigger.service';

@Component({
  selector: 'app-sword',
  templateUrl: './sword.component.html',
  styleUrl: './sword.component.scss'
})
export class SwordComponent implements OnInit {
  constructor(private lightsaberTriggerService: LightsaberTriggerService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.lightsaberTriggerService.saberStatus$.subscribe(status => {
        if (status === 'on') {
          this.turnOnLightsabers();
        } else {
          this.turnOffLightsabers();
        }
      });
    }, 1600);

    setTimeout(() => {
      this.clickCheckbox('on-off-left', true);
    }, 1000);

    setTimeout(() => {
      this.clickCheckbox('on-off-right', true);
    }, 1500);
  }

  turnOnLightsabers() {
    this.clickCheckbox('on-off-left', true);
    this.clickCheckbox('on-off-right', true);
  }

  turnOffLightsabers() {
    this.clickCheckbox('on-off-left', false);
    this.clickCheckbox('on-off-right', false);
  }

  clickCheckbox(id: string, shouldCheck: boolean): void {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    if (checkbox && checkbox.checked !== shouldCheck) {
      checkbox.click();
    }
  }
}
