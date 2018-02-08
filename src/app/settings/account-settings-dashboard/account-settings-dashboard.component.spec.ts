import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsDashboardComponent } from './account-settings-dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AccountSettingsDashboardComponent', () => {
  let component: AccountSettingsDashboardComponent;
  let fixture: ComponentFixture<AccountSettingsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsDashboardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
