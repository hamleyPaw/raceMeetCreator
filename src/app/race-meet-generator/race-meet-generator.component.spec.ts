import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceMeetGeneratorComponent } from './race-meet-generator.component';

describe('RaceMeetGeneratorComponent', () => {
  let component: RaceMeetGeneratorComponent;
  let fixture: ComponentFixture<RaceMeetGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceMeetGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceMeetGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
