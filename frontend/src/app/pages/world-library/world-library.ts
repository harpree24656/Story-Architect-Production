import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-world-library',
  imports: [CommonModule, Sidebar],
  templateUrl: './world-library.html',
  styleUrl: './world-library.css',
})
export class WorldLibrary {}
