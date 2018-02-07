import { StellarAccountData } from './../../models/stellar-account/stellar-account-data';
import { HorizonApiService } from './../../../services/horizon-api/horizon-api.service';
import { StellarAccountGlimpseComponent } from './stellar-account-glimpse.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('StellarAccountGlimpseComponent', () => {
  let component: StellarAccountGlimpseComponent;
  let fixture: ComponentFixture<StellarAccountGlimpseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StellarAccountGlimpseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StellarAccountGlimpseComponent);
    component = fixture.componentInstance;
    component.accountData = <StellarAccountData>{};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
