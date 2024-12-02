import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListEmployeeComponent } from './booking-list-employee.component';

describe('BookingListEmployeeComponent', () => {
  let component: BookingListEmployeeComponent;
  let fixture: ComponentFixture<BookingListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingListEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
