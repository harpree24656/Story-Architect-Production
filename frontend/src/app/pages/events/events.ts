import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {

  private topbarService = inject(TopbarService)
  isModalOpen = false;


  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.events)
    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action);
    })
  }
  handleAction(action: string): void{
    if(action === 'new-event'){
      this.isModalOpen = true;
    }
  }
  
}
