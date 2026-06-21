import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryMap } from './story-map';

describe('StoryMap', () => {
  let component: StoryMap;
  let fixture: ComponentFixture<StoryMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryMap],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
