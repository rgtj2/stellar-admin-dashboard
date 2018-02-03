import { Injectable } from '@angular/core';

@Injectable()
export class WindowReferenceService {
  public nativeWindow: Window;

  constructor(window: Window) {
    this.nativeWindow = window;
  }

}
