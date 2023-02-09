import { TestBed } from '@angular/core/testing';

import { IdeeService } from './idee.service';

describe('IdeeService', () => {
  let service: IdeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
