import { AppStateService } from './../../services/app-state/app-state.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockAppState;

  beforeEach(async(() => {
    mockAppState = {
      userState: new BehaviorSubject('none')
    };
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: AppStateService, useValue: mockAppState}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
