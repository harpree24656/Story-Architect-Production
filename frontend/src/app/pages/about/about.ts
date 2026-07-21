import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MissionCard,
  TimelineItem,
  StatBlock,
  TeamMember,
  ValueItem,
  FooterColumn
} from '../../core/models/about';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  // mission cards data
  readonly missions: MissionCard[] = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description: 'To empower storytellers with intelligent tools that make world-building, character design, and narrative crafting accessible to everyone.'
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description: 'A world where every story idea can be architected, organized, and brought to life with clarity, structure, and creative freedom.'
    },
    {
      icon: '💎',
      title: 'Our Values',
      description: 'Creativity first. Writer ownership always. Privacy, transparency, and respect for the craft guide everything we do.'
    }
  ];

  // timeline items
  readonly timeline: TimelineItem[] = [
    {
      year: '2026',
      event: 'Idea born from a writer\'s need',
      active: false
    },
    {
      year: 'Early 2026',
      event: 'First prototype built',
      active: false
    },
    {
      year: 'Mid 2026',
      event: 'Beta launch with 500 writers',
      active: false
    },
    {
      year: '2026',
      event: 'Public launch · 5K+ writers',
      active: true
    }
  ];

  // stats data
  readonly stats: StatBlock[] = [
    { number: '5,000+', label: 'Active Writers' },
    { number: '10,000+', label: 'Stories Created' },
    { number: '50,000+', label: 'Characters Built' },
    { number: '20+', label: 'Countries' }
  ];

  // team members
  readonly team: TeamMember[] = [
    {
      name: 'Harpreet Singh',
      initials: 'HS',
      role: 'Founder & CEO',
      bio: 'Fantasy novelist turned product builder. Obsessed with narrative structure.',
      avatarColor: '',
      links: [
        { label: '𝕏', url: '#' },
        { label: 'in', url: '#' }
      ]
    },
    {
      name: 'Harpreet Singh',
      initials: 'HS',
      role: 'Lead Designer',
      bio: 'UX/UI designer making complex tools feel simple and beautiful.',
      avatarColor: 'purple',
      links: [
        { label: '𝕏', url: '#' },
        { label: 'Dr', url: '#' }
      ]
    },
    {
      name: 'Harpreet Singh',
      initials: 'HS',
      role: 'Lead Developer',
      bio: 'Full-stack engineer. Angular enthusiast and open-source contributor.',
      avatarColor: 'teal',
      links: [
        { label: 'GH', url: '#' },
        { label: 'in', url: '#' }
      ]
    },
    {
      name: 'Harpreet Singh',
      initials: 'HS',
      role: 'AI Engineer',
      bio: 'NLP specialist making AI tools creative and writer-friendly.',
      avatarColor: 'orange',
      links: [
        { label: '𝕏', url: '#' },
        { label: 'GH', url: '#' }
      ]
    }
  ];

  // core values
  readonly values: ValueItem[] = [
    {
      icon: '🔐',
      title: 'Your Stories, Your Rights',
      description: 'Everything you create belongs to you. We never claim ownership or share without permission.'
    },
    {
      icon: '🎨',
      title: 'Creativity Over Complexity',
      description: 'Simple interfaces, powerful features, zero learning curve.'
    },
    {
      icon: '🌍',
      title: 'Built for Everyone',
      description: 'First short story or tenth novel — Story Architect adapts to your needs.'
    },
    {
      icon: '🤖',
      title: 'AI as a Partner',
      description: 'AI assists and suggests — it never replaces your voice.'
    },
    {
      icon: '🚀',
      title: 'Always Improving',
      description: 'Weekly updates based on writer feedback. Every suggestion matters.'
    },
    {
      icon: '💬',
      title: 'Community Driven',
      description: 'Our roadmap is shaped by writers. Your feedback guides every decision.'
    }
  ];

  // footer columns
  readonly footerColumns: FooterColumn[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '#' },
        { label: 'Pricing', url: '/pricing' },
        { label: 'Changelog', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '#' },
        { label: 'Contact', url: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', url: '#' },
        { label: 'Terms', url: '#' }
      ]
    }
  ];

  // handle get started button
  handleGetStarted(): void {
    // TODO: navigate to signup
  }

  // handle view pricing button
  handleViewPricing(): void {
    // TODO: navigate to pricing page
  }
}