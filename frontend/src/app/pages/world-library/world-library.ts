import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-world-library',
  standalone: true,
  imports: [],
  templateUrl: './world-library.html',
  styleUrl: './world-library.css',
})
export class WorldLibrary implements OnInit {
  private topbarService = inject(TopbarService);

  isModalOpen = false;
  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.worldLibrary);

    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action);
    });
  }

  handleAction(action: string): void {
    if (action === 'add-entry') {
      this.isModalOpen = true;
    }
  }
}
