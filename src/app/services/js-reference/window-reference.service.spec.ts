import { TestBed, inject } from '@angular/core/testing';

import { WindowReferenceService } from './window-reference.service';

fdescribe('WindowReferenceService', () => {
  let mockWindow;
  beforeEach(() => {
    mockWindow = {
      URL: {},
      document: {},
      navigator: {}
    };
    TestBed.configureTestingModule({
      providers: [
        WindowReferenceService,
        {provide: Window, useValue: mockWindow}
      ]
    });
  });

  it('should be created', inject([WindowReferenceService], (service: WindowReferenceService) => {
    expect(service).toBeTruthy();
  }));
});
