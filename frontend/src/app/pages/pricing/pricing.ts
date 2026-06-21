import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {}
