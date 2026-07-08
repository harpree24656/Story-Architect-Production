import { Component, inject, OnInit, signal, DestroyRef, Signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { Character } from '../../core/models/character'

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, CommonModule],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  private topbarService =  inject(TopbarService);
  private router = inject(Router)
  private fb = inject(FormBuilder)
  private destroyRef = inject(DestroyRef)
  
  // variables declarations
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  activeFilter: string = 'All Character'
  currentSort: string = ''
  viewMode: string = 'grid'
  editingCharacterId: string | null = null
  characterForm !: FormGroup
  characters = signal<Character[]>([])
  selectedCharacter = signal<Character | null>(null)


  // declaration main accessable items 
  readonly roleFilters: string[] = [
    'All Characters',
    'Main',
    'Supporting',
    'Antagonist',
    'Minor'
  ]
  readonly sortOptions: {value: string, label: string}[] = [
    {value: 'name', label: 'Name A-Z'},
    {value: 'recent', label: 'Recently Added'},
    {value: 'story', label: 'By Story'}
  ]
  readonly viewModes: string[] = [
    'grid',
    'list'
  ]
  readonly roleClassMap: Record<string, string> = {
    main: 'main',
    supporting: 'supporting',
    antagonist: 'antagonist',
    minor: 'minor'
  }

  // declare array
  mockCharacters: Character[] = [
    {
      id: '1',
      name: 'Arin Blackwood',
      role: 'main',
      avatar: 'AB',
      avatarColor: '',
      description: 'A young warrior seeking redemption after the fall of his kingdom. Brave, loyal, but haunted by past failures.',
      backstory: 'Born into the noble Blackwood family, Arin was trained as a knight from childhood. After the kingdom fell to betrayal from within, he was exiled and branded a traitor. Now he wanders the lands seeking allies and redemption.',
      motivations: 'Restore honor to the Blackwood name. Reclaim the kingdom. Protect the innocent from the shadow queen’s reign.',
      age: '27',
      gender: 'Male',
      race: 'Human',
      occupation: 'Exiled Knight',
      affiliation: 'Order of the Silver Dawn',
      traits: ['Brave', 'Loyal', 'Haunted', 'Strategic', 'Compassionate'],
      relations: 5,
      events: 12,
      arcs: 3,
      story: 'The Lost Kingdom',
      createdAt: '2 days ago'
    },
    {
      id: '2',
      name: 'Lady Vespera',
      role: 'antagonist',
      avatar: 'LV',
      avatarColor: 'purple',
      description: 'The cunning queen of shadows who manipulates kingdoms from behind the throne. Cold, calculating, brilliant.',
      backstory: 'Vespera rose from obscurity through intelligence, ambition, and ruthless political strategy. She now controls the court from the shadows and bends powerful rulers to her will.',
      motivations: 'Expand her influence, maintain control over the kingdom, and eliminate anyone who threatens her power.',
      age: '34',
      gender: 'Female',
      race: 'Human',
      occupation: 'Shadow Queen',
      affiliation: 'Court of Shadows',
      traits: ['Cunning', 'Ruthless', 'Brilliant'],
      relations: 8,
      events: 10,
      arcs: 2,
      story: 'The Lost Kingdom',
      createdAt: '4 days ago'
    },
    {
      id: '3',
      name: 'Kael Ren',
      role: 'supporting',
      avatar: 'KR',
      avatarColor: 'teal',
      description: 'Arin’s childhood friend turned rebel leader. Passionate about freedom, sometimes reckless in his methods.',
      backstory: 'Kael grew up alongside Arin but chose a different path after witnessing injustice across the kingdom. He formed a rebel group to resist tyranny and inspire the oppressed.',
      motivations: 'Fight for freedom, overthrow corruption, and protect his people no matter the cost.',
      age: '26',
      gender: 'Male',
      race: 'Human',
      occupation: 'Rebel Leader',
      affiliation: 'Freeborn Resistance',
      traits: ['Rebel', 'Passionate', 'Reckless'],
      relations: 3,
      events: 9,
      arcs: 2,
      story: 'The Lost Kingdom',
      createdAt: '1 week ago'
    },
    {
      id: '4',
      name: 'Elder Nyx',
      role: 'minor',
      avatar: 'EN',
      avatarColor: 'orange',
      description: 'The ancient keeper of forbidden knowledge. Guides Arin with cryptic wisdom and riddles from another age.',
      backstory: 'Nyx has lived for centuries, guarding fragments of forgotten truth and hidden magic. Few understand his origins, but many seek his wisdom.',
      motivations: 'Preserve ancient knowledge, guide worthy heroes, and prevent dangerous truths from falling into the wrong hands.',
      age: '300+',
      gender: 'Male',
      race: 'Ancient Being',
      occupation: 'Keeper of Forbidden Knowledge',
      affiliation: 'The Old Archives',
      traits: ['Wise', 'Cryptic', 'Ancient'],
      relations: 2,
      events: 6,
      arcs: 1,
      story: 'The Lost Kingdom',
      createdAt: '1 week ago'
    },
    {
      id: '5',
      name: 'Sera Ravencroft',
      role: 'supporting',
      avatar: 'SR',
      avatarColor: 'pink',
      description: 'A rogue healer with a mysterious past. She walks the line between light and darkness with every choice.',
      backstory: 'Once part of a secretive order of healers, Sera abandoned its strict doctrine after uncovering disturbing truths. She now travels alone, helping where she can while hiding her past.',
      motivations: 'Redeem herself, protect the vulnerable, and uncover the truth behind her fractured past.',
      age: '29',
      gender: 'Female',
      race: 'Human',
      occupation: 'Rogue Healer',
      affiliation: 'Wanderer',
      traits: ['Mysterious', 'Healer', 'Complex'],
      relations: 4,
      events: 8,
      arcs: 2,
      story: 'The Lost Kingdom',
      createdAt: '3 days ago'
    }
  ];
  // include constructor
  constructor() {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      description: ['', Validators.required],
      age: ['', Validators.required],
      gender: [''],
      race: [''],
      occupation: [''],
      affiliation: [''],
      backstory: ['', Validators.required],
      motivations: [''],
      traits: [[]]
    });
  }

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.characters);

    this.topbarService.action$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((action) => {
      this.handleAction(action);
    })
    this.characters.set(this.mockCharacters);
    this.selectedCharacter.set(this.mockCharacters[0]);
  }

  handleAction(action: string): void{
    if(action === 'new-character'){
      this.isModalOpen = true;
    }
  } 
  
  // filter the data
  filterByRole(role: string): void{
    this.activeFilter = role
  }
  
  // sort by dropdown option
  sortCharacters(sortBy: string): void{
    if(sortBy === 'name'){
      this.characters.update(character => 
        [...character].sort((a, b)=> a.name.localeCompare(b.name))
      )
    }
    else if(sortBy === 'recent'){
      this.characters.update(character => 
      [...character].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      )
    }
    else if(sortBy === 'story'){
      this.characters.update(character => 
      [...character].sort((a, b) => a.story.localeCompare(b.story))
      )
    }
  }

  // toggle view of character detail
  toggleView(mode: string): void{
    this.viewMode = mode
  }

  // change Ui mode between grid, list
  selectCharacter(character: Character): void{
    this.selectedCharacter.set(character)
  }
  
  // detail panel should show the character
  openAddModal(): void{
    this.isModalOpen = true
    this.isEditing = false
    this.editingCharacterId = null
    this.characterForm.reset()
    this.characterForm.patchValue({
      traits: []
    })
  }

  // editing old character
  openEditModal(character: Character): void{
    this.isModalOpen = true;
    this.isEditing = true;
    this.editingCharacterId = character.id
    this.characterForm.patchValue({
      name: '',
      role: '',
      description: '',
      age: '',
      gender: '',
      race: '',
      occupation: '',
      affiliation: '',
      backstory: '',
      motivation: '',
      traits: '' 
    })
  }
  
  // to close model, form clear, edit state button
  closeModal(): void{
    this.isModalOpen = false;
    this.isEditing = false;
    this.editingCharacterId = null;
    this.characterForm.reset()
  }

  deleteCharacter(id: string): void{
    this.characters.update(character => 
    [...character].filter(character => character.id != id)
    )
  }

  onSubmitCharacter(): void{
    if(this.characterForm.invalid){
      this.characterForm.markAllAsTouched();
      return;
    }
    const formValue = {
      ...this.characterForm.value,
      traits: this.characterForm.value.traits ?? []
    }
    if(this.isEditing){
      this.characters.update(characters =>
        characters.map( character => 
          character.id === this.editingCharacterId
          ? {
            ...character,
              name: formValue.name,
              role: formValue.role,
              description: formValue.description,
              age: formValue.age,
              gender: formValue.gender,
              race: formValue.race,
              occupation: formValue.occupation,
              affiliation: formValue.affiliation,
              backstory: formValue.backstory,
              motivations: formValue.motivations,
              traits: formValue.traits
          }
          : character 
        )
      )
    }
    if(
      this.selectedCharacter && this.selectedCharacter()?.id === this.editingCharacterId
    ){
      this.selectedCharacter.update(character => 
        character ? {
          ...character,
          name: formValue.name,
          role: formValue.role,
          description: formValue.description,
          age: formValue.age,
          gender: formValue.gender,
          race: formValue.race,
          occupation: formValue.occupation,
          affiliation: formValue.affiliation,
          backstory: formValue.backstory,
          motivations: formValue.motivations,
          traits: formValue.traits
        } 
        : null
      );
    }
    else {
      const newCharacter: Character = {
        id: Date.now().toString(),
        name: formValue.name,
        role: formValue.role,
        description: formValue.description,
        age: formValue.age,
        gender: formValue.gender,
        race: formValue.race,
        occupation: formValue.occupation,
        affiliation: formValue.affiliation,
        backstory: formValue.backstory,
        motivations: formValue.motivations,
        traits: formValue.traits,
        avatar: formValue.name
          .split(' ')
          .map((word: string) => word[0])
          .join('')
          .toUpperCase(),
        avatarColor: '',
        relations: 0,
        events: 0,
        arcs: 0,
        story: 'Untitled Story',
        createdAt: 'Just now'
      };
      this.characters.update(characters => [...characters, newCharacter]);
      this.selectedCharacter.set(newCharacter);
    }
    this.closeModal()
  }
}
