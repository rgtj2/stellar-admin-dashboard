import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGlimpseComponent } from './account-glimpse.component';

describe('AccountGlimpseComponent', () => {
  let component: AccountGlimpseComponent;
  let fixture: ComponentFixture<AccountGlimpseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountGlimpseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGlimpseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
