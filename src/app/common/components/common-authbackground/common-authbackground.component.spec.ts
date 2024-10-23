import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAuthbackgroundComponent } from './common-authbackground.component';

describe('CommonAuthbackgroundComponent', () => {
  let component: CommonAuthbackgroundComponent;
  let fixture: ComponentFixture<CommonAuthbackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonAuthbackgroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonAuthbackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
