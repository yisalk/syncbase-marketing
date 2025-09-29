import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { apiRequests } from '@/common/apiRequests';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.company && formData.company.length > 100) {
      newErrors.company = 'Company name must be less than 100 characters';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.address && formData.address.length > 200) {
      newErrors.address = 'Address must be less than 200 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRequests('contact/submit', 'post', formData);
      
      if (response.data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          address: '',
          message: ''
        });
      } else {
        throw new Error(response.data.message || 'Failed to submit form');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      setErrors({
        submit: error.response?.data?.error?.message || 'Failed to submit form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen overflow-x-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Thank You!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(207, 90%, 54%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(207, 90%, 54%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions about SyncBase? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                    <p className="text-slate-600 dark:text-slate-400">support@syncbase.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Address</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      123 Tech Street<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Business Hours</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">
                  Quick Response
                </CardTitle>
                <CardDescription>
                  We typically respond to all inquiries within 24 hours during business days.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-slate-300 dark:border-slate-600">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 dark:text-white">
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Your full name"
                        maxLength={100}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your.email@example.com"
                        maxLength={100}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-700 dark:text-slate-300">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`${errors.company ? 'border-red-500' : ''}`}
                        placeholder="Your company name"
                        maxLength={100}
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm">{errors.company}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+1 (555) 123-4567"
                        maxLength={20}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-slate-700 dark:text-slate-300">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`${errors.address ? 'border-red-500' : ''}`}
                      placeholder="Your address (optional)"
                      maxLength={200}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell us how we can help you..."
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center">
                      {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      )}
                      <p className="text-slate-500 text-sm ml-auto">
                        {formData.message.length}/1000 characters
                      </p>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-red-700 dark:text-red-300 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
