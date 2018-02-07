import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerListComponent } from './signer-list.component';

describe('SignerListComponent', () => {
  let component: SignerListComponent;
  let fixture: ComponentFixture<SignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
