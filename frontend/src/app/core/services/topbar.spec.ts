import { TestBed } from '@angular/core/testing';

import { Topbar } from './topbar';

describe('Topbar', () => {
  let service: Topbar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Topbar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
