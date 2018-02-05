import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendbotComponent } from './friendbot.component';

describe('FriendbotComponent', () => {
  let component: FriendbotComponent;
  let fixture: ComponentFixture<FriendbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendbotComponent ]
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
