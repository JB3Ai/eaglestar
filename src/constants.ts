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
