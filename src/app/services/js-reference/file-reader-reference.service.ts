import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileReaderReferenceService {
  private _fileLoadedSubject: Subject<string|'FileReadError'>;
  private nativeFileReader = FileReader;

  constructor() {
  }

  public parseFileText(raw: Blob): Observable<string|'FileReadError'> {
    this.initSubject();
    this.initFileReader(raw);
    return this._fileLoadedSubject.asObservable();
  }

  private initFileReader(raw: Blob): void {
    const reader = new FileReader();
    reader.readAsText(raw);
    reader.onprogress = this.onFileReadProgress.bind(this);
    reader.onload = this.onFileLoaded.bind(this);
    reader.onerror = this.onFileReadError.bind(this);
  }

  private onFileReadProgress($event): void {
    if ($event.lengthComputable) {
      const loaded = ($event.loaded / $event.total);
      if (loaded < 1) {
        console.log('loading', loaded);
      }
    }
  }

  private onFileLoaded($event): void {
    this._fileLoadedSubject.next($event.target.result);
  }

  private onFileReadError($event): void {
    if ($event.target.error.name === 'NotReadableError') {
      // TODO: Better error handling
      console.log('FileReadError');
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
