import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Clock, PlayCircle, SkipForward } from 'lucide-react';
import Button from '../components/ui/Button';
import { getCourse, updateLessonStatus } from '../lib/api';
import { useToast } from '../context/ToastContext';
import type { Database } from '../lib/database.types';

type Course = Database['public']['Tables']['courses']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    
    const loadCourse = async () => {
      try {
        const { course, lessons } = await getCourse(id);
        setCourse(course);
        setLessons(lessons);
      } catch (error) {
        showToast('Failed to load course', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourse();
  }, [id, showToast]);
  
  const handleLessonStatus = async (lessonId: string, status: 'completed' | 'skipped') => {
    try {
      await updateLessonStatus(lessonId, status);
      setLessons(lessons.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, status, completed_at: status === 'completed' ? new Date().toISOString() : null }
          : lesson
      ));
      showToast(`Lesson marked as ${status}`, 'success');
    } catch (error) {
      showToast('Failed to update lesson status', 'error');
    }
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  const completedLessons = lessons.filter(lesson => 
    lesson.status === 'completed' || lesson.status === 'skipped'
  ).length;
  
  const progress = (completedLessons / lessons.length) * 100;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.name}</h1>
            <div className="flex items-center text-gray-500 mb-4">
              {course.type === 'youtube' ? (
                <PlayCircle className="h-5 w-5 text-red-600 mr-2" />
              ) : (
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              )}
              <span className="capitalize">{course.type}</span>
              <span className="mx-2">•</span>
              <Clock className="h-5 w-5 mr-2" />
              <span>{course.delivery_schedule}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Progress</div>
            <div className="text-2xl font-bold text-gray-900">
              {completedLessons} of {lessons.length}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div 
            key={lesson.id}
            className={`bg-white rounded-lg shadow-sm border p-6 ${
              lesson.status === 'completed'
                ? 'border-green-200 bg-green-50'
                : lesson.status === 'skipped'
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {lesson.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Scheduled for {formatDate(lesson.scheduled_for)}
                </div>
              </div>
              
              {lesson.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleLessonStatus(lesson.id, 'completed')}
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLessonStatus(lesson.id, 'skipped')}
                  >
                    <SkipForward className="h-4 w-4 mr-1" />
                    Skip
                  </Button>
                </div>
              )}
              
              {lesson.status === 'completed' && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Completed {lesson.completed_at && formatDate(lesson.completed_at)}
                </div>
              )}
              
              {lesson.status === 'skipped' && (
                <div className="flex items-center text-gray-500">
                  <SkipForward className="h-5 w-5 mr-2" />
                  Skipped
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;