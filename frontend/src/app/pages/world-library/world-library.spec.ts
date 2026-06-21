import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldLibrary } from './world-library';

describe('WorldLibrary', () => {
  let component: WorldLibrary;
  let fixture: ComponentFixture<WorldLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(WorldLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
