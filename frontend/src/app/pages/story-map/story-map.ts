import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-story-map',
  imports: [CommonModule, Sidebar],
  templateUrl: './story-map.html',
  styleUrl: './story-map.css',
})
export class StoryMap {}
