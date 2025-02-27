/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['saas-landing-page-fromgit.vercel.app'],
    unoptimized: true,
  },
  // Since this is a static site, we'll use static exports
  output: 'export',
}

module.exports = nextConfig
