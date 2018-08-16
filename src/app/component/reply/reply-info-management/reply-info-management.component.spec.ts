import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyInfoManagementComponent } from './reply-info-management.component';

describe('ReplyInfoManagementComponent', () => {
  let component: ReplyInfoManagementComponent;
  let fixture: ComponentFixture<ReplyInfoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyInfoManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyInfoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
