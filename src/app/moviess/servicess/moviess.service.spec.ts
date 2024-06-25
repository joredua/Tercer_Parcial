import { TestBed } from '@angular/core/testing';

import { MoviessService } from './moviess.service';

describe('MoviessService', () => {
  let service: MoviessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
