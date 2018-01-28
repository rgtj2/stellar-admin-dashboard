import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export class TestComponentHandle<T> {
  constructor(public testComponent: ComponentFixture<T>) {
  }

  public get componentInstance(): T {
    return this.testComponent.componentInstance;
  }

  public get debugElement(): DebugElement {
    return this.testComponent.debugElement;
  }

  public detectChanges(): void {
    this.testComponent.detectChanges();
  }
}
