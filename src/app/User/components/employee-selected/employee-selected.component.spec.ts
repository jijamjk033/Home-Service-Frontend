import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelectedComponent } from './employee-selected.component';

describe('EmployeeSelectedComponent', () => {
  let component: EmployeeSelectedComponent;
  let fixture: ComponentFixture<EmployeeSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
