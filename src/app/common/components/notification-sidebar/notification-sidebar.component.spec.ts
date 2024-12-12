import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSidebarComponent } from './notification-sidebar.component';

describe('NotificationSidebarComponent', () => {
  let component: NotificationSidebarComponent;
  let fixture: ComponentFixture<NotificationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
