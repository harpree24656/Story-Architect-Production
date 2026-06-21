import { TestBed } from '@angular/core/testing';

import { Relation } from './relation';

describe('Relation', () => {
  let service: Relation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Relation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
