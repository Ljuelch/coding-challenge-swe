import { Component } from '@angular/core';
import { LightsaberTriggerService } from '../services/lightsaber-trigger.service';

@Component({
  selector: 'app-saber-switch',
  templateUrl: './saber-switch.component.html',
  styleUrl: './saber-switch.component.scss'
})
export class SaberSwitchComponent {
  saberStatus: string;

  constructor(
    private lightsaberTriggerService: LightsaberTriggerService
  ){
    this.saberStatus = this.lightsaberTriggerService.getSaberStatus();
    this.lightsaberTriggerService.saberStatus$.subscribe(status => {
      this.saberStatus = status;
    });
  }

  toggleSaber() {
    this.lightsaberTriggerService.toggleSaber();
  }
}
