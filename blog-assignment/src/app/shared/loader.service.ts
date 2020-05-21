import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isSpinnerVisible: boolean;
  public isLoading: Subject<boolean>;

  constructor() {
    this.isSpinnerVisible = false;
    this.isLoading = new Subject<boolean>();
  }

  public show(): any {
    this.isSpinnerVisible = true;
    this.isLoading.next(this.isSpinnerVisible);
  }

  public hide(): any {
    this.isSpinnerVisible = false;
    this.isLoading.next(this.isSpinnerVisible);
  }
}
