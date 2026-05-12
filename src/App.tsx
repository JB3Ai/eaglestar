/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Shield, ArrowRight, Download, MapPin, Phone, Mail, Globe, CheckCircle2, 
  Search, Check, Loader2, Menu, X, MessageSquare, HelpCircle, ChevronDown,
  Eye, Lock, Users, Star, ChevronRight, Phone as PhoneIcon
} from 'lucide-react';
import { SERVICES, COMPLIANCE, INDUSTRIES, TESTIMONIALS, FAQS } from './constants';
import { Logo } from './components/Logo';
import { ContactForm } from './components/ContactForm';
import { SignupModal } from './components/SignupModal';

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionHeading({ overline, title, subtitle, light = false }: { overline: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 lg:mb-20"
    >
      <span className={`text-xs font-bold uppercase tracking-[0.32em] block mb-4 ${light ? 'text-brand-teal' : 'text-brand-teal'}`}>
        {overline}
      </span>
      <h2 className={`text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 ${light ? 'text-white' : 'text-brand-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${light ? 'text-white/60' : 'text-brand-charcoal/60'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-16 h-0.5 mx-auto mt-8 ${light ? 'bg-brand-teal/50' : 'bg-brand-teal'}`} />
    </motion.div>
  );
}

export default function App() {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = ['About', 'Services', 'Compliance', 'Contact'];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <motion.div 
          className="h-full bg-gradient-to-r from-brand-teal to-brand-blue"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-brand-navy/95 backdrop-blur-xl shadow-2xl shadow-brand-navy/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo variant="light" className="scale-90" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={item === 'Contact' ? '#contact-form' : `#${item.toLowerCase()}`} 
                className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-all relative group"
                onClick={(e) => {
                  if (item === 'Contact') {
                    e.preventDefault();
                    scrollToContact();
                  }
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-teal group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSignupOpen(true)}
              className="bg-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 border border-brand-teal/30 hover:bg-brand-teal hover:text-white transition-all"
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Access Client Portal"
              className="bg-brand-teal text-white px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20"
            >
              Request Brief
            </motion.button>
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
              className="md:hidden bg-brand-navy/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={item === 'Contact' ? '#contact-form' : `#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-brand-teal text-sm font-semibold uppercase tracking-widest transition-colors"
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
                  onClick={() => { setIsMenuOpen(false); setIsSignupOpen(true); }}
                  className="border border-brand-teal/30 text-brand-teal px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all w-full text-center"
                >
                  Quick Sign Up
                </button>
                <button
                  aria-label="Request Brief"
                  className="bg-brand-teal text-white px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] hover:bg-brand-teal/90 transition-all w-full text-center"
                >
                  Request Brief
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(24,160,198,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(212,168,83,0.12),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(30,111,168,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
            >
              <div className="w-full h-full border border-white rounded-full" />
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-5 py-2 mb-8">
                  <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-teal">PSIRA Certified Security</span>
                </div>
                
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-white mb-8">
                  Protection with
                  <span className="block text-gradient">visible command</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
                  Eagle Star Security delivers disciplined guarding, internal risk intelligence, and response-ready support for businesses that demand excellence.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(24,160,198,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSignupOpen(true)}
                    className="bg-brand-teal text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-xl shadow-brand-teal/20"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToContact}
                    className="border border-white/20 text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                  >
                    Risk Assessment
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Card */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="glass rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-teal">Operational Snapshot</p>
                      <p className="mt-1 text-white/50 text-sm">Gauteng Region</p>
                    </div>
                    <Shield className="text-brand-gold" size={24} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/40">Service Mix</p>
                      <p className="mt-2 text-white/80 text-sm">Guarding, intelligence, event cover, and site risk reviews.</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-2xl font-display font-bold text-brand-teal">24/7</p>
                        <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-white/40">Response</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-2xl font-display font-bold text-brand-gold">PSIRA</p>
                        <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-white/40">Certified</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-2xl font-display font-bold text-brand-teal">B2</p>
                        <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-white/40">B-BBEE</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-brand-gold text-brand-navy text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                >
                  Trusted Since 2019
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-light to-transparent" />
        </section>

        {/* Stats Section */}
        <section className="relative -mt-16 z-20 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { value: 500, suffix: "+", label: "Sites Protected" },
                { value: 100, suffix: "%", label: "PSIRA Compliant" },
                { value: 24, suffix: "/7", label: "Response Time" },
                { value: 98, suffix: "%", label: "Client Retention" }
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-xl shadow-brand-navy/5 border border-black/5 text-center group hover:shadow-2xl hover:border-brand-teal/20 transition-all"
                >
                  <div className="text-4xl font-display font-bold text-brand-navy mb-2 group-hover:text-brand-teal transition-colors">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-charcoal/50">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 lg:py-32 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-brand-teal font-bold text-xs uppercase tracking-[0.32em] block mb-4">Our Ethos</span>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight mb-8">
                  Structured Protection for
                  <span className="text-gradient"> Peace of Mind</span>
                </h2>
                <div className="space-y-6 text-brand-charcoal/70 leading-relaxed">
                  <p>
                    Eagle Star Security was established to provide more than physical presence. We go beyond basic guarding to deliver proactive risk management and measurable asset protection.
                  </p>
                  <p>
                    Our teams are PSIRA registered, professionally trained, and deployed according to structured risk assessments. We operate across Gauteng, serving corporate, industrial, retail, and event clients who require reliability and measurable results.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center">
                    <Shield className="text-brand-teal w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-navy text-sm">"Security is not reactive"</p>
                    <p className="text-xs text-brand-charcoal/50">It is controlled planning, oversight, and execution</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center">
                    <Shield className="text-white/10 w-48 h-48" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-black/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center">
                      <CheckCircle2 className="text-brand-teal w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-brand-navy">100%</p>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/50">Compliance Rate</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
              overline="Excellence in Security"
              title="Operational Pillars"
              subtitle="Elite protection strategies delivered with uncompromising precision and professional integrity."
            />

            <div className="grid lg:grid-cols-3 gap-8">
              {SERVICES.map((service, idx) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-brand-light rounded-3xl p-10 border border-black/5 hover:border-brand-teal/30 hover:shadow-2xl hover:shadow-brand-teal/10 transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal to-brand-blue rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-brand-teal transition-all duration-500">
                    <service.icon className="text-brand-teal w-7 h-7 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-brand-navy mb-4">{service.title}</h3>
                  <p className="text-brand-charcoal/60 leading-relaxed text-sm mb-8">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.points?.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-brand-charcoal/70">
                        <Check size={14} className="text-brand-teal shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-black/5">
                    <button className="text-brand-teal font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Intelligence Division */}
        <section className="py-24 lg:py-32 bg-brand-navy relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-brand-teal font-bold text-xs uppercase tracking-[0.32em] block mb-4">Intelligence Division</span>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-8">
                  Internal Risk
                  <span className="text-brand-teal"> Intelligence</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Theft, shrinkage, collusion, and drug activity can severely impact business performance. Our Undercover Division integrates trained operatives into operational environments to identify and document internal risk.
                </p>
                <div className="glass-dark rounded-2xl p-6 border-l-4 border-brand-teal">
                  <p className="text-white/80 font-medium italic text-sm">
                    "This division enables informed decision-making and measurable loss reduction."
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Eye, label: "Shrinkage Reduction", desc: "Identifying stock loss and operational inefficiencies." },
                  { icon: Lock, label: "Internal Theft", desc: "Investigating collusion and systemic breaches." },
                  { icon: Search, label: "Drug Activity", desc: "Monitoring and identifying substance-related risks." },
                  { icon: Users, label: "Evidence Gathering", desc: "Surveillance-supported documentation for legal action." }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 glass rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <item.icon className="text-brand-teal w-6 h-6 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-brand-teal font-bold text-xs uppercase tracking-[0.2em] mb-2">{item.label}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 lg:py-32 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
              overline="Client Feedback"
              title="What Our Clients Say"
              subtitle="Real results from real partnerships across Gauteng."
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-10 rounded-3xl shadow-lg shadow-brand-navy/5 border border-black/5 relative group hover:shadow-xl hover:border-brand-teal/20 transition-all"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-brand-charcoal/70 italic mb-8 leading-relaxed text-sm">"{t.quote}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-teal to-brand-blue flex items-center justify-center text-white font-bold text-sm">
                      {t.author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-brand-navy text-sm">{t.author}</div>
                      <div className="text-brand-teal text-xs font-bold uppercase tracking-wider">{t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
              overline="Sectors We Serve"
              title="Industries We Protect"
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {INDUSTRIES.map((industry, idx) => (
                <motion.div 
                  key={industry} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-brand-light p-6 rounded-2xl border border-black/5 flex flex-col items-center text-center group hover:bg-brand-navy transition-all duration-500 cursor-default"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:bg-brand-teal transition-all">
                    <Shield size={18} className="text-brand-teal group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-navy group-hover:text-white">{industry}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section id="compliance" className="py-24 lg:py-32 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-brand-teal font-bold text-xs uppercase tracking-[0.32em] block mb-4">Regulatory Alignment</span>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight mb-8">
                  Compliant. Regulated.
                  <span className="text-gradient"> Accountable.</span>
                </h2>
                <p className="text-brand-charcoal/70 leading-relaxed max-w-lg mb-8">
                  Eagle Star Security operates within a fully compliant regulatory framework. We maintain structured documentation to support tender and compliance processes.
                </p>
                <div className="bg-white p-6 rounded-2xl border-l-4 border-brand-teal shadow-lg">
                  <p className="text-brand-navy font-bold text-sm italic">
                    "Professional integrity and regulatory adherence are non-negotiable."
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {COMPLIANCE.map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-lg hover:border-brand-teal/30 transition-all group"
                  >
                    <CheckCircle2 className="text-brand-teal w-6 h-6 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-display font-bold text-brand-navy mb-1">{item.label}</div>
                    <div className="text-xs font-mono text-brand-charcoal/40 uppercase tracking-wider">{item.code}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Risk Assessment CTA */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-brand-navy to-brand-blue relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-teal font-bold text-xs uppercase tracking-[0.32em] block mb-6">Security Risk Assessment</span>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-white tracking-tight mb-8">
                Every site presents
                <span className="block text-brand-teal">different vulnerabilities</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                Our team conducts structured assessments to evaluate physical security, internal exposure, and operational risk. Clear recommendations tailored to your environment.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="bg-brand-teal text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-teal/90 transition-all shadow-2xl shadow-brand-teal/30 inline-flex items-center gap-3"
              >
                Book a Consultation
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <SectionHeading 
              overline="Resources"
              title="Common Inquiries"
            />
            
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-brand-light rounded-2xl border border-black/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white transition-colors"
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-form" className="py-24 lg:py-32 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-brand-teal font-bold text-xs uppercase tracking-[0.32em] block mb-4">Contact Us</span>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-navy tracking-tight mb-8">
                  Operational
                  <span className="text-gradient"> Inquiry</span>
                </h2>
                <p className="text-brand-charcoal/70 text-lg leading-relaxed mb-12">
                  For service inquiries, risk assessments, or operational support across Gauteng, please complete the form. Our team will respond with a structured proposal.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-teal transition-all">
                      <Phone className="text-brand-teal w-6 h-6 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-brand-charcoal/50 mb-1">Direct Line</h4>
                      <p className="text-brand-navy font-bold text-lg">087 702 1699</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-teal transition-all">
                      <Mail className="text-brand-teal w-6 h-6 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-brand-charcoal/50 mb-1">Email Support</h4>
                      <p className="text-brand-navy font-bold text-lg">info@eaglestar.co.za</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-teal transition-all">
                      <MapPin className="text-brand-teal w-6 h-6 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-brand-charcoal/50 mb-1">Headquarters</h4>
                      <p className="text-brand-navy font-medium">26 Oaktree Avenue, Hazelwood, Pretoria</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-24 flex flex-col justify-center">
              <span className="text-brand-teal font-bold text-xs uppercase tracking-[0.32em] block mb-4">Headquarters</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-navy tracking-tight mb-8">Operational Presence</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
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
                  <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
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
            <div className="h-[400px] lg:h-auto min-h-[500px] relative bg-brand-light overflow-hidden">
              <AnimatePresence>
                {isMapLoading && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-brand-light flex flex-col items-center justify-center gap-4"
                  >
                    <Loader2 className="text-brand-teal w-8 h-8 animate-spin" />
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-navy/40">
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
              <Logo className="mb-8 scale-90" variant="light" />
              <p className="text-white/40 text-sm leading-relaxed">
                Protect your operations with structured, professional security services. Operating across Gauteng.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-brand-teal mb-6">Operations</h4>
              <ul className="space-y-4 text-sm text-white/50 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Physical Guarding</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Assessment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VIP Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intelligence</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-brand-teal mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-white/50 font-medium">
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
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-brand-teal mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-white/50 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PAIA Manual</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PSIRA Certification</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-white/30 uppercase tracking-[0.18em] font-medium">
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

      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  );
}
