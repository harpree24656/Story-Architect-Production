import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Relations } from './relations';

describe('Relations', () => {
  let component: Relations;
  let fixture: ComponentFixture<Relations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Relations],
    }).compileComponents();

    fixture = TestBed.createComponent(Relations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
