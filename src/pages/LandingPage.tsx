import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, PlayCircle, FileText, Calendar, MessageSquare, Check } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Turn <span className="text-orange-400">Long Content</span> into <span className="text-orange-400">Bite-Sized Learning</span>
              </h1>
              <p className="text-xl text-blue-100">
                MicroBurst transforms YouTube playlists and PDF books into 30-day WhatsApp micro-courses, helping you finally finish what you start.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg">
                    Start Learning
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="#how-it-works">
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl transform translate-y-4 transition-all duration-500 hover:translate-y-0">
              <img 
                src="https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Learning on mobile" 
                className="w-full h-auto rounded-t-xl"
              />
              <div className="bg-white p-6 rounded-b-xl">
                <div className="flex items-center text-gray-800 mb-4">
                  <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
                  <p className="font-medium">Today's Micro-Lesson</p>
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">Design Thinking: Chapter 3</h3>
                <p className="text-gray-600 text-sm mb-4">Today's bite: Understanding user empathy through interviews (5 mins)</p>
                <div className="flex space-x-2">
                  <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">Done</button>
                  <button className="bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">Skip</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How MicroBurst Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple process turns overwhelming content into manageable daily learning sessions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 h-16 w-16 rounded-full mb-6">
                <PlayCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Choose Your Content</h3>
              <p className="text-gray-600">
                Paste a YouTube playlist URL or upload a PDF book you've been meaning to get through.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center bg-orange-100 text-orange-600 h-16 w-16 rounded-full mb-6">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Set Your Schedule</h3>
              <p className="text-gray-600">
                Choose when you want to receive your micro-lessons: daily, weekdays, or weekends.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center bg-green-100 text-green-600 h-16 w-16 rounded-full mb-6">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Learn Daily</h3>
              <p className="text-gray-600">
                Receive bite-sized chunks directly to WhatsApp or Telegram, with simple tracking buttons.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Learn From Any Type of Content
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                MicroBurst works with different formats to fit your learning style and the material you're interested in.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">YouTube Playlists</h3>
                    <p className="text-gray-600">
                      We slice long videos into 5-minute segments that are perfect for daily learning.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">PDF Books & Articles</h3>
                    <p className="text-gray-600">
                      We transform long documents into 3-page bites that build on each other daily.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Audio Content</h3>
                    <p className="text-gray-600">
                      Coming soon: Podcasts and audiobooks divided into perfect 10-minute segments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/create-course">
                  <Button>
                    Create Your First Course
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105">
                <img 
                  src="https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="YouTube learning" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg transform translate-y-8 transition-all duration-500 hover:scale-105">
                <img 
                  src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="PDF reading" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg transform translate-y-4 transition-all duration-500 hover:scale-105">
                <img 
                  src="https://images.pexels.com/photos/5039644/pexels-photo-5039644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Mobile learning" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg transform translate-y-12 transition-all duration-500 hover:scale-105">
                <img 
                  src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Audio learning" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with a free course and upgrade when you're ready for more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Free Trial</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                </div>
                <p className="mt-2 text-gray-500">One course only</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">One free micro-course</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Basic learning features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">30 days of lessons</span>
                </li>
              </ul>
              
              <Link to="/register" className="block w-full">
                <Button variant="outline" fullWidth>Get Started</Button>
              </Link>
            </div>
            
            <div className="bg-blue-600 rounded-xl p-8 border border-blue-500 shadow-xl transform scale-105 -translate-y-2 z-10">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full uppercase font-bold">Most Popular</span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Monthly</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-4xl font-extrabold text-white">$4.99</span>
                  <span className="text-white self-end ml-1">/month</span>
                </div>
                <p className="mt-2 text-blue-200">Per additional course</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Unlimited courses</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Advanced tracking features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Custom learning schedules</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Premium course templates</span>
                </li>
              </ul>
              
              <Link to="/register" className="block w-full">
                <Button className="bg-white text-blue-700 hover:bg-blue-50" fullWidth>Choose Monthly</Button>
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Annual</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-4xl font-extrabold text-gray-900">$9</span>
                  <span className="text-gray-500 self-end ml-1">/year</span>
                </div>
                <p className="mt-2 text-gray-500">Save 85%</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Everything in Monthly</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Priority customer support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Early access to new features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Unlimited course archives</span>
                </li>
              </ul>
              
              <Link to="/register" className="block w-full">
                <Button variant="outline" fullWidth>Choose Annual</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform How You Learn?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Create your first micro-course for free and experience the power of bite-sized learning that fits into your busy life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Create Free Account
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;