import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsDashboardComponent } from './account-settings-dashboard.component';

describe('AccountSettingsDashboardComponent', () => {
  let component: AccountSettingsDashboardComponent;
  let fixture: ComponentFixture<AccountSettingsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
