import { IParticlesProps } from '@tsparticles/angular';

export const particlesOptions: IParticlesProps = {
  background: {
    color: "#000000"
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push"
      },
      onHover: {
        enable: false,
        mode: "repulse"
      },
      resize: {
        delay: 200,
        enable: true
      }
    },
    modes: {
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: false,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce"
      },
      random: true,
      speed: 0.1,
      straight: false
    },
    number: {
      density: {
        enable: true,
        width: 800,
        height: 800
      },
      value: 200
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 0.5, max: 1 }
    }
  },
  detectRetina: true
};
