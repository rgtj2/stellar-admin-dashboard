import { HorizonApiService } from './../../../services/horizon-api/horizon-api.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGlimpseComponent } from './account-glimpse.component';

// TODO: Pick back up here..

describe('AccountGlimpseComponent', () => {
  let component: AccountGlimpseComponent;
  let fixture: ComponentFixture<AccountGlimpseComponent>;
  let mockHorizonApi;

  beforeEach(async(() => {
    mockHorizonApi = jasmine.createSpyObj('HorizonApi', ['get']);
    TestBed.configureTestingModule({
      declarations: [ AccountGlimpseComponent ],
      providers: [
        {provide: HorizonApiService, useValue: mockHorizonApi}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGlimpseComponent);
    component = fixture.componentInstance;
    component.publicKey = 'asdf';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
