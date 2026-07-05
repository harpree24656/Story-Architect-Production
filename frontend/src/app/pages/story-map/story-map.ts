import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-story-map',
  standalone: true,
  imports: [],
  templateUrl: './story-map.html',
  styleUrl: './story-map.css',
})
export class StoryMap implements OnInit{
  private topbarService = inject(TopbarService)
  isModalOpen = false;


  ngOnInit(): void{
    this.topbarService.setConfig(PAGE_CONFIG.storyMap)
    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action)
    })
  }
  handleAction(action: string): void{
    if(action === 'export'){
      // todo logic
    }
    if(action === 'add-node'){
      this.isModalOpen = true; 
    }
  }
}
