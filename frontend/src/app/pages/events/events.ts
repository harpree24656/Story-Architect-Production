import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-events',
  imports: [CommonModule, Sidebar],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {}
