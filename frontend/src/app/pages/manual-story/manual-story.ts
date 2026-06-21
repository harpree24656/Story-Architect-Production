import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-manual-story',
  imports: [CommonModule, Sidebar],
  templateUrl: './manual-story.html',
  styleUrl: './manual-story.css',
})
export class ManualStory {}
