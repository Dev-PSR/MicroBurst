/*
  # Initial Schema Setup for MicroBurst Courses

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `subscription` (text)
      - `created_at` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `type` (text)
      - `source_url` (text)
      - `delivery_schedule` (text)
      - `delivery_time` (time)
      - `total_lessons` (integer)
      - `created_at` (timestamp)
      - `status` (text)
    
    - `lessons`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `order_number` (integer)
      - `title` (text)
      - `content` (text)
      - `scheduled_for` (timestamp)
      - `completed_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  subscription text DEFAULT 'free',
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('youtube', 'pdf')),
  source_url text,
  delivery_schedule text NOT NULL CHECK (delivery_schedule IN ('daily', 'weekdays', 'weekends', 'custom')),
  delivery_time time NOT NULL,
  total_lessons integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  phone_number text NOT NULL
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  order_number integer NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  completed_at timestamptz,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'skipped'))
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for courses table
CREATE POLICY "Users can read own courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for lessons table
CREATE POLICY "Users can read lessons from own courses"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id
      AND courses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update lessons from own courses"
  ON lessons
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id
      AND courses.user_id = auth.uid()
    )
  );