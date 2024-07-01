import { Component, OnInit } from '@angular/core';
import { IParticlesProps, NgParticlesService } from '@tsparticles/angular';
import { loadFull } from 'tsparticles';
import { Container } from '@tsparticles/engine';
import { particlesOptions} from '../../assets/particles-options';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  id = "tsparticles";
  particlesOptions: IParticlesProps = particlesOptions;
  ngOnInit(): void {
    this.ngParticlesService.init(async (engine) => {
      await loadFull(engine);
    });
  }

  particlesLoaded(container: Container): void {
  }
}
