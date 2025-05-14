import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BarChart2, BookOpen, Clock, PlayCircle, FileText, MoreHorizontal, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const MOCK_COURSES = [
  {
    id: '1',
    name: 'UX Design Fundamentals',
    type: 'youtube',
    totalLessons: 30,
    completedLessons: 8,
    nextLesson: {
      title: 'User Research Methods',
      scheduledFor: '2025-02-15T09:00:00Z',
    },
    thumbnailUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'JavaScript: The Good Parts',
    type: 'pdf',
    totalLessons: 24,
    completedLessons: 24,
    thumbnailUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Digital Marketing Mastery',
    type: 'youtube',
    totalLessons: 30,
    completedLessons: 0,
    nextLesson: {
      title: 'SEO Fundamentals',
      scheduledFor: '2025-02-16T09:00:00Z',
    },
    thumbnailUrl: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'upcoming',
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  
  const filteredCourses = MOCK_COURSES.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return course.status !== 'completed';
    if (activeTab === 'completed') return course.status === 'completed';
    return true;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="mt-2 text-gray-600">
            Track and manage your micro-learning journey
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/create-course">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Active Courses</h2>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Completed Lessons</h2>
              <p className="text-2xl font-semibold text-gray-900">32 of 84</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Learning Streak</h2>
              <p className="text-2xl font-semibold text-gray-900">7 days</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subscription banner for free users */}
      {user?.subscription === 'free' && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Upgrade to Premium</h2>
              <p className="mt-1 text-blue-100">
                Create unlimited courses for just $4.99/month or $9/year
              </p>
            </div>
            <Link to="/pricing">
              <Button className="bg-white text-blue-700 hover:bg-blue-50">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {/* Course list tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Courses
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </nav>
      </div>
      
      {/* Course grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className="relative h-40">
                <img
                  src={course.thumbnailUrl}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-1 bg-white rounded-full shadow-sm">
                    <MoreHorizontal className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {course.status === 'completed' && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    COMPLETED
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {course.type === 'youtube' ? (
                    <PlayCircle className="h-4 w-4 text-red-600 mr-2" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-600 mr-2" />
                  )}
                  <span className="text-sm text-gray-600">
                    {course.type === 'youtube' ? 'YouTube' : 'PDF Book'}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <Link to={`/course/${course.id}`} className="hover:text-blue-600">
                    {course.name}
                  </Link>
                </h3>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                    />
                  </div>
                </div>
                
                {course.status !== 'completed' && course.nextLesson && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Next Lesson:</h4>
                    <p className="text-gray-900 font-medium">{course.nextLesson.title}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDate(course.nextLesson.scheduledFor)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">You don't have any {activeTab} courses yet.</p>
          <Link to="/create-course">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Course
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;