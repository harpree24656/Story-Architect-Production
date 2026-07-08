import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { Router } from '@angular/router';

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create implements OnInit {
  private topbarService = inject(TopbarService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  readonly genres: Option[] = [
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'sci-fi', label: 'Science Fiction' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'romance', label: 'Romance' },
    { value: 'horror', label: 'Horror' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'historical', label: 'Historical' },
    { value: 'adventure', label: 'Adventure' }
  ];

  readonly subGenres: Option[] = [
    { value: 'dark-fantasy', label: 'Dark Fantasy' },
    { value: 'urban-fantasy', label: 'Urban Fantasy' },
    { value: 'space-opera', label: 'Space Opera' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'detective', label: 'Detective' }
  ];

  readonly narrativeStyles: Option[] = [
    { value: 'first-person', label: 'First Person' },
    { value: 'third-person', label: 'Third Person' },
    { value: 'omniscient', label: 'Omniscient' },
    { value: 'stream-of-consciousness', label: 'Stream of Consciousness' }
  ];

  readonly tones: Option[] = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'serious', label: 'Serious' },
    { value: 'romantic', label: 'Romantic' }
  ];

  readonly audiences: string[] = [
    'Children', 'Young Adult', 'Adult', 'All Ages', 'Mature'
  ];

  readonly themes: string[] = [
    'Friendship', 'Love', 'Betrayal', 'Courage',
    'Redemption', 'Revenge', 'Survival', 'Identity'
  ];

  readonly steps: { id: number; label: string }[] = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Story Details' },
    { id: 3, label: 'World Setup' }
  ];

  currentStep = 1;
  selectedAudience = 'All Ages';
  selectedThemes: string[] = ['Redemption', 'Love'];

  storyForm!: FormGroup;

  previewData = signal({
    title: 'Untitled Story',
    genre: 'Not Selected',
    tone: 'Not Selected',
    audience: 'All Ages',
    themes: ['Redemption', 'Love'],
    world: 'Not Set',
    chapters: '—'
  });

  constructor() {
    this.storyForm = this.fb.group({
      basicInfo: this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        subtitle: [''],
        genre: ['', Validators.required],
        subGenre: [''],
        description: ['', [Validators.required, Validators.minLength(20)]]
      }),
      storyDetails: this.fb.group({
        narrativeStyle: ['', Validators.required],
        tone: ['', Validators.required],
        targetAudience: [this.selectedAudience, Validators.required],
        themes: [this.selectedThemes],
        estimatedChapters: [null, Validators.min(1)],
        timePeriod: ['']
      }),
      worldSetup: this.fb.group({
        worldName: ['', Validators.required],
        worldDescription: ['', Validators.required],
        magicSystem: [''],
        keyLocations: this.fb.array([this.fb.control('')])
      })
    });
  }

  get keyLocations(): FormArray {
    return this.storyForm.get('worldSetup.keyLocations') as FormArray;
  }

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.create);

    this.topbarService.action$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((action) => {
      this.handleAction(action);
    });

    this.storyForm.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((formValue) => {
      this.previewData.set({
        title: formValue.basicInfo?.title || 'Untitled Story',
        genre: formValue.basicInfo?.genre || 'Not Selected',
        tone: formValue.storyDetails?.tone || 'Not Selected',
        audience: formValue.storyDetails?.targetAudience || 'All Ages',
        themes: formValue.storyDetails?.themes?.length ? formValue.storyDetails.themes : [],
        world: formValue.worldSetup?.worldName || 'Not Set',
        chapters: formValue.storyDetails?.estimatedChapters || '—'
      });
    });
  }

  handleAction(action: string): void {
    if (action === 'save-draft') {
      this.saveDraft();
    }
    if (action === 'create-story') {
      this.onSubmit();
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.storyForm.get('basicInfo')?.valid ?? false;
      case 2:
        return this.storyForm.get('storyDetails')?.valid ?? false;
      case 3:
        return this.storyForm.get('worldSetup')?.valid ?? false;
      default:
        return false;
    }
  }

  markStepTouched(step: number): void {
    let group: FormGroup | null = null;
    switch (step) {
      case 1:
        group = this.storyForm.get('basicInfo') as FormGroup;
        break;
      case 2:
        group = this.storyForm.get('storyDetails') as FormGroup;
        break;
      case 3:
        group = this.storyForm.get('worldSetup') as FormGroup;
        break;
    }
    if (group) {
      group.markAllAsTouched();
    }
  }

  nextStep(): void {
    if (this.isStepValid(this.currentStep)) {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    } else {
      this.markStepTouched(this.currentStep);
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectAudience(audience: string): void {
    this.selectedAudience = audience;
    this.storyForm.patchValue({
      storyDetails: {
        targetAudience: audience
      }
    });
  }

  toggleTheme(theme: string): void {
    const index = this.selectedThemes.indexOf(theme);
    if (index > -1) {
      this.selectedThemes.splice(index, 1);
    } else {
      this.selectedThemes.push(theme);
    }
    this.storyForm.patchValue({
      storyDetails: {
        themes: [...this.selectedThemes]
      }
    });
  }

  addLocation(): void {
    this.keyLocations.push(this.fb.control(''));
  }

  removeLocation(index: number): void {
    if (this.keyLocations.length > 1) {
      this.keyLocations.removeAt(index);
    }
  }

  saveDraft(): void {
    const saved = this.storyForm.value;
    // TODO: connect to backend later
  }

  onSubmit(): void {
    if (this.storyForm.invalid) {
      this.storyForm.markAllAsTouched();
      return;
    }
    const formData = this.storyForm.value;
    // TODO: send to backend
  }
}