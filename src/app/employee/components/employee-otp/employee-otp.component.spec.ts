import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOtpComponent } from './employee-otp.component';

describe('EmployeeOtpComponent', () => {
  let component: EmployeeOtpComponent;
  let fixture: ComponentFixture<EmployeeOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
