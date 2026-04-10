/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, Download, MapPin, Phone, Mail, Globe, CheckCircle2, Search, Check, Loader2, Menu, X, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import { SERVICES, COMPLIANCE, INDUSTRIES, TESTIMONIALS, FAQS } from './constants';
import { Logo } from './components/Logo';
import { ContactForm } from './components/ContactForm';

export default function App() {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = ['About', 'Services', 'Compliance', 'Contact'];

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-teal/30">
      {/* Navigation */}
      <nav className="bg-brand-navy border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo variant="light" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={item === 'Contact' ? '#contact-form' : `#${item.toLowerCase()}`} 
                className="text-white/70 hover:text-brand-teal text-xs font-semibold uppercase tracking-widest transition-colors"
                onClick={(e) => {
                  if (item === 'Contact') {
                    e.preventDefault();
                    scrollToContact();
                  }
                }}
              >
                {item}
              </a>
            ))}
            <button
              aria-label="Access Client Portal"
              className="bg-brand-teal text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-teal/90 transition-all"
            >
              Client Portal
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-navy border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={item === 'Contact' ? '#contact-form' : `#${item.toLowerCase()}`}
                    className="text-white/70 hover:text-brand-teal text-sm font-semibold uppercase tracking-widest transition-colors"
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (item === 'Contact') {
                        e.preventDefault();
                        scrollToContact();
                      }
                    }}
                  >
                    {item}
                  </a>
                ))}
                <button
                  aria-label="Access Client Portal"
                  className="bg-brand-teal text-white px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-teal/90 transition-all w-full text-center"
                >
                  Client Portal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-brand-navy overflow-hidden py-24 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-[#0a1e33]" />
          
          {/* Subtle shield watermark */}
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <Shield size={800} strokeWidth={0.5} className="text-white" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="w-12 h-1 bg-brand-teal mb-8" />
              <h1 className="text-5xl lg:text-7xl text-white font-display font-extrabold leading-[1.1] mb-6 tracking-tight">
                Risk Controlled.<br />
                Operations Secured.
              </h1>
              <p className="text-xl text-brand-teal font-semibold leading-relaxed mb-4">
                Professional guarding, undercover intelligence, and structured security operations across Gauteng.
              </p>
              <p className="text-lg text-white/60 font-light leading-relaxed mb-10 max-w-2xl">
                Eagle Star Security delivers disciplined, compliant, and intelligence-driven protection solutions for commercial, industrial, residential, and event environments. From visible guarding to covert investigations, we protect your assets, people, and operations with structured oversight and measurable accountability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToContact}
                  aria-label="Book a Security Risk Assessment"
                  className="bg-brand-teal text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-2"
                >
                  Get Your Risk Assessment
                  <ArrowRight size={18} />
                </button>
                <button
                  aria-label="Download Company Compliance Profile"
                  className="border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Company Profile
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Our Ethos</span>
                <h2 className="text-4xl font-display font-bold text-brand-navy tracking-tight mb-8">Structured Protection for Peace of Mind</h2>
                <div className="space-y-6 text-brand-charcoal/80 leading-relaxed">
                  <p>
                    Eagle Star Security was established to provide more than physical presence. We go beyond basic guarding to provide proactive risk management and measurable asset protection.
                  </p>
                  <p>
                    Our teams are PSIRA registered, professionally trained, and deployed according to structured risk assessments. We operate across Gauteng, serving corporate, industrial, retail, and event clients who require reliability and measurable results.
                  </p>
                  <p className="font-bold text-brand-navy border-l-4 border-brand-teal pl-6 italic">
                    "Security is not reactive. It is controlled planning, oversight, and execution."
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/security-ops/800/600" 
                  alt="Operational Security" 
                  className="w-full h-[500px] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -left-8 bg-brand-navy p-10 text-white hidden md:block">
                  <div className="text-4xl font-display font-bold mb-2">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-teal">Compliance Adherence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Social Proof</span>
              <h2 className="text-4xl font-display font-bold text-brand-navy tracking-tight">Client Feedback</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-brand-light-grey p-8 relative"
                >
                  <MessageSquare className="text-brand-teal/20 absolute top-6 right-6 w-12 h-12" />
                  <p className="text-brand-charcoal/80 italic mb-8 relative z-10">"{t.quote}"</p>
                  <div>
                    <div className="font-bold text-brand-navy text-sm">{t.author}</div>
                    <div className="text-brand-blue text-[10px] font-bold uppercase tracking-widest">{t.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-brand-light-grey">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Resources</span>
              <h2 className="text-4xl font-display font-bold text-brand-navy tracking-tight">Common Inquiries</h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-white border border-black/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-black/[0.02] transition-colors"
                  >
                    <span className="font-bold text-brand-navy text-sm">{faq.question}</span>
                    <ChevronDown className={`text-brand-teal transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`} size={18} />
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 text-brand-charcoal/70 text-sm leading-relaxed border-t border-black/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-brand-light-grey">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 max-w-3xl">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Our Services</span>
              <h2 className="text-4xl font-display font-bold text-brand-navy tracking-tight mb-6">Structured Protection Pillars</h2>
              <p className="text-brand-charcoal/70">
                Eagle Star Security provides structured protection across three core operational pillars.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {SERVICES.map((service, idx) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.02, 
                    transition: { type: 'spring', stiffness: 400, damping: 25 } 
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 border border-black/5 flex flex-col h-full shadow-sm hover:shadow-2xl hover:border-brand-teal hover:shadow-brand-teal/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-brand-light-grey flex items-center justify-center mb-8 group-hover:bg-brand-teal/10 transition-colors">
                    <service.icon className="text-brand-blue w-6 h-6 group-hover:text-brand-teal transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-navy mb-4">{service.title}</h3>
                  <p className="text-brand-charcoal/70 leading-relaxed text-sm mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.points?.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-xs text-brand-charcoal/80">
                        <Check size={14} className="text-brand-teal shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-8 border-t border-black/5">
                    <button className="text-brand-blue font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-brand-teal transition-colors">
                      Operational Scope
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Undercover Division Section */}
        <section className="py-24 bg-brand-charcoal relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-brand-teal font-bold text-xs uppercase tracking-[0.3em] block mb-4">Intelligence Division</span>
                <h2 className="text-4xl font-display font-bold text-white tracking-tight mb-8">Internal Risk Intelligence</h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Theft, shrinkage, collusion, and drug activity can severely impact business performance. Our Undercover Division integrates trained operatives into operational environments to identify and document internal risk.
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-12">
                  Agents operate discreetly within warehouse, retail, and industrial environments, observing activity and reporting structured findings to management. Where required, surveillance support assists with evidence documentation.
                </p>
                <div className="bg-white/5 p-8 border-l-4 border-brand-teal">
                  <p className="text-white font-medium italic">
                    "This division enables informed decision-making and measurable loss reduction."
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Shrinkage Reduction", desc: "Identifying stock loss and operational inefficiencies." },
                  { label: "Internal Theft", desc: "Investigating collusion and systemic breaches." },
                  { label: "Drug Activity", desc: "Monitoring and identifying substance-related risks." },
                  { label: "Evidence Gathering", desc: "Surveillance-supported documentation for legal action." }
                ].map((item) => (
                  <div key={item.label} className="p-6 bg-white/5 border border-white/10">
                    <h4 className="text-brand-teal font-bold text-xs uppercase tracking-widest mb-3">{item.label}</h4>
                    <p className="text-white/40 text-[10px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-24 bg-brand-light-grey">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Sectors</span>
              <h2 className="text-3xl font-display font-bold text-brand-navy tracking-tight">Industries We Protect</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {INDUSTRIES.map((industry) => (
                <motion.div 
                  key={industry} 
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white p-6 border border-black/5 flex flex-col items-start text-left justify-center group hover:bg-brand-navy transition-colors duration-500 cursor-default"
                >
                  <div className="w-10 h-10 bg-brand-light-grey rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-teal transition-colors">
                    <Shield size={16} className="text-brand-blue group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy group-hover:text-white">{industry}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section id="compliance" className="py-24 bg-white border-y border-black/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Regulatory Alignment</span>
                <h2 className="text-3xl font-display font-bold text-brand-navy tracking-tight mb-6">Compliant. Regulated. Accountable.</h2>
                <p className="text-brand-charcoal/70 leading-relaxed max-w-lg mb-8">
                  Eagle Star Security operates within a fully compliant regulatory framework. We understand corporate procurement requirements and maintain structured documentation to support tender and compliance processes.
                </p>
                <div className="bg-brand-light-grey p-6 border-l-4 border-brand-blue">
                  <p className="text-brand-navy font-bold text-sm italic">
                    "Professional integrity and regulatory adherence are non-negotiable."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {COMPLIANCE.map((item) => (
                  <div key={item.label} className="p-6 bg-brand-light-grey border border-black/5">
                    <CheckCircle2 className="text-brand-teal w-5 h-5 mb-4" />
                    <div className="text-sm font-display font-bold text-brand-navy mb-1">{item.label}</div>
                    <div className="text-[10px] font-mono text-brand-charcoal/50 uppercase tracking-wider">{item.code}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Risk Assessment Section */}
        <section className="py-24 bg-brand-navy relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-display font-bold text-white tracking-tight mb-8">Request a Security Risk Assessment</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                Every site presents different vulnerabilities. Our team conducts structured assessments to evaluate physical security, internal exposure, and operational risk. Based on our findings, we provide clear recommendations tailored to your environment.
              </p>
              <button 
                onClick={scrollToContact}
                className="bg-brand-teal text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all shadow-xl shadow-brand-teal/20"
              >
                Book a consultation
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-form" className="py-24 bg-brand-light-grey">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Contact Us</span>
                <h2 className="text-4xl font-display font-bold text-brand-navy tracking-tight mb-8">Operational Inquiry</h2>
                <p className="text-brand-charcoal/70 text-lg leading-relaxed mb-8">
                  For service inquiries, risk assessments, or operational support across Gauteng, please complete the form. Our team will respond with a structured proposal.
                </p>
                
                <div className="space-y-8 mt-12">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white border border-black/5 flex items-center justify-center shrink-0">
                      <Phone className="text-brand-teal w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1">Direct Line</h4>
                      <p className="text-brand-charcoal font-bold">087 702 1699</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white border border-black/5 flex items-center justify-center shrink-0">
                      <Mail className="text-brand-teal w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1">Email Support</h4>
                      <p className="text-brand-charcoal font-bold">info@eaglestar.co.za</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-24 flex flex-col justify-center">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em] block mb-4">Headquarters</span>
              <h2 className="text-3xl font-display font-bold text-brand-navy tracking-tight mb-8">Operational Presence</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-light-grey flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-teal w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-navy font-bold text-sm uppercase tracking-widest mb-2">Address</h4>
                    <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                      26 Oaktree Avenue<br />
                      Hazelwood, Pretoria<br />
                      0083, South Africa
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-light-grey flex items-center justify-center shrink-0">
                    <Globe className="text-brand-teal w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-navy font-bold text-sm uppercase tracking-widest mb-2">Regional Coverage</h4>
                    <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                      Strategic deployment across Gauteng and surrounding industrial hubs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] lg:h-auto min-h-[500px] relative bg-brand-light-grey overflow-hidden">
              <AnimatePresence>
                {isMapLoading && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-brand-light-grey flex flex-col items-center justify-center gap-4"
                  >
                    <Loader2 className="text-brand-teal w-8 h-8 animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/40">
                      Loading Operational Map...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className={`w-full h-full transition-opacity duration-1000 grayscale contrast-125 hover:grayscale-0 ${isMapLoading ? 'opacity-0' : 'opacity-100'}`}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=26%20Oaktree%20Avenue,%20Hazelwood,%20Pretoria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0"
                  onLoad={() => setIsMapLoading(false)}
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-brand-navy text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Logo className="mb-8" variant="light" />
              <p className="text-white/40 text-xs leading-relaxed">
                Protect your operations with structured, professional security services. Operating across Gauteng.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-teal mb-6">Operations</h4>
              <ul className="space-y-4 text-xs text-white/60 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Physical Guarding</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Assessment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VIP Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intelligence</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-teal mb-6">Contact</h4>
              <ul className="space-y-4 text-xs text-white/60 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="text-brand-teal shrink-0 mt-0.5" />
                  <span>26 Oaktree Avenue<br />Hazelwood, Pretoria<br />0083</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} className="text-brand-teal" />
                  087 702 1699
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="text-brand-teal" />
                  info@eaglestar.co.za
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-teal mb-6">Legal</h4>
              <ul className="space-y-4 text-xs text-white/60 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PAIA Manual</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PSIRA Certification</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
              © {new Date().getFullYear()} Eagle Star Security (Pty) Ltd. All Rights Reserved.
            </span>
            <div className="flex gap-6">
              <a href="#" aria-label="Visit our website" className="text-white/30 hover:text-brand-teal transition-colors">
                <Globe size={16} />
              </a>
              <a href="mailto:info@eaglestar.co.za" aria-label="Email us" className="text-white/30 hover:text-brand-teal transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
