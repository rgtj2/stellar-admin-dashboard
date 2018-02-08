import { AppStateService } from './../../../services/app-state/app-state.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGlimpseComponent } from './network-glimpse.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

describe('NetworkGlimpseComponent', () => {
  let component: NetworkGlimpseComponent;
  let fixture: ComponentFixture<NetworkGlimpseComponent>;
  let mockAppState;
  let mockChangeRef;

  beforeEach(async(() => {
    mockAppState = {
      networkState: new BehaviorSubject('connected'),
      networkUpdates: new Subject()
    };
    mockChangeRef = jasmine.createSpyObj('ChangeRef', ['markForCheck']);
    TestBed.configureTestingModule({
      declarations: [ NetworkGlimpseComponent ],
      providers: [
        {provide: AppStateService, useValue: mockAppState},
        {provide: ChangeDetectorRef, useValue: mockChangeRef}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkGlimpseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
