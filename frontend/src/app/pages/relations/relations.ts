import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-relations',
  standalone: true,
  imports: [],
  templateUrl: './relations.html',
  styleUrl: './relations.css',
})
export class Relations implements OnInit {
  
  private topbarService = inject(TopbarService)
  isModalOpen = false;


  ngOnInit(): void{
    this.topbarService.setConfig(PAGE_CONFIG.relations)
    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action)
    })
  }
  handleAction(action: string): void{
    if(action === 'new-realtion'){
      this.isModalOpen = true; 
    }
  }
}
