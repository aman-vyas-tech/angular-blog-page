import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LoaderService ]
    });
    loaderService = TestBed.inject(LoaderService);
    spyOn(loaderService, 'show').and.callThrough();
    spyOn(loaderService, 'hide').and.callThrough();
  });

  afterEach(() => {
    loaderService.isSpinnerVisible = false;
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize isSpinnerVisible to false', () => {
      expect(loaderService.isSpinnerVisible).toEqual(false);
    });

    it('should initialize showSpinner as a Subject of type boolean', () => {
      expect(loaderService.isLoading).toEqual(new Subject<boolean>());
    });
  });

  describe('show()', () => {

    it('should be called with url.', async () => {
      loaderService.show();
      expect(loaderService.isSpinnerVisible).toBe(true);
    });
  });

  describe('hide()', () => {

    it('should be called with url.', async () => {
      loaderService.hide();
      expect(loaderService.isSpinnerVisible).toBe(false);
    });
  });
});
