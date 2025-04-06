const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const util = require('util');
const execAsync = util.promisify(exec);

// Constants
const WIDTH = 720;
const HEIGHT = 1280;
const FRAMES = 7;
const WORK_DIR = './temp';
const OUTPUT_FILE = 'sample-video.mp4';
const FRAME_DURATION = 5; // seconds per frame
const TOTAL_DURATION = FRAMES * FRAME_DURATION; // 35 seconds total
const PUBLIC_DIR = './public';

// Ensure work directory exists and is clean
if (fs.existsSync(WORK_DIR)) {
  fs.rmSync(WORK_DIR, { recursive: true, force: true });
}
fs.mkdirSync(WORK_DIR);

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

// Generate a single frame
const generateFrame = (frameNumber) => {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#4F46E5'); // Purple
  gradient.addColorStop(1, '#EC4899'); // Pink
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Add decorative elements
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(WIDTH / 2, HEIGHT / 2, 200, 0, Math.PI * 2);
  ctx.fill();

  // Add text
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Frame number
  ctx.font = 'bold 48px Arial';
  ctx.fillText(`Frame ${frameNumber}`, WIDTH / 2, HEIGHT / 2 - 50);

  // POV Style
  ctx.font = 'bold 36px Arial';
  ctx.fillText('POV Style Video', WIDTH / 2, HEIGHT / 2 + 20);

  // Resolution
  ctx.font = '24px Arial';
  ctx.fillText(`${WIDTH}x${HEIGHT}`, WIDTH / 2, HEIGHT / 2 + 70);

  // Save frame to both temp and public directories
  const framePath = path.join(WORK_DIR, `frame_${frameNumber}.jpg`);
  const publicFramePath = path.join(PUBLIC_DIR, `frame_${frameNumber}.jpg`);
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(framePath, buffer);
  fs.writeFileSync(publicFramePath, buffer);
};

// Main render function
const render = async () => {
  console.log('🎬 Starting render process...');
  console.log('📁 Creating work directory...');

  // Generate frames
  console.log('🖼  Generating frames...');
  for (let i = 1; i <= FRAMES; i++) {
    generateFrame(i);
    console.log(`   Frame ${i}/${FRAMES} complete`);
  }

  // Create video
  console.log('🎥 Creating video...');
  const framePattern = path.join(WORK_DIR, 'frame_%d.jpg');
  const videoPath = path.join(WORK_DIR, 'output.mp4');

  // Create video with each frame shown for 5 seconds
  const ffmpegCommand = `${ffmpeg} -framerate 1/${FRAME_DURATION} -i ${framePattern} -c:v libx264 -pix_fmt yuv420p -vf "scale=720:1280,setsar=1:1" -r 30 ${videoPath}`;
  await execAsync(ffmpegCommand);

  // Add audio
  console.log('🔊 Adding audio...');
  const finalVideoPath = path.join(WORK_DIR, OUTPUT_FILE);
  const audioCommand = `${ffmpeg} -i ${videoPath} -f lavfi -i "sine=frequency=1000:duration=${TOTAL_DURATION}" -c:v copy -c:a aac -shortest ${finalVideoPath}`;
  await execAsync(audioCommand);

  // Move final video to public directory
  fs.copyFileSync(finalVideoPath, path.join(PUBLIC_DIR, OUTPUT_FILE));

  // Cleanup
  console.log('🧹 Cleaning up...');
  fs.rmSync(WORK_DIR, { recursive: true, force: true });

  console.log('\n✅ Render complete!');
  console.log('📝 Video details:');
  console.log(`   • File: ${OUTPUT_FILE}`);
  console.log(`   • Resolution: ${WIDTH}x${HEIGHT}`);
  console.log(`   • Frames: ${FRAMES}`);
  console.log(`   • Duration: ${TOTAL_DURATION} seconds`);
  console.log(`   • Frame Duration: ${FRAME_DURATION} seconds each`);
};

// Run the render process
render().catch((error) => {
  console.error('❌ Error during render:', error);
  // Cleanup on error
  if (fs.existsSync(WORK_DIR)) {
    fs.rmSync(WORK_DIR, { recursive: true, force: true });
  }
  process.exit(1);
}); 