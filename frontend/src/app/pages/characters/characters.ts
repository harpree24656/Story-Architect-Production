import { Component, inject, OnInit } from '@angular/core';
import { TopbarService } from '../../core/services/topbar';
import { PAGE_CONFIG } from '../../core/config/page-config';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  private topbarService =  inject(TopbarService);
  
  isModalOpen = false;
  
  ngOnInit(): void {
    this.topbarService.setConfig(PAGE_CONFIG.characters);

    this.topbarService.action$.subscribe((action) => {
      this.handleAction(action)
    })
  }
  handleAction(action: string): void{
    if(action === 'new-character'){
      this.isModalOpen = true;
    }
  } 
}
