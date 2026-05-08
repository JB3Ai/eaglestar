/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Search, UserCheck, BarChart3, Building2, Factory, ShoppingCart, Truck, Home } from 'lucide-react';

export const SERVICES = [
  {
    title: "Operational Security",
    description: "Our operational teams are trained, supervised, and deployed according to site-specific risk profiles. We prioritize deterrence, control, and rapid response.",
    icon: Shield,
    points: [
      "Uniformed security officers",
      "Armed and unarmed guarding",
      "Access control management",
      "K9 patrol units",
      "CCTV monitoring support",
      "Retail and commercial site security"
    ]
  },
  {
    title: "Intelligence & Investigation",
    description: "Not all risk is visible. Our Intelligence Division identifies operational vulnerabilities that cannot be detected through visible guarding alone.",
    icon: Search,
    points: [
      "Undercover agents",
      "Shrinkage reduction programs",
      "Internal theft investigations",
      "Drug-related activity investigations",
      "Surveillance-supported evidence gathering"
    ]
  },
  {
    title: "Event & VIP Protection",
    description: "Our event security teams operate with structured planning and disciplined deployment to maintain safety, control, and professionalism.",
    icon: UserCheck,
    points: [
      "Sporting events & Concerts",
      "Corporate conferences",
      "Exhibitions and activations",
      "Crowd management strategies",
      "VIP close protection (Bodyguarding)"
    ]
  }
];

export const COMPLIANCE = [
  { label: "PSIRA Registered", code: "Reg. 2849102", detail: "Compliant with Private Security Industry Regulatory Authority" },
  { label: "CSD Registered", code: "MAAA0049210", detail: "Central Supplier Database for Government Tenders" },
  { label: "B-BBEE Level 2", code: "95% Recognition", detail: "Committed to South African Economic Transformation" },
  { label: "COID Compliant", code: "Good Standing", detail: "Full Compensation for Occupational Injuries and Diseases" }
];

export const SECTORS = [
  {
    name: "Retail & Malls",
    description: "Loss prevention and crowd control for high-traffic environments.",
    icon: ShoppingCart
  },
  {
    name: "Logistics & Warehousing",
    description: "Protecting the supply chain from internal and external shrinkage.",
    icon: Truck
  },
  {
    name: "Industrial & Manufacturing",
    description: "Securing assets and personnel in complex industrial settings.",
    icon: Factory
  },
  {
    name: "Corporate & Commercial",
    description: "Front-of-house security that maintains your brand's professionalism.",
    icon: Building2
  },
  {
    name: "Residential Estates",
    description: "Discreet and effective security for high-value residential communities.",
    icon: Home
  },
  {
    name: "Data & Risk Analysis",
    description: "Using data-driven insights to predict and mitigate future threats.",
    icon: BarChart3
  }
];

export const SERVICE_AREAS = [
  "Sandton", "Midrand", "Centurion", "Pretoria East", "Kempton Park", "Johannesburg CBD", "Randburg", "Fourways"
];

export const TESTIMONIALS = [
  {
    quote: "Eagle Star's undercover team identified a major collusion ring in our warehouse within weeks. Their reporting was impeccable.",
    author: "Operations Manager",
    company: "National Logistics Hub"
  },
  {
    quote: "Reliable and professional. Their guarding staff is well-trained and they actually follow their protocols.",
    author: "Security Director",
    company: "Gauteng Retail Group"
  },
  {
    quote: "The risk assessment they performed was eye-opening. We've significantly reduced our exposure thanks to their recommendations.",
    author: "Facility Manager",
    company: "Corporate HQ"
  }
];

export const FAQS = [
  {
    question: "Are all your guards PSIRA registered?",
    answer: "Yes, 100% of our operational staff are PSIRA registered and vetted according to South African regulatory standards. We conduct regular audits to ensure full compliance."
  },
  {
    question: "Do you provide services outside of Gauteng?",
    answer: "While our core operations are in Gauteng, we provide specialized investigative and VIP protection services across South Africa for specific projects."
  },
  {
    question: "How quickly can you deploy a security team?",
    answer: "For standard guarding, we can typically deploy within 48 hours following a risk assessment. Emergency tactical support can be deployed faster depending on location."
  },
  {
    question: "How do you handle internal theft (shrinkage)?",
    answer: "We deploy specialized undercover agents who blend into your workforce to identify patterns of theft and collusion, providing admissible evidence for prosecution."
  }
];
