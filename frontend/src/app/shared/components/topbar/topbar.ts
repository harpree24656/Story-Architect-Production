import { Component, inject, OnInit} from '@angular/core';
import { TopbarService } from '../../../core/services/topbar'
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [SearchBar],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar implements OnInit{
  private topbarService = inject(TopbarService);

  config: any = null;

  ngOnInit(): void {
    this.topbarService.config$.subscribe((config) => {
      this.config = config;
    });
  }

  onButtonClick(action: string): void {
    this.topbarService.emitAction(action);
  }

  onIconClick(action: string): void {
    this.topbarService.emitAction(action);
  }
}
