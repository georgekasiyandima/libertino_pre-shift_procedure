# Deployment Guide for Libertino Pre-Shift Briefing System

## Quick Start for Restaurant Use

### Option 1: Local Network Deployment (Recommended for Restaurant)

This allows the system to run on a local computer/tablet accessible by all staff on the restaurant WiFi.

#### Requirements:
- Computer or tablet running Windows/Mac/Linux
- Node.js 18+ installed
- Restaurant WiFi network

#### Steps:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Logo**
   - Place your Libertino logo file in: `public/images/libertino-logo.png`
   - Supported formats: PNG, JPG, SVG
   - Recommended size: 200x60px or similar aspect ratio

3. **Start the Server**
   ```bash
   npm run dev
   ```
   - Server runs on: `http://localhost:3001`
   - Access from any device on the same WiFi network

4. **Find Your Computer's IP Address**
   - **Windows**: Open Command Prompt, type `ipconfig`, look for "IPv4 Address"
   - **Mac/Linux**: Open Terminal, type `ifconfig` or `ip addr`, look for your WiFi IP
   - Example: `192.168.1.100`

5. **Access from Other Devices**
   - On tablets/phones connected to restaurant WiFi:
   - Open browser and go to: `http://YOUR_IP_ADDRESS:3001`
   - Example: `http://192.168.1.100:3001`

6. **Make it Permanent**
   - Keep the computer running during service hours
   - Consider setting up as a service (see below)

### Option 2: Production Build (Better Performance)

For better performance in the restaurant:

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Access the same way** as above using your IP address

### Option 3: Cloud Deployment (Access from Anywhere)

Deploy to Vercel (Free) for access from anywhere:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Your app will be live at: `https://your-app-name.vercel.app`

3. **Update Environment Variables** (if needed)
   - Go to Vercel dashboard
   - Add any environment variables

## Setting Up as a Service (Windows)

1. **Install PM2** (Process Manager)
   ```bash
   npm install -g pm2
   ```

2. **Start the Application**
   ```bash
   pm2 start npm --name "libertino-briefing" -- start
   ```

3. **Save Configuration**
   ```bash
   pm2 save
   pm2 startup
   ```

4. **Application will auto-start on computer boot**

## Setting Up as a Service (Mac/Linux)

1. **Install PM2**
   ```bash
   npm install -g pm2
   ```

2. **Start the Application**
   ```bash
   pm2 start npm --name "libertino-briefing" -- start
   ```

3. **Save and Setup Auto-start**
   ```bash
   pm2 save
   pm2 startup
   # Follow the command it outputs
   ```

## Adding Your Logo

1. **Place Logo File**
   - Copy your logo file to: `public/images/libertino-logo.png`
   - If your logo has a different name/format, update the path in `app/page.tsx` line 90

2. **Supported Formats**
   - PNG (recommended)
   - JPG/JPEG
   - SVG (best for scaling)

3. **Recommended Sizes**
   - Width: 200-300px
   - Height: 40-80px
   - Aspect ratio: ~3:1 or 4:1

4. **If Logo Doesn't Appear**
   - Check file path: `public/images/libertino-logo.png`
   - Check file name matches exactly (case-sensitive)
   - The system will hide the logo gracefully if file is missing

## Admin Panel Access

- **URL**: `http://YOUR_IP:3001/admin` or `http://localhost:3001/admin`
- **No password required** (add authentication in production)
- **Features**:
  - Update Salad of the Day
  - Update Dessert of the Day
  - Post SOS Messages
  - Post Floor Updates
  - Add Item Locations

## Real-Time Updates

The system automatically refreshes every 30 seconds to show:
- New SOS messages
- Floor updates
- Table status changes
- Capacity updates

## For Your Manager Pitch

### Key Features to Demonstrate:

1. **Admin Panel** (`/admin`)
   - Show how easy it is to update salad/dessert
   - Post real-time floor messages
   - Add item locations

2. **Real-Time Communication**
   - SOS messaging system
   - Floor updates
   - Item location finder

3. **Table Turn Optimization**
   - Peak hours awareness
   - Section capacity tracking
   - Service timing guidelines

4. **Visual Floor Plan**
   - Real-time table status
   - Seating arrangement by bookings
   - Waiter allocation

### Benefits to Highlight:

- ✅ **Reduces Wait Times**: Better coordination = faster service
- ✅ **Improves Communication**: Real-time updates keep everyone informed
- ✅ **Increases Table Turnover**: 10-30% improvement expected
- ✅ **Easy to Use**: Simple admin panel, no technical knowledge needed
- ✅ **Mobile-Friendly**: Works on tablets and phones
- ✅ **No POS Required**: Works standalone, ready for future integration

### Demo Flow:

1. Open briefing page on tablet
2. Show admin panel - update salad/dessert
3. Post a floor message - show it appears instantly
4. Show SOS messaging - demonstrate team communication
5. Show seating arrangement - visualize bookings
6. Show floor plan - real-time table status

## Troubleshooting

### Logo Not Showing
- Check file exists at `public/images/libertino-logo.png`
- Restart server after adding logo
- Check browser console for errors

### Can't Access from Other Devices
- Ensure all devices on same WiFi network
- Check firewall isn't blocking port 3001
- Verify IP address is correct

### Changes Not Saving
- Admin panel uses in-memory storage (resets on server restart)
- For production, add database integration
- Changes persist during server session

### Server Won't Start
- Check Node.js version: `node --version` (need 18+)
- Delete `node_modules` and run `npm install` again
- Check port 3001 isn't already in use

## Next Steps for Production

1. **Add Database**
   - PostgreSQL or MongoDB for persistent storage
   - Store admin updates, messages, etc.

2. **Add Authentication**
   - Protect admin panel with login
   - Role-based access (Manager, Staff)

3. **POS Integration**
   - Connect to your POS system
   - Real-time table status updates
   - Automatic turn time calculation

4. **DinePlan Integration**
   - Connect to DinePlan API
   - Automatic reservation import
   - Real-time booking updates

5. **Notifications**
   - Push notifications for urgent SOS messages
   - Email alerts for managers

## Support

For issues or questions:
- Check the README.md for general information
- Check ARCHITECTURE.md for technical details
- Check TABLE_TURN_OPTIMIZATION.md for optimization features


