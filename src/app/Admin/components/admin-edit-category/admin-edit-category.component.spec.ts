import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCategoryComponent } from './admin-edit-category.component';

describe('AdminEditCategoryComponent', () => {
  let component: AdminEditCategoryComponent;
  let fixture: ComponentFixture<AdminEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
