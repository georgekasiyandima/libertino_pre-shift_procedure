#!/bin/bash

# Libertino Pre-Shift Briefing System - Vercel Deployment Script

echo "🚀 Deploying Libertino Pre-Shift Briefing System to Vercel"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel"
    echo "Please run: vercel login"
    echo "Then run this script again."
    exit 1
fi

echo "✓ Build check..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "✓ Build successful!"
echo ""
echo "Deploying to Vercel..."
echo ""

# Deploy to production
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your app is now live on Vercel!"
echo "Check the URL provided above."

