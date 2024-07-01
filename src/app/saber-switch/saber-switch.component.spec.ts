import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaberSwitchComponent } from './saber-switch.component';

describe('SaberSwitchComponent', () => {
  let component: SaberSwitchComponent;
  let fixture: ComponentFixture<SaberSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaberSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaberSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
