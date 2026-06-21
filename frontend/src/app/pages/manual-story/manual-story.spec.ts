import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualStory } from './manual-story';

describe('ManualStory', () => {
  let component: ManualStory;
  let fixture: ComponentFixture<ManualStory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualStory],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualStory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
