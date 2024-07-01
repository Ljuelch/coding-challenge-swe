import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiContainerComponent } from './wiki-container.component';

describe('WikiContainerComponent', () => {
  let component: WikiContainerComponent;
  let fixture: ComponentFixture<WikiContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikiContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
