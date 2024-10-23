import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBookingComponent } from './service-booking.component';

describe('ServiceBookingComponent', () => {
  let component: ServiceBookingComponent;
  let fixture: ComponentFixture<ServiceBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
