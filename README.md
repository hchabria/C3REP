# Video Generator

A Next.js application that generates engaging POV-style videos using AI. The application uses OpenAI's DALL-E for image generation, PIAPI for animation, and FFmpeg for video processing.

## Features

- Generate video frames using AI
- Animate frames using PIAPI
- Combine frames into a final video with background music
- Real-time progress tracking
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- FFmpeg installed on your system
- Supabase account
- OpenAI API key
- PIAPI key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
PIAPI_KEY=your_piapi_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Set up the database:
   - Create a new Supabase project
   - Run the migration file in `supabase/migrations/20240406000000_initial_schema.sql`
4. Add a background music file:
   - Place an MP3 file at `public/audio/background.mp3`
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `app/` - Next.js app directory
  - `api/` - API routes
    - `generate-frames/` - Generate frame descriptions using OpenAI
    - `generate-image/` - Generate images using DALL-E
    - `animate-frame/` - Animate frames using PIAPI
    - `render-video/` - Combine frames into final video
  - `create/` - Video creation page
  - `page.tsx` - Home page
- `components/` - Reusable UI components
- `lib/` - Utility functions and configurations
  - `supabase.ts` - Supabase client configuration
- `public/` - Static files
  - `audio/` - Background music
  - `images/` - Generated images
  - `temp/` - Temporary files
  - `videos/` - Final videos

## Database Schema

### video_projects
- `id` (UUID) - Primary key
- `title` (TEXT) - Project title
- `status` (TEXT) - Current status
- `video_url` (TEXT) - Final video URL
- `created_at` (TIMESTAMP) - Creation timestamp

### image_prompts
- `id` (UUID) - Primary key
- `project_id` (UUID) - Foreign key to video_projects
- `prompt_index` (INTEGER) - Frame index
- `prompt_text` (TEXT) - Frame description
- `image_url` (TEXT) - Generated image URL
- `video_url` (TEXT) - Animated frame URL
- `created_at` (TIMESTAMP) - Creation timestamp

## License

MIT 