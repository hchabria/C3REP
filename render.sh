#!/bin/bash

# Create temp directory
WORK_DIR="./temp"
mkdir -p $WORK_DIR

# Generate sample frames
for i in {1..6}; do
  convert -size 720x1280 \
    gradient:purple-pink \
    -gravity center \
    -pointsize 48 \
    -fill white \
    -annotate 0 "Frame $i" \
    "$WORK_DIR/frame_$i.jpg"
done

# Create video from frames
ffmpeg -y \
  -framerate 24 \
  -i "$WORK_DIR/frame_%d.jpg" \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -vf "scale=720:1280,setsar=1:1" \
  "$WORK_DIR/output.mp4"

# Add audio
ffmpeg -y \
  -i "$WORK_DIR/output.mp4" \
  -f lavfi \
  -i "aevalsrc=0.1*sin(440*2*PI*t):d=5" \
  -c:v copy \
  -c:a aac \
  -shortest \
  "sample-video.mp4"

# Clean up
rm -rf $WORK_DIR

echo "✅ Sample video created: sample-video.mp4 (720x1280)" 