import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceMeetDetailsComponent } from './race-meet-details.component';

describe('RaceMeetDetailsComponent', () => {
  let component: RaceMeetDetailsComponent;
  let fixture: ComponentFixture<RaceMeetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceMeetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceMeetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
