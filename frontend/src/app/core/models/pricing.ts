export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  icon: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  buttonLabel: string;
  buttonStyle: 'primary' | 'outline';
  popular: boolean;
  features: PlanFeature[];
}

export interface ComparisonRow {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}