import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeApplicantsComponent } from './employee-applicants.component';

describe('EmployeeApplicantsComponent', () => {
  let component: EmployeeApplicantsComponent;
  let fixture: ComponentFixture<EmployeeApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeApplicantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
