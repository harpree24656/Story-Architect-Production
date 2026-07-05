import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private topbarService = inject(TopbarService);
  private router = inject(Router);

  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.dashboard);

    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action);
    });
  }

  handleAction(action: string): void {
    if (action === 'new-story') {
      this.router.navigate(['/create']);
    }
    if (action === 'notification') {
      // TODO: open notification panel
    }
  }
}