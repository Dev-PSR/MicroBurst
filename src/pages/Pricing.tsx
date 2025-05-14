import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Button from '../components/ui/Button';

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '0',
    description: 'Perfect for trying out the platform',
    features: [
      { name: 'One free micro-course', included: true },
      { name: 'Basic learning features', included: true },
      { name: '30 days of lessons', included: true },
      { name: 'WhatsApp delivery', included: true },
      { name: 'Custom schedules', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'Priority support', included: false },
    ],
    cta: 'Try for free',
    ctaLink: '/register',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: '4.99',
    period: 'per month',
    description: 'For regular learners',
    features: [
      { name: 'Unlimited courses', included: true },
      { name: 'Advanced tracking features', included: true },
      { name: 'Custom learning schedules', included: true },
      { name: 'WhatsApp delivery', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'Priority support', included: false },
    ],
    popular: true,
    cta: 'Choose monthly',
    ctaLink: '/register',
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '9',
    period: 'per year',
    description: 'Save 85% compared to monthly',
    features: [
      { name: 'Everything in Monthly', included: true },
      { name: 'Priority customer support', included: true },
      { name: 'Early access to new features', included: true },
      { name: 'Unlimited course archives', included: true },
      { name: 'Telegram integration', included: true },
      { name: 'Custom branding', included: true },
      { name: 'API access', included: true },
    ],
    cta: 'Choose annual',
    ctaLink: '/register',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How does the free trial work?',
    answer: 'Our free trial allows you to create one micro-course from any YouTube playlist or PDF book. You\'ll receive daily lessons for 30 days via WhatsApp. There\'s no credit card required, and you can upgrade to a paid plan anytime.',
  },
  {
    question: 'Can I change my delivery schedule?',
    answer: 'Yes, premium subscribers can change their delivery schedule at any time. You can choose between daily delivery, weekdays only, weekends only, or create a custom schedule that works for your learning style.',
  },
  {
    question: 'How does MicroBurst process my content?',
    answer: 'For YouTube playlists, we analyze the content and create intelligent 5-minute segments. For PDF books, we divide the content into approximately 3-page chunks that maintain context and readability. All content is delivered with tracking options to mark lessons as complete.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. If you cancel, you\'ll still have access to your subscription benefits until the end of your current billing period. We don\'t offer refunds for partial billing periods.',
  },
  {
    question: 'What messaging platforms do you support?',
    answer: 'Currently, we support WhatsApp for all plans. Telegram integration is available for annual subscribers. We plan to add more messaging platforms in the future based on user demand.',
  },
  {
    question: 'Is there a limit to how many courses I can create?',
    answer: 'Free users can create one course. Monthly and annual subscribers can create unlimited courses, making it perfect for continuous learners who want to tackle multiple subjects.',
  },
];

const Pricing: React.FC = () => {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    if (faqOpenIndex === index) {
      setFaqOpenIndex(null);
    } else {
      setFaqOpenIndex(index);
    }
  };
  
  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose the plan that works for your learning style. All plans include our core micro-learning features.
          </p>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-lg transform md:-translate-y-4 scale-105 z-10' 
                  : 'border border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1 text-sm font-bold uppercase">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 mt-1">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">${plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-xl text-gray-500">{plan.period}</span>
                  )}
                </div>
                
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <p className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.name}
                      </p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Link to={plan.ctaLink} className="block w-full">
                    <Button 
                      fullWidth
                      variant={plan.popular ? 'primary' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Feature comparison */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Compare All Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-blue-600 uppercase tracking-wider">
                    Monthly
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Annual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Number of Courses
                  </td>
                  <td className="px-6 py-4 text-center">1</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-medium">Unlimited</td>
                  <td className="px-6 py-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Course Length
                  </td>
                  <td className="px-6 py-4 text-center">30 days</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-medium">Unlimited</td>
                  <td className="px-6 py-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Content Types
                  </td>
                  <td className="px-6 py-4 text-center">YouTube, PDF</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-medium">YouTube, PDF</td>
                  <td className="px-6 py-4 text-center">All types + Audio</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Custom Schedules
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="h-5 w-5 text-gray-400 inline" />
                  </td>
                  <td className="px-6 py-4 text-center text-blue-600 font-medium">
                    <Check className="h-5 w-5 text-green-500 inline" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="h-5 w-5 text-green-500 inline" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Analytics
                  </td>
                  <td className="px-6 py-4 text-center">Basic</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-medium">Advanced</td>
                  <td className="px-6 py-4 text-center">Advanced</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Messaging Platforms
                  </td>
                  <td className="px-6 py-4 text-center">WhatsApp</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-medium">WhatsApp</td>
                  <td className="px-6 py-4 text-center">WhatsApp + Telegram</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Customer Support
                  </td>
                  <td className="px-6 py-4 text-center">Email</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-medium">Email</td>
                  <td className="px-6 py-4 text-center">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-gray-900 bg-white rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {faqOpenIndex === index ? (
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </span>
              </button>
              {faqOpenIndex === index && (
                <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Start with a free course today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;