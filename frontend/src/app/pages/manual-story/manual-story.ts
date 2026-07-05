import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-manual-story',
  standalone: true,
  imports: [],
  templateUrl: './manual-story.html',
  styleUrl: './manual-story.css',
})
export class ManualStory implements OnInit {

  private topbarService = inject(TopbarService);

  isPreviewOpen = false;

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.manualStory);

    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action);
    });
  }

  handleAction(action: string): void {
    if (action === 'preview') {
      this.isPreviewOpen = true;
    }
    if (action === 'publish') {
      // TODO: publish logic
    }
  }
}