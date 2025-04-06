
// render_script.js

/**
 * This script is meant to be run in a Node.js environment.
 * It generates a shell script to render a video using ffmpeg, based on 7 video clips and their matching audio + titles.
 */

// Mock input for demonstration (replace with actual input fetching in your environment)
const titles = ["Scene 1 Title", "Scene 2 Title", "Scene 3 Title", "Scene 4 Title", "Scene 5 Title", "Scene 6 Title", "Scene 7 Title"];
const videoUrls = [
  "https://example.com/video_0.mp4",
  "https://example.com/video_1.mp4",
  "https://example.com/video_2.mp4",
  "https://example.com/video_3.mp4",
  "https://example.com/video_4.mp4",
  "https://example.com/video_5.mp4",
  "https://example.com/video_6.mp4"
];
const audioUrls = [
  "https://example.com/audio_0.mp3",
  "https://example.com/audio_1.mp3",
  "https://example.com/audio_2.mp3",
  "https://example.com/audio_3.mp3",
  "https://example.com/audio_4.mp3",
  "https://example.com/audio_5.mp3",
  "https://example.com/audio_6.mp3"
];

// Configuration object
const config = {
  workDir: "/tmp/n8n",
  finalOutputName: "final_output.mp4",
  videoDuration: 5,
  video: {
    width: 720,
    height: 1280,
    frameRate: 30,
    pixelFormat: "yuv420p",
    bitrate: "4M"
  },
  ffmpeg: {
    videoCodec: "libx264",
    audioCodec: "aac",
    audioChannels: 2,
    audioBitrate: "192k",
    preset: "medium"
  },
  transitions: {
    fadeIn: { enabled: true, duration: 0.5 },
    fadeOut: { enabled: true, duration: 0.5 }
  },
  textOverlay: {
    fontColor: "white",
    fontSize: 48,
    boxColor: "black@0.5",
    boxBorderWidth: 10,
    topPosition: 20,
    lineSpacing: 10,
    font: "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    maxTextLength: 25,
    textWidth: 80
  },
  metadata: {
    title: "Video Compilation",
    artist: "VASA Project",
    comment: "Created with n8n workflow",
    copyright: "© " + new Date().getFullYear()
  }
};

function splitTitleIntoLines(title, maxLength) {
  if (!title) return [''];
  let escaped = title.replace(/"/g, '\"').replace(/\s+/g, ' ').trim();
  const words = escaped.split(' ').filter(word => word.length > 0);
  let lines = [], currentLine = '';
  words.forEach(word => {
    if (currentLine.length + word.length + 1 > maxLength && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  });
  if (currentLine) lines.push(currentLine);
  if (lines.length === 1 && words.length >= 5 && lines[0].length > maxLength * 0.8) {
    const midPoint = Math.floor(words.length / 2);
    lines = [words.slice(0, midPoint).join(' '), words.slice(midPoint).join(' ')];
  }
  return lines;
}

function generateTextFilters(lines, config) {
  if (!lines || lines.length === 0) return '';
  const baseY = config.textOverlay.topPosition / 100;
  const lineHeight = config.textOverlay.fontSize * 1.5 / config.video.height;
  return lines.map((line, index) => {
    const yPosition = baseY + (index * lineHeight);
    const escapedText = line.replace(/'/g, "''");
    return \`drawtext=text='\${escapedText}':x=(w-tw)/2:y=h*\${yPosition}:fontcolor=\${config.textOverlay.fontColor}:fontsize=\${config.textOverlay.fontSize}:fontfile=\${config.textOverlay.font}:box=1:boxcolor=\${config.textOverlay.boxColor}:boxborderw=\${config.textOverlay.boxBorderWidth}:fix_bounds=true\`;
  }).join(',');
}

function generateMetadataArgs(config) {
  const metadata = [];
  if (config.metadata.title) metadata.push(\`-metadata title="\${config.metadata.title}"\`);
  if (config.metadata.artist) metadata.push(\`-metadata artist="\${config.metadata.artist}"\`);
  if (config.metadata.comment) metadata.push(\`-metadata comment="\${config.metadata.comment}"\`);
  if (config.metadata.copyright) metadata.push(\`-metadata copyright="\${config.metadata.copyright}"\`);
  return metadata.join(' ');
}

let script = `#!/bin/sh
set -e
WORK_DIR="${config.workDir}"
mkdir -p $WORK_DIR
cd $WORK_DIR
rm -rf $WORK_DIR/video_* $WORK_DIR/audio_* $WORK_DIR/merged_* $WORK_DIR/file_list.txt $WORK_DIR/${config.finalOutputName}
echo "Downloading videos and audio files..."
`;

for (let i = 0; i < titles.length; i++) {
  const titleLines = splitTitleIntoLines(titles[i] || \`Video \${i}\`, config.textOverlay.maxTextLength);
  const textFilters = generateTextFilters(titleLines, config);
  script += `
VIDEO_URL="${videoUrls[i]}"
AUDIO_URL="${audioUrls[i]}"
curl -L "$VIDEO_URL" -o "$WORK_DIR/video_${i}.mp4"
curl -L "$AUDIO_URL" -o "$WORK_DIR/audio_${i}.mp3"
ffmpeg -y -i "$WORK_DIR/video_${i}.mp4" -i "$WORK_DIR/audio_${i}.mp3" \
  -map 0:v -map 1:a -c:v ${config.ffmpeg.videoCodec} -c:a ${config.ffmpeg.audioCodec} \
  -r ${config.video.frameRate} -b:v ${config.video.bitrate} -pix_fmt ${config.video.pixelFormat} \
  -ac ${config.ffmpeg.audioChannels} -b:a ${config.ffmpeg.audioBitrate} \
  -s ${config.video.width}x${config.video.height} -preset ${config.ffmpeg.preset} \
  -vf "scale=${config.video.width}:${config.video.height},setsar=1:1,fade=t=in:st=0:d=${config.transitions.fadeIn.duration},fade=t=out:st=${config.videoDuration - config.transitions.fadeOut.duration}:d=${config.transitions.fadeOut.duration},${textFilters}" \
  ${generateMetadataArgs(config)} \
  "$WORK_DIR/merged_${i}.mp4"
echo "file '$WORK_DIR/merged_${i}.mp4'" >> "$WORK_DIR/file_list.txt"
`;
}

script += `
ffmpeg -y -f concat -safe 0 -i "$WORK_DIR/file_list.txt" -c:v ${config.ffmpeg.videoCodec} -b:v ${config.video.bitrate} \
  -pix_fmt ${config.video.pixelFormat} -r ${config.video.frameRate} \
  -c:a ${config.ffmpeg.audioCodec} -b:a ${config.ffmpeg.audioBitrate} -ac ${config.ffmpeg.audioChannels} \
  -s ${config.video.width}x${config.video.height} -preset ${config.ffmpeg.preset} -movflags +faststart \
  ${generateMetadataArgs(config)} -pass 1 -f mp4 /dev/null

ffmpeg -y -f concat -safe 0 -i "$WORK_DIR/file_list.txt" -c:v ${config.ffmpeg.videoCodec} -b:v ${config.video.bitrate} \
  -pix_fmt ${config.video.pixelFormat} -r ${config.video.frameRate} \
  -c:a ${config.ffmpeg.audioCodec} -b:a ${config.ffmpeg.audioBitrate} -ac ${config.ffmpeg.audioChannels} \
  -s ${config.video.width}x${config.video.height} -preset ${config.ffmpeg.preset} -movflags +faststart \
  ${generateMetadataArgs(config)} -pass 2 "$WORK_DIR/${config.finalOutputName}"

echo "Final video created at: $WORK_DIR/${config.finalOutputName}"
ls -la "$WORK_DIR/${config.finalOutputName}"
du -h "$WORK_DIR/${config.finalOutputName}"
ffprobe -v quiet -print_format json -show_format -show_streams "$WORK_DIR/${config.finalOutputName}"
echo "FINAL_VIDEO_PATH=$WORK_DIR/${config.finalOutputName}"
`;

const fs = require('fs');
fs.writeFileSync('render.sh', script);
console.log("✅ Shell script 'render.sh' created successfully!");
