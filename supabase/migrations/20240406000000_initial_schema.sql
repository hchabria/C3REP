-- Create video_projects table
CREATE TABLE video_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'generating_frames', 'generating_images', 'animating', 'rendering', 'completed')),
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create image_prompts table
CREATE TABLE image_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES video_projects(id) ON DELETE CASCADE,
  prompt_index INTEGER NOT NULL,
  prompt_text TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(project_id, prompt_index)
);

-- Create indexes
CREATE INDEX idx_image_prompts_project_id ON image_prompts(project_id);
CREATE INDEX idx_image_prompts_prompt_index ON image_prompts(prompt_index);

-- Enable Row Level Security
ALTER TABLE video_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_prompts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to video_projects"
  ON video_projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to image_prompts"
  ON image_prompts FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to video_projects"
  ON video_projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert access to image_prompts"
  ON image_prompts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access to video_projects"
  ON video_projects FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update access to image_prompts"
  ON image_prompts FOR UPDATE
  USING (true)
  WITH CHECK (true); 