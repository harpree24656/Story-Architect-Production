import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-characters',
  imports: [CommonModule, Sidebar],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {}
