#!/bin/bash

# Ensure public directory exists
mkdir -p public

# Copy imgs directory to public if it doesn't exist
if [ ! -d "public/imgs" ]; then
  echo "Copying imgs directory to public"
  cp -r imgs public/
fi

# Copy js directory to public if it doesn't exist
if [ ! -d "public/js" ]; then
  echo "Copying js directory to public"
  cp -r js public/
fi

# Copy CSS files to public
echo "Copying CSS files to public"
cp -f styles.css public/ 2>/dev/null || :

# Copy JavaScript files to public
echo "Copying JavaScript files to public"
cp -f script.js public/ 2>/dev/null || :
cp -f BlurGradientBg.js public/ 2>/dev/null || :

# Copy HTML files to public
echo "Copying HTML files to public"
cp -f index.html public/ 2>/dev/null || :

echo "Build script completed"
