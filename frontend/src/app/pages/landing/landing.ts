import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-landing',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing{
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
