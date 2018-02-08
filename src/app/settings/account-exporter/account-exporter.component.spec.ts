import { AppStateService } from './../../services/app-state/app-state.service';
import { FormBuilder } from '@angular/forms';
import { AccountFileDownloadService } from './../../services/auth/account-file/account-file-download.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountExporterComponent } from './account-exporter.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AccountExporterComponent', () => {
  let component: AccountExporterComponent;
  let fixture: ComponentFixture<AccountExporterComponent>;
  let mockAccountFileDownloader;
  let mockFormBuilder;
  let mockAppState;

  beforeEach(async(() => {
    mockAccountFileDownloader = jasmine.createSpyObj('FileDownloader', ['downloadEncryptedFile']);
    mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockAppState = {
      authState: new BehaviorSubject('authorized')
    };
    TestBed.configureTestingModule({
      declarations: [
        AccountExporterComponent
      ],
      providers: [
        {provide: AccountFileDownloadService, useValue: mockAccountFileDownloader},
        {provide: FormBuilder, useValue: mockFormBuilder},
        {provide: AppStateService, useValue: mockAppState}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
