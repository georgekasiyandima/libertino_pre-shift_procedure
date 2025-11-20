# Libertino Pre-Shift Briefing System

A modern, mobile-friendly digital briefing system for daily pre-shift notes in restaurant operations.

## Features

- 📱 **Mobile-First Design**: Optimized for viewing on tablets and phones during pre-shift meetings
- 🥗 **Salad of the Day**: Display today's featured salad with ingredients
- 🍰 **Dessert of the Day**: Highlight today's featured dessert
- ⚠️ **Missing Menu Items**: Track items unavailable on the menu for waiters to be aware of
- 👥 **Waiter Allocation**: View waiter assignments by floor section:
  - **MDA** (Main Dining Area): Tables 1-12
  - **Outside Section**: Tables 21-25
  - **Library Area**: Tables 61-66
- 🗺️ **Visual Floor Plan**: Real-time table status visualization showing:
  - Available, Reserved, Occupied, and Cleaning status
  - Waiter assignments per table
  - Clickable tables for detailed information
- 📅 **Reservations Summary**: View all reservations grouped by time (with DinePlan integration ready)
- 📋 **Service Reminders**: Priority-based reminders for staff

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling for rapid UI development
- **date-fns**: Date formatting utilities

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   └── briefing/
│   │       └── route.ts          # API endpoint for briefing data
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main briefing page
├── components/
│   ├── SaladOfTheDay.tsx         # Salad of the day component
│   ├── DessertOfTheDay.tsx       # Dessert of the day component
│   ├── MissingMenuItems.tsx      # Missing menu items component
│   ├── WaiterAllocation.tsx      # Waiter allocation by section
│   ├── FloorPlan.tsx             # Visual floor plan with table status
│   ├── Reservations.tsx          # Reservations component
│   └── ServiceReminders.tsx      # Service reminders component
├── lib/
│   └── dineplan.ts               # DinePlan API integration utility
├── types/
│   └── index.ts                  # TypeScript type definitions
└── package.json
```

## API Integration

### Current Implementation

The `/api/briefing` route currently returns mock data. This is perfect for development and testing.

### DinePlan Integration

To integrate with DinePlan API:

1. Add your DinePlan API credentials to environment variables:
```bash
# .env.local
DINEPLAN_API_KEY=your_api_key
DINEPLAN_API_URL=https://api.dineplan.com
```

2. Update `app/api/briefing/route.ts` to fetch real reservation data:
```typescript
// Fetch reservations from DinePlan
const dinePlanResponse = await fetch(
  `${process.env.DINEPLAN_API_URL}/reservations?date=${today}`,
  {
    headers: {
      'Authorization': `Bearer ${process.env.DINEPLAN_API_KEY}`,
    },
  }
)
const reservations = await dinePlanResponse.json()
```

### Database Integration

For production use, consider:
- Storing briefing data in a database (PostgreSQL, MongoDB, etc.)
- Creating an admin panel for managers to update daily briefings
- Adding authentication for data management endpoints

## Customization

### Styling

The app uses Tailwind CSS. Customize colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your brand colors
  },
}
```

### Adding New Sections

1. Define the type in `types/index.ts`
2. Create a component in `components/`
3. Add it to `app/page.tsx`
4. Update the API route to include the new data

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Options

- **Vercel**: One-click deployment (recommended for Next.js)
- **Netlify**: Great for static sites
- **Docker**: Containerize for any platform

## Real-Time Table Status

The floor plan component displays real-time table status. To enable real-time updates:

1. **WebSocket Integration**: Connect to your POS system via WebSockets
2. **Polling**: Update table status every 30-60 seconds
3. **Server-Sent Events**: Use SSE for push updates

Example WebSocket integration:
```typescript
// In FloorPlan component
useEffect(() => {
  const ws = new WebSocket('ws://your-pos-system/table-status')
  ws.onmessage = (event) => {
    const updatedTables = JSON.parse(event.data)
    setTables(updatedTables)
  }
  return () => ws.close()
}, [])
```

## Future Enhancements

- [ ] Admin panel for updating briefings
- [ ] Real-time table status updates via WebSockets/POS integration
- [ ] Print-friendly view
- [ ] Historical briefing archive
- [ ] Staff acknowledgment system
- [ ] Integration with POS systems for live table status
- [ ] Push notifications for updates
- [ ] Table reservation management interface

## License

Private - Internal use only

