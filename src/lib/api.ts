import { supabase } from './supabase';
import type { Database } from './database.types';

type Course = Database['public']['Tables']['courses']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];

export async function createCourse(courseData: Omit<Course, 'id' | 'created_at'>) {
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .insert([courseData])
    .select()
    .single();

  if (courseError) throw courseError;

  // Process content based on type
  const processEndpoint = courseData.type === 'youtube' 
    ? 'process-youtube'
    : 'process-pdf';

  const processResponse = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${processEndpoint}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: courseData.source_url,
      }),
    }
  );

  const { lessons } = await processResponse.json();

  // Create lessons
  const { error: lessonsError } = await supabase
    .from('lessons')
    .insert(
      lessons.map((lesson: any, index: number) => ({
        course_id: course.id,
        order_number: index + 1,
        title: lesson.title,
        content: lesson.content,
        scheduled_for: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString(),
      }))
    );

  if (lessonsError) throw lessonsError;

  return course;
}

export async function getCourse(id: string) {
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (courseError) throw courseError;

  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', id)
    .order('order_number');

  if (lessonsError) throw lessonsError;

  return { course, lessons };
}

export async function updateLessonStatus(lessonId: string, status: 'completed' | 'skipped') {
  const { error } = await supabase
    .from('lessons')
    .update({ 
      status,
      completed_at: status === 'completed' ? new Date().toISOString() : null,
    })
    .eq('id', lessonId);

  if (error) throw error;
}

export async function sendWhatsAppMessage(phoneNumber: string, message: string) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-whatsapp`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, message }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send WhatsApp message');
  }

  return response.json();
}