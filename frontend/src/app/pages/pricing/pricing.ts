import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PricingPlan, ComparisonRow, FAQItem } from '../../core/models/pricing';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing implements OnInit {

  // state
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  // pricing plans data
  readonly plans: PricingPlan[] = [
    {
      id: 'free',
      icon: '✏️',
      name: 'Free',
      description: 'For beginners exploring story building',
      monthlyPrice: 0,
      yearlyPrice: 0,
      buttonLabel: 'Get Started Free',
      buttonStyle: 'outline',
      popular: false,
      features: [
        { text: 'Up to 2 stories', included: true },
        { text: '10 characters per story', included: true },
        { text: 'Basic event timeline', included: true },
        { text: 'Manual story writer', included: true },
        { text: 'Community support', included: true },
        { text: 'AI suggestions', included: false },
        { text: 'Story map', included: false },
        { text: 'Relation mapper', included: false },
        { text: 'World library', included: false },
        { text: 'Export to PDF/DOCX', included: false }
      ]
    },
    {
      id: 'pro',
      icon: '⚡',
      name: 'Pro',
      description: 'For serious writers building rich narratives',
      monthlyPrice: 12,
      yearlyPrice: 115,
      buttonLabel: 'Start Pro Plan',
      buttonStyle: 'primary',
      popular: true,
      features: [
        { text: 'Unlimited stories', included: true },
        { text: 'Unlimited characters', included: true },
        { text: 'Advanced event timeline', included: true },
        { text: 'Manual story writer', included: true },
        { text: 'AI suggestions & tools', included: true },
        { text: 'Interactive story map', included: true },
        { text: 'Relation mapper', included: true },
        { text: 'World library', included: true },
        { text: 'Export to PDF/DOCX', included: true },
        { text: 'Priority support', included: true }
      ]
    },
    {
      id: 'enterprise',
      icon: '🏢',
      name: 'Enterprise',
      description: 'For teams and studios building together',
      monthlyPrice: 39,
      yearlyPrice: 374,
      buttonLabel: 'Contact Sales',
      buttonStyle: 'outline',
      popular: false,
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Team collaboration', included: true },
        { text: 'Up to 10 team members', included: true },
        { text: 'Shared world libraries', included: true },
        { text: 'Advanced AI tools', included: true },
        { text: 'Version history', included: true },
        { text: 'Custom branding', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: '24/7 premium support', included: true }
      ]
    }
  ];

  // comparison table rows
  readonly comparisonRows: ComparisonRow[] = [
    { feature: 'Stories', free: '2', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Characters per Story', free: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Event Timeline', free: 'Basic', pro: 'Advanced', enterprise: 'Advanced' },
    { feature: 'Story Map', free: false, pro: true, enterprise: true },
    { feature: 'Relation Mapper', free: false, pro: true, enterprise: true },
    { feature: 'World Library', free: false, pro: true, enterprise: true },
    { feature: 'AI Suggestions', free: false, pro: true, enterprise: true },
    { feature: 'Export PDF/DOCX', free: false, pro: true, enterprise: true },
    { feature: 'Team Collaboration', free: false, pro: false, enterprise: true },
    { feature: 'Support', free: 'Community', pro: 'Priority', enterprise: '24/7 Premium' }
  ];

  // FAQ items
  faqs: FAQItem[] = [
    {
      question: 'Can I switch plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
      isOpen: false
    },
    {
      question: 'Is there a free trial for Pro?',
      answer: 'Absolutely! Every new user gets a 14-day free trial of the Pro plan. No credit card required.',
      isOpen: false
    },
    {
      question: 'What happens to my data if I downgrade?',
      answer: 'Your data is never deleted. Pro features become read-only. You can still access and export your content.',
      isOpen: false
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a full refund within the first 7 days of any paid subscription.',
      isOpen: false
    },
    {
      question: 'Can I use it for commercial projects?',
      answer: 'Yes! All plans allow commercial use. Your stories belong entirely to you.',
      isOpen: false
    }
  ];

  // footer data
  readonly footerColumns = [
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

  ngOnInit(): void {
    // no topbar setup needed - this is a public landing page
  }

  // toggle billing between monthly and yearly
  toggleBilling(isYearly: boolean): void {
    this.billingCycle = isYearly ? 'yearly' : 'monthly';
  }

  // get plan price based on current billing cycle
  getPlanPrice(plan: PricingPlan): number {
    return this.billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  }

  // get monthly equivalent when yearly is selected
  getDisplayPrice(plan: PricingPlan): number {
    if (this.billingCycle === 'yearly') {
      return Math.round(plan.yearlyPrice / 12);
    }
    return plan.monthlyPrice;
  }

  // get period label
  getPeriodLabel(): string {
    return this.billingCycle === 'yearly' ? '/month billed yearly' : '/month';
  }

  // toggle faq open/close
  toggleFaq(index: number): void {
    this.faqs = this.faqs.map((faq, i) =>
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    );
  }

  // handle plan button click
  selectPlan(planId: string): void {
    if (planId === 'enterprise') {
      // TODO: contact sales navigation
      return;
    }
    // TODO: navigate to signup with plan
  }

  // handle CTA click
  handleCtaClick(): void {
    // TODO: navigate to signup
  }
}