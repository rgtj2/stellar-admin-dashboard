import { AppStateService } from './../../services/app-state/app-state.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendbotComponent } from './friendbot.component';
import { FriendbotService } from '../../services/horizon-api/friendbot/friendbot.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

describe('FriendbotComponent', () => {
  let component: FriendbotComponent;
  let fixture: ComponentFixture<FriendbotComponent>;
  let mockFriendbotService;
  let mockAppState;
  let mockRouter;

  beforeEach(async(() => {
    mockFriendbotService = jasmine.createSpyObj('Friendbot', ['requestfunds']);
    mockAppState = {
      requestState: new BehaviorSubject('ready')
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ FriendbotComponent ],
      providers: [
        {provide: FriendbotService, useValue: mockFriendbotService},
        {provide: AppStateService, useValue: mockAppState},
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
