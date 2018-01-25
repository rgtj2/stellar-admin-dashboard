import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloAdminComponent } from './hello-admin.component';

describe('HelloAdminComponent', () => {
  let component: HelloAdminComponent;
  let fixture: ComponentFixture<HelloAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
