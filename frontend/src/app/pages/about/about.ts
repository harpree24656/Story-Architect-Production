import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-about',
  imports: [CommonModule, Navbar],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
