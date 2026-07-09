import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { Relation } from '../../core/models/relation';

@Component({
  selector: 'app-relations',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TitleCasePipe],
  templateUrl: './relations.html',
  styleUrl: './relations.css',
})
export class Relations implements OnInit {

  private topbarService = inject(TopbarService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  isModalOpen: boolean = false;
  isEditing: boolean = false;
  activeFilter: string = 'All';
  currentSort: string = '';
  selectedStory: string = '';
  editingRelationId: string | null = null;
  relationForm !: FormGroup;
  relations = signal<Relation[]>([]);
  selectedRelation = signal<Relation | null>(null);

  readonly relationTypes: string[] = [
    'All', 'Allies', 'Rivals', 'Romantic', 'Family', 'Mentor'
  ];

  readonly sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'type', label: 'By Type' },
    { value: 'strength', label: 'By Strength' }
  ];

  readonly storyOptions = [
    { value: 'lost-kingdom', label: 'The Lost Kingdom' },
    { value: 'beyond-stars', label: 'Beyond the Stars' }
  ];

  readonly strengthLevels: string[] = ['high', 'medium', 'low'];

  readonly typeOptions = [
    { value: 'ally', label: 'Ally' },
    { value: 'rival', label: 'Rival' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'family', label: 'Family' },
    { value: 'mentor', label: 'Mentor' }
  ];

  mockRelations: Relation[] = [
    {
      id: '1',
      character1Id: '1',
      character1Name: 'Arin Blackwood',
      character1Avtar: 'AB',
      character1Color: '',
      character2Id: '3',
      character2Name: 'Kael Ren',
      character2Avtar: 'KR',
      character2Color: 'teal',
      type: 'ally',
      label: 'Best Friends',
      strength: 'high',
      strengthLabel: 'Strong',
      description: 'Childhood friends bound by shared battles and memories. Trust runs deep, though recent events have tested their bond.',
      evolution: ['Strangers', 'Friends', 'Best Friends', 'Rivals?'],
      activeStage: 2,
      story: 'The Lost Kingdom',
      updateAt: '2d ago'
    },
    {
      id: '2',
      character1Id: '1',
      character1Name: 'Arin Blackwood',
      character1Avtar: 'AB',
      character1Color: '',
      character2Id: '2',
      character2Name: 'Lady Vespera',
      character2Avtar: 'LV',
      character2Color: 'purple',
      type: 'rival',
      label: 'Nemesis',
      strength: 'high',
      strengthLabel: 'Intense',
      description: 'The queen who destroyed his kingdom. Their rivalry drives the core conflict of the story.',
      evolution: ['Unknown', 'Enemies', 'Nemesis'],
      activeStage: 2,
      story: 'The Lost Kingdom',
      updateAt: '1d ago'
    },
    {
      id: '3',
      character1Id: '1',
      character1Name: 'Arin Blackwood',
      character1Avtar: 'AB',
      character1Color: '',
      character2Id: '5',
      character2Name: 'Sera Ravencroft',
      character2Avtar: 'SR',
      character2Color: 'pink',
      type: 'romantic',
      label: 'Love Interest',
      strength: 'medium',
      strengthLabel: 'Growing',
      description: 'A slow-burn romance born from mutual need. Sera healed his wounds, Arin gave her purpose.',
      evolution: ['Strangers', 'Trust Building', 'Love?'],
      activeStage: 1,
      story: 'The Lost Kingdom',
      updateAt: '3d ago'
    },
    {
      id: '4',
      character1Id: '1',
      character1Name: 'Arin Blackwood',
      character1Avtar: 'AB',
      character1Color: '',
      character2Id: '4',
      character2Name: 'Elder Nyx',
      character2Avtar: 'EN',
      character2Color: 'orange',
      type: 'mentor',
      label: 'Guide',
      strength: 'medium',
      strengthLabel: 'Steady',
      description: 'Elder Nyx guides Arin with cryptic wisdom. Their bond is built on respect and shared duty.',
      evolution: ['Stranger', 'Mentor & Student'],
      activeStage: 1,
      story: 'The Lost Kingdom',
      updateAt: '5d ago'
    },
    {
      id: '5',
      character1Id: '1',
      character1Name: 'Arin Blackwood',
      character1Avtar: 'AB',
      character1Color: '',
      character2Id: '6',
      character2Name: 'Duke Maren',
      character2Avtar: 'DM',
      character2Color: 'green',
      type: 'family',
      label: 'Cousin',
      strength: 'low',
      strengthLabel: 'Distant',
      description: 'Estranged cousin who chose political survival over family loyalty when the kingdom fell.',
      evolution: ['Close Family', 'Estranged', 'Reconcile?'],
      activeStage: 1,
      story: 'The Lost Kingdom',
      updateAt: '1w ago'
    }
  ];

  constructor() {
    this.relationForm = this.fb.group({
      character1Name: ['', Validators.required],
      character2Name: ['', Validators.required],
      type: ['', Validators.required],
      label: ['', Validators.required],
      strength: ['', Validators.required],
      strengthLabel: [''],
      description: ['', Validators.required],
      story: ['']
    });
  }

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.relations);

    this.topbarService.action$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((action) => {
      this.handleAction(action);
    });

    this.relations.set(this.mockRelations);
    this.selectedRelation.set(this.mockRelations[0]);
  }

  // Handle topbar action clicks
  handleAction(action: string): void {
    if (action === 'new-relation') {
      this.openAddModal();
    }
  }

  // Filter relations by type tab click
  filterByType(type: string): void {
    this.activeFilter = type;
  }

  // Filter relations by selected story dropdown
  filterByStory(story: string): void {
    this.selectedStory = story;
  }

  // Sort relations based on user selection
  sortRelations(sortBy: string): void {
    this.currentSort = sortBy;

    if (sortBy === 'recent') {
      this.relations.update(relations =>
        [...relations].sort((a, b) => b.updateAt.localeCompare(a.updateAt))
      );
    } else if (sortBy === 'type') {
      this.relations.update(relations =>
        [...relations].sort((a, b) => a.type.localeCompare(b.type))
      );
    } else if (sortBy === 'strength') {
      const strengthOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
      this.relations.update(relations =>
        [...relations].sort((a, b) => strengthOrder[a.strength] - strengthOrder[b.strength])
      );
    }
  }

  // Open modal in ADD mode with a clean empty form
  openAddModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.editingRelationId = null;
    this.relationForm.reset();
  }

  // Open modal in EDIT mode and prefill form with selected relation data
  openEditModal(relation: Relation): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.editingRelationId = relation.id;

    this.relationForm.patchValue({
      character1Name: relation.character1Name,
      character2Name: relation.character2Name,
      type: relation.type,
      label: relation.label,
      strength: relation.strength,
      strengthLabel: relation.strengthLabel,
      description: relation.description,
      story: relation.story
    });
  }

  // Close modal and reset all edit state
  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.editingRelationId = null;
    this.relationForm.reset();
  }

  // Remove a relation from the list by id
  deleteRelation(id: string): void {
    this.relations.update(relations =>
      relations.filter(relation => relation.id !== id)
    );
  }

  // Handle form submit for both ADD and EDIT flow
  onSubmitRelation(): void {
    if (this.relationForm.invalid) {
      this.relationForm.markAllAsTouched();
      return;
    }

    const formValue = this.relationForm.value;

    if (this.isEditing) {
      this.relations.update(relations =>
        relations.map(relation =>
          relation.id === this.editingRelationId
            ? {
                ...relation,
                character1Name: formValue.character1Name,
                character2Name: formValue.character2Name,
                type: formValue.type,
                label: formValue.label,
                strength: formValue.strength,
                strengthLabel: formValue.strengthLabel,
                description: formValue.description,
                story: formValue.story
              }
            : relation
        )
      );
    } else {
      const newRelation: Relation = {
        id: Date.now().toString(),
        character1Id: '',
        character1Name: formValue.character1Name,
        character1Avtar: formValue.character1Name
          .split(' ')
          .map((word: string) => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        character1Color: '',
        character2Id: '',
        character2Name: formValue.character2Name,
        character2Avtar: formValue.character2Name
          .split(' ')
          .map((word: string) => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        character2Color: 'teal',
        type: formValue.type,
        label: formValue.label,
        strength: formValue.strength,
        strengthLabel: formValue.strengthLabel || '',
        description: formValue.description,
        evolution: ['Started'],
        activeStage: 0,
        story: formValue.story || 'Untitled Story',
        updateAt: 'Just now'
      };
      this.relations.update(relations => [...relations, newRelation]);
    }

    this.closeModal();
  }

  // Get relations after applying type + story filters
  getFilteredRelations(): Relation[] {
    let filtered = this.relations();

    if (this.activeFilter !== 'All') {
      const typeMap: Record<string, string> = {
        'Allies': 'ally',
        'Rivals': 'rival',
        'Romantic': 'romantic',
        'Family': 'family',
        'Mentor': 'mentor'
      };
      const filterType = typeMap[this.activeFilter] || this.activeFilter.toLowerCase();
      filtered = filtered.filter(relation => relation.type === filterType);
    }

    if (this.selectedStory !== '') {
      filtered = filtered.filter(relation => relation.story === this.selectedStory);
    }

    return filtered;
  }

  // Count total relations for a given type — used in stats row
  getStatsCount(type: string): number {
    return this.relations().filter(relation => relation.type === type).length;
  }
}