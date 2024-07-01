import { Component } from '@angular/core';

@Component({
  selector: 'app-saber-switch',
  templateUrl: './saber-switch.component.html',
  styleUrl: './saber-switch.component.scss'
})
export class SaberSwitchComponent {
  saberStatus: string = "on";

  toggleSaber() {
    this.saberStatus = this.saberStatus === "on" ? "off" : "on";
  }
}
