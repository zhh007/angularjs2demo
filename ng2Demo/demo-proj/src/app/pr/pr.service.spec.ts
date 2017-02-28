/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PRService } from './pr.service';

describe('PRService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PRService]
    });
  });

  it('should ...', inject([PRService], (service: PRService) => {
    expect(service).toBeTruthy();
  }));
});
