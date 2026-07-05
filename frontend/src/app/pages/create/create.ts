import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create implements OnInit {
  private topbarService = inject(TopbarService)
  private router = inject(Router);

  ngOnInit(): void{
    this.topbarService.setConfig(PAGE_CONFIG.create);
    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action)
    })
  }
  handleAction(action: string): void{
    if(action === 'save-default'){
      // tofo logic
    }
    if(action === 'create-story'){
      this.router.navigate(['/create']);
    }
  }

}
