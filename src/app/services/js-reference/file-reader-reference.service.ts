import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileReaderReferenceService extends FileReader {
  private _fileLoadedSubject: Subject<string|'FileReadError'>;

  constructor() {
    super();
    this.onprogress = this.onFileReadProgress.bind(this);
    this.onload = this.onFileLoaded.bind(this);
    this.onerror = this.onFileReadError.bind(this);
  }

  public parseFileText(raw: Blob): Observable<string|'FileReadError'> {
    this.initSubject();
    this.readAsText(raw);
    return this._fileLoadedSubject.asObservable();
  }

  private onFileReadProgress($event): void {
    if ($event.lengthComputable) {
      // TODO: Progress indicator, or kill this..
      const loaded = ($event.loaded / $event.total);
      if (loaded < 1) {
      }
    }
  }

  private onFileLoaded($event): void {
    this._fileLoadedSubject.next($event.target.result);
  }

  private onFileReadError($event): void {
    if ($event.target.error.name === 'NotReadableError') {
      // TODO: Better error handling
      this._fileLoadedSubject.next('FileReadError');
    }
    this.clearSubject();
  }

  private initSubject(): void {
    this.clearSubject();
    this._fileLoadedSubject = new Subject();
  }

  private clearSubject(): void {
    if (this._fileLoadedSubject instanceof Subject) {
      this._fileLoadedSubject.unsubscribe();
    }
    this._fileLoadedSubject = null;
  }

}
