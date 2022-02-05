import { TestBed } from '@angular/core/testing';

import { GrnService } from './grn.service';

describe('GrnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrnService = TestBed.get(GrnService);
    expect(service).toBeTruthy();
  });
});
