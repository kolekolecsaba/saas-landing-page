# SaaS Landing Page

A landing page for an AI Email Marketing SaaS product.

## Local Development

To run the project locally:

```bash
npm install
npm run dev
```

This will start a local development server.

## Deployment to Vercel

This project is configured for deployment on Vercel. The following files are important for the deployment:

- `vercel.json`: Configuration for Vercel deployment
- `vercel.build.sh`: Build script that runs during deployment
- `.vercelignore`: Files to ignore during deployment

### Deployment Steps

1. Push your changes to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy the project

## Project Structure

- `index.html`: Main HTML file
- `styles.css`: Main CSS file
- `script.js`: Main JavaScript file
- `js/`: Directory containing JavaScript modules
- `imgs/`: Directory containing images
- `public/`: Directory for static assets (used by Vercel)

## Troubleshooting

If images are not loading on Vercel:

1. Make sure all image paths use relative paths with `./imgs/` format
2. Check that the build script is copying all necessary files to the public directory
3. Verify that the Vercel configuration is correct
