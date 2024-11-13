import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelectionComponent } from './employee-selection.component';

describe('EmployeeSelectionComponent', () => {
  let component: EmployeeSelectionComponent;
  let fixture: ComponentFixture<EmployeeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
