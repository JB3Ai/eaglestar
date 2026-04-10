/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Search, UserCheck } from 'lucide-react';

export const SERVICES = [
  {
    title: "Operational Security",
    description: "Our operational teams are trained, supervised, and deployed according to site-specific risk profiles. We prioritize deterrence, control, and rapid response.",
    icon: Shield,
    points: [
      "Uniformed security officers",
      "Armed guards",
      "Access control management",
      "Dog handlers",
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
      "Sporting events",
      "Concerts and exhibitions",
      "Corporate conferences",
      "Crowd management",
      "VIP close protection"
    ]
  }
];

export const COMPLIANCE = [
  { label: "PSIRA Registered", code: "Reg. 2849102" },
  { label: "CSD Active Supplier", code: "MAAA0049210" },
  { label: "SARS Tax Compliant", code: "Tax Clearance Active" },
  { label: "B-BBEE Level 2 Contributor", code: "95% Recognition" }
];

export const INDUSTRIES = [
  "Retail and Shopping Centres",
  "Warehousing and Logistics",
  "Manufacturing Facilities",
  "Residential Estates",
  "Corporate Offices",
  "Events and Public Gatherings"
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
    answer: "Yes, 100% of our operational staff are PSIRA registered and vetted according to South African regulatory standards."
  },
  {
    question: "Do you provide services outside of Gauteng?",
    answer: "Our primary focus is Gauteng, but we do handle specialized projects and national accounts on a case-by-case basis."
  },
  {
    question: "How quickly can you deploy a security team?",
    answer: "Deployment times vary by site requirements, but we can typically mobilize a standard guarding team within 24-48 hours after a risk assessment."
  },
  {
    question: "What makes your undercover division different?",
    answer: "Our agents are specifically trained for internal intelligence gathering and operate within a structured legal framework to ensure evidence is admissible."
  }
];
