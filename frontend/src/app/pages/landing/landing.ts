import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-landing',
  imports: [Navbar, RouterLink, RouterLinkActive],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing{
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
