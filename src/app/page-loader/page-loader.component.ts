import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent implements AfterViewInit {
@ViewChild('byline', { static: false }) byline!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.animateByline();
  }

  animateByline(): void {
    const bylineElement = this.byline.nativeElement as HTMLElement;
    const bylineText = bylineElement.innerHTML;
    const bylineArr = bylineText.split('');
    this.renderer.setProperty(bylineElement, 'innerHTML', '');

    bylineArr.forEach((char) => {
      if (char === ' ') {
        this.renderer.appendChild(bylineElement, this.renderer.createText(' '));
      } else {
        const span = this.renderer.createElement('span');
        const letter = this.renderer.createText(char);
        this.renderer.appendChild(span, letter);
        this.renderer.appendChild(bylineElement, span);
      }
    });
  }
}
