# Logo Setup Instructions

## Quick Setup

1. **Place your logo file** in the `public/images/` folder
2. **Name it**: `libertino-logo.png`
3. **Restart the server** if it's running

## Step-by-Step Guide

### Step 1: Locate Your Logo File
Find your Libertino logo file on your computer.

### Step 2: Copy to Project
Copy the logo file to:
```
Libertino_Pre-Shift/public/images/libertino-logo.png
```

**Important**: The folder structure should be:
```
Libertino_Pre-Shift/
  └── public/
      └── images/
          └── libertino-logo.png  ← Your logo here
```

### Step 3: Supported Formats

The system supports these image formats:
- **PNG** (recommended) - `libertino-logo.png`
- **JPG/JPEG** - `libertino-logo.jpg`
- **SVG** (best for scaling) - `libertino-logo.svg`

### Step 4: Update Code (if using different format)

If your logo has a different name or format, update `app/page.tsx` line 90:

```tsx
<img
  src="/images/libertino-logo.png"  // Change this to match your file
  alt="Libertino Logo"
  className="h-12 w-auto object-contain"
/>
```

### Step 5: Restart Server

After adding the logo:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Recommended Logo Specifications

- **Width**: 200-300 pixels
- **Height**: 40-80 pixels  
- **Aspect Ratio**: 3:1 to 4:1 (wide format)
- **File Size**: Under 100KB for fast loading
- **Background**: Transparent PNG works best

## Troubleshooting

### Logo Not Showing?

1. **Check file location**
   - Must be in `public/images/`
   - File name must match exactly (case-sensitive)

2. **Check file name**
   - Should be `libertino-logo.png` (or .jpg, .svg)
   - No spaces or special characters

3. **Restart server**
   - Changes to `public/` folder require server restart

4. **Check browser console**
   - Press F12 → Console tab
   - Look for 404 errors
   - Check the exact path it's trying to load

5. **Try different format**
   - If PNG doesn't work, try JPG or SVG

### Logo Too Big/Small?

The logo automatically scales. To adjust size, edit `app/page.tsx` line 92:

```tsx
className="h-12 w-auto object-contain"  // h-12 = height, adjust as needed
```

Change `h-12` to:
- `h-8` for smaller
- `h-16` for larger
- `h-20` for extra large

### Logo Has Wrong Colors?

- Ensure your logo file has the correct colors
- The system displays the logo as-is
- For dark backgrounds, use a light logo
- For light backgrounds, use a dark logo

## Testing

After adding your logo:

1. Open `http://localhost:3001` in browser
2. Logo should appear in the top-left of the header
3. If not visible, check browser console for errors

## Alternative: Use SVG Logo

SVG logos scale perfectly at any size. If you have an SVG version:

1. Place it as `public/images/libertino-logo.svg`
2. Update the code to use `.svg` extension
3. SVG will look crisp on all screen sizes

## Need Help?

If you're having trouble:
1. Make sure the `public/images/` folder exists
2. Verify the file name matches exactly
3. Check file permissions (should be readable)
4. Try a simple PNG file first to test


