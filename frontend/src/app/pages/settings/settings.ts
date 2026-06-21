import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, Sidebar],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  feedbackOpen = false;

  openFeedback(): void {
    this.feedbackOpen = true;
  }

  closeFeedback(): void {
    this.feedbackOpen = false;
  }
}
