import { TestBed } from '@angular/core/testing';

import { World } from './world';

describe('World', () => {
  let service: World;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(World);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
