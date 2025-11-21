# Deploy to Vercel - Quick Guide

## Prerequisites
- GitHub account (your code is already on GitHub)
- Vercel account (free tier works perfectly)

## Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign up/Login with GitHub

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find: `georgekasiyandima/libertino_pre-shift_procedure`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables** (Optional - for future use)
   - Click "Environment Variables"
   - Add if needed:
     - `DINEPLAN_API_KEY` (if you have it)
     - `DINEPLAN_API_URL` (if you have it)
     - `NEXT_PUBLIC_APP_URL` (auto-set by Vercel)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live!

6. **Access Your App**
   - Vercel will provide a URL like: `https://libertino-pre-shift-procedure.vercel.app`
   - Share this URL with your team
   - Access from anywhere (no local network needed)

## Option 2: Deploy via Vercel CLI (Advanced)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select your project settings
   - Deploy!

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Update Your URLs
After deployment, update any hardcoded URLs:
- Admin panel: `https://your-app.vercel.app/admin`
- Briefing page: `https://your-app.vercel.app`

### Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `briefing.libertino.com`)
3. Follow DNS setup instructions

### Environment Variables
If you need to add environment variables later:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables
3. Redeploy (or they'll auto-deploy on next push)

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets its own preview URL

## Access Your Deployed App

Once deployed, you'll get:
- **Production URL**: `https://your-app.vercel.app`
- **Admin Panel**: `https://your-app.vercel.app/admin`
- **API Routes**: `https://your-app.vercel.app/api/briefing`

## Important Notes

### File Uploads
- Menu uploads are stored in `/public/uploads/menus/`
- In production, consider using:
  - Vercel Blob Storage
  - AWS S3
  - Cloudinary
  - Or another file storage service

### State Management
- Current implementation uses in-memory storage
- Data resets on server restart
- For production, add a database (PostgreSQL, MongoDB, etc.)

### Performance
- Vercel automatically optimizes Next.js apps
- Edge functions for global performance
- Automatic HTTPS
- CDN for static assets

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors locally first

### Environment Variables Not Working
- Make sure they're set in Vercel dashboard
- Redeploy after adding variables
- Use `process.env.VARIABLE_NAME` in code

### File Uploads Not Working
- Vercel has read-only filesystem in serverless functions
- Use external storage (S3, Cloudinary, etc.)
- Or use Vercel Blob Storage

## Next Steps

1. **Deploy now** using Option 1 (Dashboard)
2. **Test the deployed app**
3. **Share URL with your team**
4. **Set up custom domain** (optional)
5. **Add database** for persistent storage (future)

Your app will be live and accessible from anywhere! 🚀

