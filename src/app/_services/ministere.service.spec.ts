import { TestBed } from '@angular/core/testing';

import { MinistereService } from './ministere.service';

describe('MinistereService', () => {
  let service: MinistereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
