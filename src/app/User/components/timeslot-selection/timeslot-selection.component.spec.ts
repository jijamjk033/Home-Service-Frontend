import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotSelectionComponent } from './timeslot-selection.component';

describe('TimeslotSelectionComponent', () => {
  let component: TimeslotSelectionComponent;
  let fixture: ComponentFixture<TimeslotSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeslotSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeslotSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
