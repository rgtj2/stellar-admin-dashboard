import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGlimpseComponent } from './network-glimpse.component';

describe('NetworkGlimpseComponent', () => {
  let component: NetworkGlimpseComponent;
  let fixture: ComponentFixture<NetworkGlimpseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkGlimpseComponent ]
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
