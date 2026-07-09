import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleCasePipe, NgClass} from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '../../core/models/event';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TitleCasePipe],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {

  private topbarService = inject(TopbarService)
  private router = inject(Router)
  private fb = inject(FormBuilder)
  private destroyRef = inject(DestroyRef)

  
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  activeFilter: string = 'All Events'
  currentSort: string = '';
  selectedStory: string = '';
  editingEventId: string | null = null;
  eventForm !: FormGroup 
  events = signal<Event[]>([])
  selectedEvent = signal<Event | null>(null)

  eventTypes: string[] = [ 'All Events', 'Major', 'Minor', 'Plot Twist', 'Flashback'];
  sortOptions = [
    {
      value: 'timeline',
      label: 'Timeline Order'
    },
    {
      value: 'recent',
      label: 'Recently Added'
    },
    {
      value: 'type',
      label: 'By Type'
    }
  ];
  storyOptions = [
    {
      value: 'lost-kingdom',
      label: 'The Lost Kingdom'
    },
    {
      value: 'beyond-stars',
      label: 'Beyond the Stars'
    },
    {
      value: 'mystic',
      label: 'Mystic Academy'
    }
  ];
  impactLevels: string[] = ['high','medium','low'];
  acts: string[] = ['Act I — The Beginning','Act II — The Journey','Act III — The Reckoning'];


  // add temporary data
  mockEvents: Event[] = [
    {
      id: '1',
      title: 'The Fall of Eldarion',
      description: 'The kingdom of Eldarion falls after a devastating invasion, forcing Arin Blackwood into exile.',
      type: 'major',
      location: 'Eldarion Castle',
      chapter: 'Chapter 1',
      act: 'Act I — The Beginning',
      characters: ['AB', 'LV', 'KR'],
      characterColor: ['', 'purple', 'teal'],
      characterNames: ['Arin Blackwood', 'Lady Vespera', 'Kael Ren'],
      tags: ['Battle', 'Destruction', 'Exile'],
      impact: 'high',
      story: 'The Lost Kingdom',
      createAt: '3 days ago'
    },
    {
      id: '2',
      title: 'Arin Meets Sera in the Wildlands',
      description: 'Arin meets Sera Ravencroft while traveling through the Wildlands, forming an important alliance.',
      type: 'minor',
      location: 'The Wildlands',
      chapter: 'Chapter 2',
      act: 'Act I — The Beginning',
      characters: ['AB', 'SR'],
      characterColor: ['', 'pink'],
      characterNames: ['Arin Blackwood', 'Sera Ravencroft'],
      tags: ['Encounter', 'Alliance'],
      impact: 'medium',
      story: 'The Lost Kingdom',
      createAt: '2 days ago'
    },
    {
      id: '3',
      title: "Kael's Betrayal Revealed",
      description: 'Kael Ren is exposed as a traitor working alongside Lady Vespera.',
      type: 'twist',
      location: 'Shadow Fortress',
      chapter: 'Chapter 7',
      act: 'Act II — The Journey',
      characters: ['AB', 'KR', 'LV'],
      characterColor: ['', 'teal', 'purple'],
      characterNames: ['Arin Blackwood', 'Kael Ren', 'Lady Vespera'],
      tags: ['Betrayal', 'Conflict', 'Revelation'],
      impact: 'high',
      story: 'The Lost Kingdom',
      createAt: '1 day ago'
    },
    {
      id: '4',
      title: 'The Oath of the Silver Dawn',
      description: 'A flashback reveals the sacred oath that inspired Arin to fight for the kingdom.',
      type: 'flashback',
      location: 'Silver Dawn Temple',
      chapter: 'Chapter 8',
      act: 'Act II — The Journey',
      characters: ['AB', 'EN'],
      characterColor: ['', 'orange'],
      characterNames: ['Arin Blackwood', 'Elder Nyx'],
      tags: ['Oath', 'Memory', 'Motivation'],
      impact: 'low',
      story: 'The Lost Kingdom',
      createAt: '5 hours ago'
    },
    {
      id: '5',
      title: 'The Final Siege of Eldarion',
      description: 'The heroes unite for the final battle to reclaim Eldarion and defeat Lady Vespera.',
      type: 'major',
      location: 'Eldarion Castle',
      chapter: 'Final Chapter',
      act: 'Act III — The Reckoning',
      characters: ['AB', 'LV', 'KR', 'SR', 'EN'],
      characterColor: ['', 'purple', 'teal', 'pink', 'orange'],
      characterNames: [
        'Arin Blackwood',
        'Lady Vespera',
        'Kael Ren',
        'Sera Ravencroft',
        'Elder Nyx'
      ],
      tags: ['Battle', 'Climax', 'War', 'Resolution'],
      impact: 'high',
      story: 'The Lost Kingdom',
      createAt: 'Just now'
    }
  ];

  constructor(){
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type:['',Validators.required],
      location:[''],
      chapter:[''],
      act:['', Validators.required],
      impact:['', Validators.required],
      tags:[[]]
    })
  }

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.events);

    this.topbarService.action$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((action) => {
      this.handleAction(action);
    })
    this.events.set(this.mockEvents)
    this.selectedEvent.set(this.mockEvents[0]);
  }

  // methods 
  handleAction(action: string): void{
    if(action === 'new-event'){
      this.isModalOpen = true;
    }
  }
  
  filterByType(type: string): void{
    this.activeFilter = type;
  }

  filterByStory(story: string): void{
    this.selectedStory = story;
  }

  sortEvents(sortBy: string): void{
    this.currentSort = sortBy;
    if(sortBy === 'timeline'){
      this.events.update(event =>
      [...event].sort((a,b) => a.chapter.localeCompare(b.chapter))
      )
    }
    else if(sortBy === 'recent'){
      this.events.update(event =>
      [...event].sort((a,b) => b.createAt.localeCompare(a.createAt))
      )
    }
    else if(sortBy === 'type'){
      this.events.update(event => 
      [...event].sort((a,b) => a.type.localeCompare(b.type))
      )
    }
  }

  openAddModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.editingEventId = null;

    this.eventForm.reset();

    this.eventForm.patchValue({
      tags: []
    });
  }

  openEditModal(event: Event): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.editingEventId = event.id;

    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      type: event.type,
      location: event.location,
      chapter: event.chapter,
      act: event.act,
      impact: event.impact,
      tags: event.tags
    });
  }

  closeModal(): void{
    this.isModalOpen = false;
    this.isEditing = false;
    this.editingEventId = null;
    this.eventForm.reset();
  }

  deleteEvent(id: string): void{
    this.events.update(event => 
    [...event].filter(event => event.id != id)
    )
  }

  onSubmitEvent(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const formValue = {
      ...this.eventForm.value,
      tags: this.eventForm.value.tags ?? []
    };

    if (this.isEditing) {
      this.events.update(events =>
        events.map(event =>
          event.id === this.editingEventId
            ? {
                ...event,
                title: formValue.title,
                description: formValue.description,
                type: formValue.type,
                location: formValue.location,
                chapter: formValue.chapter,
                act: formValue.act,
                impact: formValue.impact,
                tags: formValue.tags
              }
            : event
        )
      );
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: formValue.title,
        description: formValue.description,
        type: formValue.type,
        location: formValue.location,
        chapter: formValue.chapter,
        act: formValue.act,
        characters: [],
        characterColor: [],
        characterNames: [],
        tags: formValue.tags,
        impact: formValue.impact,
        story: 'Untitled Story',
        createAt: 'Just now'
      };

      this.events.update(events => [...events, newEvent]);
    }

    this.closeModal();
  }

  getEventsByAct(act: string): Event[] {
    let filteredEvents = this.events().filter(event => event.act === act);

    if (this.activeFilter !== 'All Events') {
      filteredEvents = filteredEvents.filter(
        event => event.type === this.activeFilter.toLowerCase()
      );
    }

    if (this.selectedStory !== '') {
      filteredEvents = filteredEvents.filter(
        event => event.story === this.selectedStory
      );
    }

    return filteredEvents;
  }

}
