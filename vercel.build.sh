#!/bin/bash

# Ensure public directory exists
mkdir -p public

# Copy imgs directory to public if it doesn't exist
if [ ! -d "public/imgs" ]; then
  echo "Copying imgs directory to public"
  cp -r imgs public/
fi

echo "Build script completed"
