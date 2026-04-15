/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit. Please try again.');
      }

      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-white p-8 lg:p-12 border border-black/5 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-brand-teal w-10 h-10" />
            </div>
            <h3 className="text-2xl font-display font-bold text-brand-navy mb-4">Message Received</h3>
            <p className="text-brand-charcoal/70 max-w-sm">
              Thank you for reaching out. An operational consultant will review your request and contact you shortly.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-8 text-brand-blue font-bold text-xs uppercase tracking-widest hover:text-brand-teal transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy block">
                  Full Name <span className="text-brand-teal">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full bg-brand-light-grey border ${errors.fullName ? 'border-red-500' : 'border-black/5'} px-4 py-3 text-sm focus:outline-none focus:border-brand-teal transition-colors`}
                />
                {errors.fullName && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.fullName}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy block">
                  Email Address <span className="text-brand-teal">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className={`w-full bg-brand-light-grey border ${errors.email ? 'border-red-500' : 'border-black/5'} px-4 py-3 text-sm focus:outline-none focus:border-brand-teal transition-colors`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy block">
                  Phone Number <span className="text-brand-teal">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+27 12 345 6789"
                  className={`w-full bg-brand-light-grey border ${errors.phone ? 'border-red-500' : 'border-black/5'} px-4 py-3 text-sm focus:outline-none focus:border-brand-teal transition-colors`}
                />
                {errors.phone && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.phone}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy block">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company (Pty) Ltd"
                  className="w-full bg-brand-light-grey border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-brand-teal transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy block">
                Required Service <span className="text-brand-teal">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full bg-brand-light-grey border ${errors.service ? 'border-red-500' : 'border-black/5'} px-4 py-3 text-sm focus:outline-none focus:border-brand-teal transition-colors appearance-none`}
              >
                <option value="">Select a service...</option>
                <option value="guarding">Operational Guarding</option>
                <option value="intelligence">Undercover Intelligence</option>
                <option value="vip">VIP & Event Protection</option>
                <option value="risk">Risk Assessment</option>
                <option value="other">Other Inquiry</option>
              </select>
              {errors.service && (
                <span className="text-[10px] text-red-500 flex items-center gap-1">
                  <AlertCircle size={10} /> {errors.service}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy block">
                Message / Operational Requirements <span className="text-brand-teal">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Please describe your security requirements..."
                className={`w-full bg-brand-light-grey border ${errors.message ? 'border-red-500' : 'border-black/5'} px-4 py-3 text-sm focus:outline-none focus:border-brand-teal transition-colors resize-none`}
              />
              {errors.message && (
                <span className="text-[10px] text-red-500 flex items-center gap-1">
                  <AlertCircle size={10} /> {errors.message}
                </span>
              )}
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 text-red-600 text-xs flex items-center gap-3">
                <AlertCircle size={16} />
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-navy text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-blue transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Inquiry
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
