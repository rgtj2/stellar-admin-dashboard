import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountExporterComponent } from './account-exporter.component';

describe('AccountExporterComponent', () => {
  let component: AccountExporterComponent;
  let fixture: ComponentFixture<AccountExporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountExporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
