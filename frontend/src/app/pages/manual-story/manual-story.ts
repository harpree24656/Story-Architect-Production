import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { Chapter, ChapterCharacter, LinkedEvent } from '../../core/models/chapter'; 

@Component({
  selector: 'app-manual-story',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './manual-story.html',
  styleUrl: './manual-story.css',
})
export class ManualStory implements OnInit {

  private topbarService = inject(TopbarService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  // state properties
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  activeFilter: string = 'All';
  currentSort: string = '';
  selectedStory: string = '';
  editingChapterId: string | null = null;
  chapterForm!: FormGroup;
  chapters = signal<Chapter[]>([]);
  selectedChapter = signal<Chapter | null>(null);

  // editor state
  editorContent: string = '';
  chapterNotes: string = '';
  isPreviewOpen: boolean = false;

  // modal state for adding characters/events
  isCharacterModalOpen: boolean = false;
  isEventModalOpen: boolean = false;
  newCharacterName: string = '';
  newCharacterRole: string = 'Supporting';
  newCharacterColor: string = '';
  newEventName: string = '';
  newEventImpact: 'major' | 'minor' = 'minor';

  // static readonly arrays
  readonly storyOptions = ['The Lost Kingdom'];
  readonly actOptions = ['Act I', 'Act II', 'Act III'];
  readonly povOptions = ['First Person', 'Third Person', 'Omniscient'];
  readonly genreOptions = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Thriller'];
  readonly toneOptions = ['Dark & Epic', 'Light & Fun', 'Serious', 'Comedic', 'Mysterious'];
  readonly characterRoles = ['Main Character', 'Supporting', 'Antagonist', 'Minor'];
  readonly avatarColors = ['', 'pink', 'purple', 'teal', 'orange'];

  readonly toolbarGroups = [
    {
      type: 'format',
      buttons: [
        { label: 'B', command: 'bold', style: 'bold' },
        { label: 'I', command: 'italic', style: 'italic' },
        { label: 'U', command: 'underline', style: 'underline' },
        { label: 'S', command: 'strikeThrough', style: 'strike' }
      ]
    },
    {
      type: 'heading',
      buttons: [
        { label: 'H1', command: 'formatBlock', value: 'h1' },
        { label: 'H2', command: 'formatBlock', value: 'h2' },
        { label: 'H3', command: 'formatBlock', value: 'h3' }
      ]
    },
    {
      type: 'list',
      buttons: [
        { label: '•≡', command: 'insertUnorderedList' },
        { label: '1≡', command: 'insertOrderedList' },
        { label: '❝', command: 'formatBlock', value: 'blockquote' }
      ]
    },
    {
      type: 'media',
      buttons: [
        { label: '🔗', command: 'createLink' },
        { label: '🖼️', command: 'insertImage' },
        { label: '—', command: 'insertHorizontalRule' }
      ]
    },
    {
      type: 'history',
      buttons: [
        { label: '↩️', command: 'undo' },
        { label: '↪️', command: 'redo' }
      ]
    }
  ];

  // mock data
  mockChapters: Chapter[] = [
    {
      id: 'chapter-1',
      number: 1,
      title: 'Prologue',
      content: 'The kingdom stood proud, unaware of the storm that was coming. Whispers of dark magic drifted from the north, but no one listened.',
      wordCount: 1240,
      charCount: 6500,
      status: 'done',
      act: 'Act I',
      story: 'The Lost Kingdom',
      pov: 'Third Person',
      genre: 'Fantasy',
      tone: 'Dark & Epic',
      characters: [],
      linkedEvents: [],
      notes: '',
      createdAt: new Date()
    },
    {
      id: 'chapter-2',
      number: 2,
      title: 'The Fall',
      content: 'Blackwood Keep burned through the night. Screams echoed from every hall as shadows swept through stone corridors.',
      wordCount: 2180,
      charCount: 11500,
      status: 'done',
      act: 'Act I',
      story: 'The Lost Kingdom',
      pov: 'Third Person',
      genre: 'Fantasy',
      tone: 'Dark & Epic',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '', role: 'Main Character' }
      ],
      linkedEvents: [
        { name: 'The Fall of Blackwood Keep', impact: 'major' }
      ],
      notes: '',
      createdAt: new Date()
    },
    {
      id: 'chapter-3',
      number: 3,
      title: 'Into the Wild',
      content: ``,
      wordCount: 860,
      charCount: 4512,
      status: 'writing',
      act: 'Act I',
      story: 'The Lost Kingdom',
      pov: 'Third Person',
      genre: 'Fantasy',
      tone: 'Dark & Epic',
      characters: [
        { name: 'Arin Blackwood', initials: 'AB', color: '', role: 'Main Character' },
        { name: 'Sera Ravencroft', initials: 'SR', color: 'pink', role: 'Supporting' }
      ],
      linkedEvents: [
        { name: 'The Fall of Blackwood Keep', impact: 'major' },
        { name: 'Arin Meets Sera', impact: 'minor' }
      ],
      notes: 'Introduce Sera as mysterious but trustworthy. Show Arin\'s vulnerability. Foreshadow the healing magic connection.',
      createdAt: new Date()
    },
    {
      id: 'chapter-4',
      number: 4,
      title: 'The Healer',
      content: '',
      wordCount: 0,
      charCount: 0,
      status: 'empty',
      act: 'Act II',
      story: 'The Lost Kingdom',
      pov: 'Third Person',
      genre: 'Fantasy',
      tone: 'Dark & Epic',
      characters: [],
      linkedEvents: [],
      notes: '',
      createdAt: new Date()
    },
    {
      id: 'chapter-5',
      number: 5,
      title: 'Shadows Rise',
      content: '',
      wordCount: 0,
      charCount: 0,
      status: 'empty',
      act: 'Act II',
      story: 'The Lost Kingdom',
      pov: 'Third Person',
      genre: 'Fantasy',
      tone: 'Dark & Epic',
      characters: [],
      linkedEvents: [],
      notes: '',
      createdAt: new Date()
    },
    {
      id: 'chapter-6',
      number: 6,
      title: 'Untitled',
      content: '',
      wordCount: 0,
      charCount: 0,
      status: 'empty',
      act: 'Act III',
      story: 'The Lost Kingdom',
      pov: 'Third Person',
      genre: 'Fantasy',
      tone: 'Dark & Epic',
      characters: [],
      linkedEvents: [],
      notes: '',
      createdAt: new Date()
    }
  ];

  // constructor
  constructor() {
    this.chapterForm = this.fb.group({
      title: ['', Validators.required],
      act: ['Act I', Validators.required],
      story: ['The Lost Kingdom', Validators.required],
      pov: ['Third Person', Validators.required],
      genre: ['Fantasy', Validators.required],
      tone: ['Dark & Epic', Validators.required]
    });
  }

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.manualStory);

    this.topbarService.action$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        this.handleAction(action);
      });

    this.chapters.set(this.mockChapters);

    // set default selected chapter (Into the Wild)
    const defaultChapter = this.mockChapters.find(c => c.id === 'chapter-3');
    if (defaultChapter) {
      this.selectedChapter.set(defaultChapter);
      this.editorContent = defaultChapter.content;
      this.chapterNotes = defaultChapter.notes;
    }
  }

  // handle topbar action
  handleAction(action: string): void {
    if (action === 'preview') {
      this.isPreviewOpen = true;
    }
    if (action === 'publish') {
      // TODO: publish logic
    }
  }

  // select a chapter and load its content
  selectChapter(chapter: Chapter): void {
    this.saveDraft();
    this.selectedChapter.set(chapter);
    this.editorContent = chapter.content;
    this.chapterNotes = chapter.notes;
  }

  // add new empty chapter
  addNewChapter(): void {
    const nextNumber = this.chapters().length + 1;
    const newChapter: Chapter = {
      id: 'chapter-' + Date.now(),
      number: nextNumber,
      title: 'Untitled',
      content: '',
      wordCount: 0,
      charCount: 0,
      status: 'empty',
      act: 'Act I',
      story: 'The Lost Kingdom',
      pov: 'Third Person',
      genre: 'Fantasy',
      tone: 'Dark & Epic',
      characters: [],
      linkedEvents: [],
      notes: '',
      createdAt: new Date()
    };
    this.chapters.update(chapters => [...chapters, newChapter]);
  }

  // delete chapter by id
  deleteChapter(id: string): void {
    this.chapters.update(chapters => chapters.filter(c => c.id !== id));
    if (this.selectedChapter()?.id === id) {
      this.selectedChapter.set(null);
      this.editorContent = '';
      this.chapterNotes = '';
    }
  }

  // update editor content
  updateEditorContent(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.editorContent = target.value;
  }

  // update chapter title
  updateChapterTitle(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newTitle = target.value;
    const current = this.selectedChapter();
    if (!current) return;

    this.chapters.update(chapters =>
      chapters.map(c => c.id === current.id ? { ...c, title: newTitle } : c)
    );
    this.selectedChapter.set({ ...current, title: newTitle });
  }

  // save current editor content and notes to selected chapter
  saveDraft(): void {
    const current = this.selectedChapter();
    if (!current) return;

    const words = this.getWordCount(this.editorContent);
    const chars = this.getCharCount(this.editorContent);
    const status: 'done' | 'writing' | 'empty' =
      words > 0 ? (current.status === 'done' ? 'done' : 'writing') : 'empty';

    this.chapters.update(chapters =>
      chapters.map(c => {
        if (c.id === current.id) {
          return {
            ...c,
            content: this.editorContent,
            notes: this.chapterNotes,
            wordCount: words,
            charCount: chars,
            status: status
          };
        }
        return c;
      })
    );

    const updated = this.chapters().find(c => c.id === current.id);
    if (updated) {
      this.selectedChapter.set(updated);
    }
  }

  // save and move to next chapter
  saveAndContinue(): void {
    this.saveDraft();
    const current = this.selectedChapter();
    if (!current) return;

    const allChapters = this.chapters();
    const currentIndex = allChapters.findIndex(c => c.id === current.id);
    if (currentIndex >= 0 && currentIndex < allChapters.length - 1) {
      this.selectChapter(allChapters[currentIndex + 1]);
    }
  }

  // save chapter notes
  saveNotes(): void {
    const current = this.selectedChapter();
    if (!current) return;

    this.chapters.update(chapters =>
      chapters.map(c => c.id === current.id ? { ...c, notes: this.chapterNotes } : c)
    );

    const updated = this.chapters().find(c => c.id === current.id);
    if (updated) {
      this.selectedChapter.set(updated);
    }
  }

  // handle title change via ngModel
  onTitleChange(newTitle: string): void {
    const current = this.selectedChapter();
    if (!current) return;

    this.chapters.update(chapters =>
      chapters.map(c => c.id === current.id ? { ...c, title: newTitle } : c)
    );
    this.selectedChapter.set({ ...current, title: newTitle });
  }

  // update notes value
  updateNotes(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.chapterNotes = target.value;
  }

  // open character modal
  openAddCharacterModal(): void {
    this.newCharacterName = '';
    this.newCharacterRole = 'Supporting';
    this.newCharacterColor = '';
    this.isCharacterModalOpen = true;
  }

  // close character modal
  closeCharacterModal(): void {
    this.isCharacterModalOpen = false;
  }

  // add character to selected chapter
  addCharacterToChapter(): void {
    if (!this.newCharacterName.trim()) return;
    const current = this.selectedChapter();
    if (!current) return;

    const initials = this.newCharacterName
      .split(' ')
      .map(w => w.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');

    const newChar: ChapterCharacter = {
      name: this.newCharacterName.trim(),
      initials: initials,
      color: this.newCharacterColor,
      role: this.newCharacterRole
    };

    const updatedCharacters = [...current.characters, newChar];

    this.chapters.update(chapters =>
      chapters.map(c => c.id === current.id ? { ...c, characters: updatedCharacters } : c)
    );

    this.selectedChapter.set({ ...current, characters: updatedCharacters });
    this.closeCharacterModal();
  }

  // remove character from chapter
  removeCharacter(name: string): void {
    const current = this.selectedChapter();
    if (!current) return;

    const updatedCharacters = current.characters.filter(c => c.name !== name);

    this.chapters.update(chapters =>
      chapters.map(c => c.id === current.id ? { ...c, characters: updatedCharacters } : c)
    );

    this.selectedChapter.set({ ...current, characters: updatedCharacters });
  }

  // open event modal
  openAddEventModal(): void {
    this.newEventName = '';
    this.newEventImpact = 'minor';
    this.isEventModalOpen = true;
  }

  // close event modal
  closeEventModal(): void {
    this.isEventModalOpen = false;
  }

  // add event to selected chapter
  addEventToChapter(): void {
    if (!this.newEventName.trim()) return;
    const current = this.selectedChapter();
    if (!current) return;

    const newEvent: LinkedEvent = {
      name: this.newEventName.trim(),
      impact: this.newEventImpact
    };

    const updatedEvents = [...current.linkedEvents, newEvent];

    this.chapters.update(chapters =>
      chapters.map(c => c.id === current.id ? { ...c, linkedEvents: updatedEvents } : c)
    );

    this.selectedChapter.set({ ...current, linkedEvents: updatedEvents });
    this.closeEventModal();
  }

  // remove event from chapter
  removeEvent(name: string): void {
    const current = this.selectedChapter();
    if (!current) return;

    const updatedEvents = current.linkedEvents.filter(e => e.name !== name);

    this.chapters.update(chapters =>
      chapters.map(c => c.id === current.id ? { ...c, linkedEvents: updatedEvents } : c)
    );

    this.selectedChapter.set({ ...current, linkedEvents: updatedEvents });
  }

  // apply formatting to selected text in textarea
  applyFormat(command: string, value?: string): void {
    // Placeholder - textarea does not support rich formatting.
    // For real formatting support, integrate a rich text editor library later.
  }

  // get total words across all chapters
  getTotalWords(): number {
    return this.chapters().reduce((sum, c) => sum + c.wordCount, 0);
  }

  // get total chapter count
  getChapterCount(): number {
    return this.chapters().length;
  }

  // count words from plain text
  getWordCount(text: string): number {
    if (!text) return 0;
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  // count characters from plain text
  getCharCount(text: string): number {
    if (!text) return 0;
    return text.length;
  }

  // get estimated read time in minutes
  getReadTime(words: number): number {
    return Math.max(1, Math.ceil(words / 200));
  }

  // close preview modal
  closePreview(): void {
    this.isPreviewOpen = false;
  }

  // toggle fullscreen editor (placeholder)
  toggleFullscreen(): void {
    // TODO: fullscreen logic
  }

  // toggle focus mode (placeholder)
  toggleFocusMode(): void {
    // TODO: focus mode logic
  }
}