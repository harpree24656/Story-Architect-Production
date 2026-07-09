import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { UserProfile, Feedback } from '../../core/models/user'; 

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {

  private topbarService = inject(TopbarService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  // state properties
  feedbackOpen: boolean = false;
  feedbackForm!: FormGroup;
  selectedRating: string = 'good';
  selectedFeedbackType: string = 'suggestion';

  // signals
  userProfile = signal<UserProfile | null>(null);

  // static readonly arrays
  readonly feedbackTypes = [
    { value: 'suggestion', icon: '💡', label: 'Suggestion' },
    { value: 'bug', icon: '🐛', label: 'Bug Report' },
    { value: 'compliment', icon: '❤️', label: 'Compliment' },
    { value: 'other', icon: '📝', label: 'Other' }
  ];

  readonly ratingOptions = [
    { value: 'terrible', emoji: '😡', label: 'Terrible' },
    { value: 'bad', emoji: '😕', label: 'Bad' },
    { value: 'okay', emoji: '😐', label: 'Okay' },
    { value: 'good', emoji: '😊', label: 'Good' },
    { value: 'amazing', emoji: '🤩', label: 'Amazing' }
  ];

  // mock data
  mockUser: UserProfile = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    initials: 'JD',
    plan: 'pro',
    memberSince: new Date('2025-01-15'),
    avatarColor: 'purple'
  };

  // constructor
  constructor() {
    this.feedbackForm = this.fb.group({
      type: ['suggestion', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: ['good'],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.settings);

    this.topbarService.action$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        this.handleAction(action);
      });

    this.userProfile.set(this.mockUser);
    this.feedbackForm.patchValue({ email: this.mockUser.email });
  }

  // handle topbar action
  handleAction(action: string): void {
    if (action === 'feedback') {
      this.openFeedback();
    }
    if (action === 'logout') {
      this.logout();
    }
  }

  // open feedback modal
  openFeedback(): void {
    this.feedbackOpen = true;
    this.selectedFeedbackType = 'suggestion';
    this.selectedRating = 'good';
    this.feedbackForm.reset({
      type: 'suggestion',
      subject: '',
      message: '',
      rating: 'good',
      email: this.userProfile()?.email || ''
    });
  }

  // close feedback modal
  closeFeedback(): void {
    this.feedbackOpen = false;
    this.feedbackForm.reset();
  }

  // select feedback type
  selectFeedbackType(type: string): void {
    this.selectedFeedbackType = type;
    this.feedbackForm.patchValue({ type: type });
  }

  // select rating
  selectRating(rating: string): void {
    this.selectedRating = rating;
    this.feedbackForm.patchValue({ rating: rating });
  }

  // submit feedback form
  submitFeedback(): void {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const formValue = this.feedbackForm.value;
    const newFeedback: Feedback = {
      id: 'feedback-' + Date.now(),
      type: formValue.type,
      subject: formValue.subject,
      message: formValue.message,
      rating: formValue.rating,
      email: formValue.email,
      createdAt: new Date()
    };

    // TODO: send feedback to backend
    console.log('Feedback submitted:', newFeedback);

    this.closeFeedback();
  }

  // logout action
  logout(): void {
    // TODO: real logout logic (clear tokens, redirect, etc.)
    this.router.navigate(['/']);
  }

  // format member since date to "Jan 2025"
  getMemberSinceLabel(): string {
    const user = this.userProfile();
    if (!user) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = user.memberSince;
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  // get readable plan label
  getPlanLabel(plan: string): string {
    if (plan === 'free') return 'Free Plan';
    if (plan === 'pro') return 'Pro Plan';
    if (plan === 'enterprise') return 'Enterprise Plan';
    return plan;
  }
}