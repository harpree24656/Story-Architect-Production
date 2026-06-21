import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-create',
  imports: [CommonModule, Sidebar],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {}
