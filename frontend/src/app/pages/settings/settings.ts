import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit{
  
  // for topbar data
  private topbarService = inject(TopbarService)
  // for feedback module rendering
  feedbackOpen = false;

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.settings);
  }
  openFeedback(): void {
    this.feedbackOpen = true;
  }
  closeFeedback(): void {
    this.feedbackOpen = false;
  }
}
