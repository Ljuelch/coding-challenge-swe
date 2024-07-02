import { Component, OnInit } from '@angular/core';
import { IParticlesProps, NgParticlesService } from '@tsparticles/angular';
import { loadFull } from 'tsparticles';
import { Container } from '@tsparticles/engine';
import { particlesOptions } from '../../assets/particles-options';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}
  particlesOptions: IParticlesProps = particlesOptions;

  id = "tsparticles";
  showSpaceship = false;
  shakeSpaceship = false;
  disappearSpaceship = false;

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine) => {
      await loadFull(engine);
    });
    setTimeout(() => {
      this.showSpaceship = true;
      setTimeout(() => {
        this.shakeSpaceship = true;
        setTimeout(() => {
          this.shakeSpaceship = false;
          setTimeout(() => {
            this.disappearSpaceship = true;
          }, 30);
        }, 1000);
      }, 1500);
    }, 6100);
  }

  particlesLoaded(container: Container): void {}
}
