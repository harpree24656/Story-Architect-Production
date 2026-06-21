import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-relations',
  imports: [CommonModule, Sidebar],
  templateUrl: './relations.html',
  styleUrl: './relations.css',
})
export class Relations {}
