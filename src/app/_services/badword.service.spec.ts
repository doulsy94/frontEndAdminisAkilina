import { TestBed } from '@angular/core/testing';

import { BadwordService } from './badword.service';

describe('BadwordService', () => {
  let service: BadwordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadwordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
