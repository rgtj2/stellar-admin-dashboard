import { TestComponentHandle } from './utilties/test-helpers/test-component-handle/test-component-handle';
import { AppComponent } from './app.component';
import { NetworkEnvironmentService } from './services/network-environment/network-environment.service';

import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let handle: TestComponentHandle<AppComponent>;
  let mockNetworkEnvironment: NetworkEnvironmentService;

  beforeEach(async(() => {
    // TODO: Update jasmine, change network env to use a setter, and use .spyOnProperty
    mockNetworkEnvironment = jasmine.createSpyObj('NetworkEnvironment', ['setHorizonConfig']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: NetworkEnvironmentService, useValue: mockNetworkEnvironment}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    handle = new TestComponentHandle(fixture);
    handle.detectChanges();
    component = handle.componentInstance;
  });

  describe('.ngOnInit', () => {
    describe('when setting the NetworkEnvironmentService.horizonURL', () => {
      it('should just set it to \'test\' for now', () => {
        expect(mockNetworkEnvironment.setHorizonConfig).toHaveBeenCalledWith('test');
      });
    });
  });
});
