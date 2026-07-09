import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass, TitleCasePipe  } from '@angular/common';
import { Router } from '@angular/router';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { WorldEntry } from '../../core/models/worldEntry'; 

@Component({
  selector: 'app-world-library',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TitleCasePipe],
  templateUrl: './world-library.html',
  styleUrl: './world-library.css',
})
export class WorldLibrary implements OnInit {
  private topbarService = inject(TopbarService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  // state properties
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  activeFilter: string = 'all';
  currentSort: string = '';
  selectedStory: string = '';
  editingEntryId: string | null = null;
  entryForm!: FormGroup;
  entries = signal<WorldEntry[]>([]);
  selectedEntry = signal<WorldEntry | null>(null);

  // static readonly arrays
  readonly categoryTabs = [
    { label: 'All', value: 'all', icon: '📚' },
    { label: 'Locations', value: 'location', icon: '📍' },
    { label: 'Factions', value: 'faction', icon: '🏛️' },
    { label: 'Cultures', value: 'culture', icon: '🌿' },
    { label: 'Magic', value: 'magic', icon: '✨' },
    { label: 'Creatures', value: 'creature', icon: '🐉' },
    { label: 'Lore', value: 'lore', icon: '📜' }
  ];

  readonly sortOptions = [
    { label: 'Name A-Z', value: 'name' },
    { label: 'Recently Added', value: 'recent' },
    { label: 'Category', value: 'category' }
  ];

  readonly storyOptions = ['The Lost Kingdom'];

  readonly threatLevels = ['low', 'medium', 'high'];

  readonly rarityLevels = ['common', 'rare', 'legendary'];

  readonly sectionMeta = [
    { category: 'location', icon: '📍', label: 'Locations' },
    { category: 'faction', icon: '🏛️', label: 'Factions' },
    { category: 'culture', icon: '🌿', label: 'Cultures' },
    { category: 'magic', icon: '✨', label: 'Magic Systems' },
    { category: 'creature', icon: '🐉', label: 'Creatures' },
    { category: 'lore', icon: '📜', label: 'Lore & History' }
  ];

  // mock data
  mockEntries: WorldEntry[] = [
    // Locations
    {
      id: 'entry-1',
      title: 'Blackwood Keep',
      description: 'The ancestral fortress of House Blackwood, now in ruins after the shadow army\'s attack. Located in the Northern Province.',
      category: 'location',
      coverEmoji: '🏰',
      coverClass: 'location-cover',
      tags: ['Ruins', 'Fortress', 'North'],
      story: 'The Lost Kingdom',
      linkedCount: 3,
      linkedLabel: 'Characters',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: '',
      createdAt: new Date()
    },
    {
      id: 'entry-2',
      title: 'Ashwood Forest',
      description: 'A vast ancient forest on the Eastern Border. Home to forgotten creatures and the place where Arin first meets Sera.',
      category: 'location',
      coverEmoji: '🌲',
      coverClass: 'forest-cover',
      tags: ['Forest', 'Ancient', 'East'],
      story: 'The Lost Kingdom',
      linkedCount: 2,
      linkedLabel: 'Characters',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: '',
      createdAt: new Date()
    },
    {
      id: 'entry-3',
      title: 'Eldarion Capital',
      description: 'The grand capital city and seat of power. Controlled by Lady Vespera after the coup. Site of the final siege.',
      category: 'location',
      coverEmoji: '🏙️',
      coverClass: 'city-cover',
      tags: ['Capital', 'City', 'Central'],
      story: 'The Lost Kingdom',
      linkedCount: 5,
      linkedLabel: 'Characters',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: '',
      createdAt: new Date()
    },

    // Factions
    {
      id: 'entry-4',
      title: 'Order of the Silver Dawn',
      description: 'An ancient order of knights sworn to protect the realm. Disbanded after Blackwood Keep fell, but loyalists remain in hiding.',
      category: 'faction',
      coverEmoji: '🛡️',
      coverClass: 'faction-cover',
      tags: ['Knights', 'Honor', 'Disbanded'],
      story: 'The Lost Kingdom',
      linkedCount: 4,
      linkedLabel: 'Members',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: '',
      createdAt: new Date()
    },
    {
      id: 'entry-5',
      title: 'Shadow Court',
      description: 'Lady Vespera\'s secret council of spies, assassins, and dark mages. They operate from the shadows to maintain her grip on power.',
      category: 'faction',
      coverEmoji: '🌑',
      coverClass: 'shadow-cover',
      tags: ['Dark', 'Espionage', 'Evil'],
      story: 'The Lost Kingdom',
      linkedCount: 6,
      linkedLabel: 'Members',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: '',
      createdAt: new Date()
    },

    // Magic Systems
    {
      id: 'entry-6',
      title: 'Runic Binding',
      description: 'An ancient magic system that channels power through carved runes. Requires physical inscriptions and immense focus.',
      category: 'magic',
      coverEmoji: '🔮',
      coverClass: 'magic-cover',
      tags: ['Ancient', 'Runes', 'Physical'],
      story: 'The Lost Kingdom',
      linkedCount: 2,
      linkedLabel: 'Users',
      location: null,
      rules: [
        'Must carve runes into stone or metal',
        'Power drains life force if overused',
        'Only works within line of sight'
      ],
      threat: null,
      rarity: null,
      dateLabel: '',
      createdAt: new Date()
    },
    {
      id: 'entry-7',
      title: 'Shadow Weaving',
      description: 'Forbidden dark magic that manipulates shadows into physical form. Draws power from fear and darkness.',
      category: 'magic',
      coverEmoji: '🌑',
      coverClass: 'dark-magic-cover',
      tags: ['Forbidden', 'Shadow', 'Dark'],
      story: 'The Lost Kingdom',
      linkedCount: 3,
      linkedLabel: 'Users',
      location: null,
      rules: [
        'Requires darkness to function',
        'Corrupts the user over time'
      ],
      threat: null,
      rarity: null,
      dateLabel: '',
      createdAt: new Date()
    },

    // Creatures
    {
      id: 'entry-8',
      title: 'Ashwood Direwolf',
      description: 'Massive wolves native to the Ashwood Forest. Intelligent, pack hunters. Some can be bonded with by those possessing Runic Binding magic.',
      category: 'creature',
      coverEmoji: '🐺',
      coverClass: 'creature-cover',
      tags: ['Predator', 'Pack', 'Bondable'],
      story: 'The Lost Kingdom',
      linkedCount: 0,
      linkedLabel: '',
      location: 'Ashwood Forest',
      rules: [],
      threat: 'high',
      rarity: 'rare',
      dateLabel: '',
      createdAt: new Date()
    },
    {
      id: 'entry-9',
      title: 'Stormwing Raptor',
      description: 'Giant birds of prey that nest in the Stoneridge Mountains. Used as war mounts by the Silver Dawn in ancient times.',
      category: 'creature',
      coverEmoji: '🦅',
      coverClass: 'creature-cover-2',
      tags: ['Flying', 'War Mount', 'Mountain'],
      story: 'The Lost Kingdom',
      linkedCount: 0,
      linkedLabel: '',
      location: 'Stoneridge Mountains',
      rules: [],
      threat: 'medium',
      rarity: 'legendary',
      dateLabel: '',
      createdAt: new Date()
    },

    // Lore
    {
      id: 'entry-10',
      title: 'The Founding of Eldarion',
      description: 'Over a thousand years ago, the Five Great Houses united under the first King to build the city of Eldarion as a symbol of peace.',
      category: 'lore',
      coverEmoji: '📜',
      coverClass: '',
      tags: ['History', 'Origin'],
      story: 'The Lost Kingdom',
      linkedCount: 0,
      linkedLabel: '',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: 'Added 1 week ago',
      createdAt: new Date()
    },
    {
      id: 'entry-11',
      title: 'The Oath of the Silver Dawn',
      description: 'Every knight swears a sacred oath binding their soul to runic magic. Breaking the oath results in losing all magical ability.',
      category: 'lore',
      coverEmoji: '📜',
      coverClass: '',
      tags: ['Tradition', 'Magic'],
      story: 'The Lost Kingdom',
      linkedCount: 0,
      linkedLabel: '',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: 'Added 5 days ago',
      createdAt: new Date()
    },
    {
      id: 'entry-12',
      title: 'The Shadow Plague of Year 400',
      description: 'A devastating magical plague caused by uncontrolled Shadow Weaving that killed thousands and led to the banning of dark magic.',
      category: 'lore',
      coverEmoji: '📜',
      coverClass: '',
      tags: ['Catastrophe', 'Dark Magic'],
      story: 'The Lost Kingdom',
      linkedCount: 0,
      linkedLabel: '',
      location: null,
      rules: [],
      threat: null,
      rarity: null,
      dateLabel: 'Added 3 days ago',
      createdAt: new Date()
    }
  ];

  // constructor
  constructor() {
    this.entryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['location', Validators.required],
      coverEmoji: ['📍', Validators.required],
      coverClass: ['location-cover'],
      tags: [''],
      story: ['The Lost Kingdom', Validators.required],
      linkedCount: [0],
      linkedLabel: ['Characters'],
      location: [''],
      rules: [''],
      threat: ['low'],
      rarity: ['common'],
      dateLabel: ['']
    });
  }

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.worldLibrary);

    this.topbarService.action$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        this.handleAction(action);
      });

    this.entries.set(this.mockEntries);
  }

  // handle topbar action
  handleAction(action: string): void {
    if (action === 'add-entry') {
      this.openAddModal();
    }
  }

  // filter by category tab
  filterByCategory(category: string): void {
    this.activeFilter = category;
  }

  // sort entries by name, recent, or category
  sortEntries(sortBy: string): void {
    this.currentSort = sortBy;

    if (sortBy === 'name') {
      this.entries.update(entries =>
        [...entries].sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (sortBy === 'recent') {
      this.entries.update(entries =>
        [...entries].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      );
    } else if (sortBy === 'category') {
      this.entries.update(entries =>
        [...entries].sort((a, b) => a.category.localeCompare(b.category))
      );
    }
  }

  // open modal in add mode
  openAddModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.editingEntryId = null;
    this.entryForm.reset({
      title: '',
      description: '',
      category: 'location',
      coverEmoji: '📍',
      coverClass: 'location-cover',
      tags: '',
      story: 'The Lost Kingdom',
      linkedCount: 0,
      linkedLabel: 'Characters',
      location: '',
      rules: '',
      threat: 'low',
      rarity: 'common',
      dateLabel: ''
    });
  }

  // open modal in edit mode
  openEditModal(entry: WorldEntry): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.editingEntryId = entry.id;
    this.entryForm.patchValue({
      title: entry.title,
      description: entry.description,
      category: entry.category,
      coverEmoji: entry.coverEmoji,
      coverClass: entry.coverClass,
      tags: entry.tags.join(', '),
      story: entry.story,
      linkedCount: entry.linkedCount,
      linkedLabel: entry.linkedLabel,
      location: entry.location || '',
      rules: entry.rules.join('\n'),
      threat: entry.threat || 'low',
      rarity: entry.rarity || 'common',
      dateLabel: entry.dateLabel
    });
  }

  // close modal and reset state
  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.editingEntryId = null;
    this.entryForm.reset();
  }

  // delete entry by id
  deleteEntry(id: string): void {
    this.entries.update(entries => entries.filter(entry => entry.id !== id));
  }

  // handle form submit for add or edit
  onSubmitEntry(): void {
    if (this.entryForm.invalid) {
      return;
    }

    const formValue = this.entryForm.value;

    // convert tags string to array
    const tagsArray: string[] = formValue.tags
      ? formValue.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
      : [];

    // convert rules string to array (split by newline)
    const rulesArray: string[] = formValue.rules
      ? formValue.rules.split('\n').map((r: string) => r.trim()).filter((r: string) => r)
      : [];

    if (this.isEditing) {
      this.entries.update(entries =>
        entries.map(entry => {
          if (entry.id === this.editingEntryId) {
            return {
              ...entry,
              ...formValue,
              tags: tagsArray,
              rules: rulesArray,
              id: entry.id,
              createdAt: entry.createdAt
            };
          }
          return entry;
        })
      );
    } else {
      const newEntry: WorldEntry = {
        ...formValue,
        id: 'entry-' + Date.now(),
        tags: tagsArray,
        rules: rulesArray,
        location: formValue.location || null,
        threat: formValue.category === 'creature' ? formValue.threat : null,
        rarity: formValue.category === 'creature' ? formValue.rarity : null,
        createdAt: new Date()
      };
      this.entries.update(entries => [...entries, newEntry]);
    }

    this.closeModal();
  }

  // get entries filtered by category
  getEntriesByCategory(category: string): WorldEntry[] {
    return this.entries().filter(entry => entry.category === category);
  }

  // get count of entries by category
  getStatsCount(category: string): number {
    return this.entries().filter(entry => entry.category === category).length;
  }

  // get total count of all entries
  getTotalCount(): number {
    return this.entries().length;
  }

  // check if section should be shown based on active filter
  shouldShowSection(category: string): boolean {
    return this.activeFilter === 'all' || this.activeFilter === category;
  }

  // get category icon from sectionMeta
  getCategoryIcon(category: string): string {
    const meta = this.sectionMeta.find(m => m.category === category);
    return meta ? meta.icon : '📚';
  }

  // get category label from sectionMeta
  getCategoryLabel(category: string): string {
    const meta = this.sectionMeta.find(m => m.category === category);
    return meta ? meta.label : category;
  }
}