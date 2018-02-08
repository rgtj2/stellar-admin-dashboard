import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountIdPipe } from './../../../pipes/account-id.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerListComponent } from './signer-list.component';

describe('SignerListComponent', () => {
  let component: SignerListComponent;
  let fixture: ComponentFixture<SignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignerListComponent,
        AccountIdPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignerListComponent);
    component = fixture.componentInstance;
    component.signers = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
