import { NextResponse } from 'next/server'
import { BriefingData, Table, Reservation } from '@/types'

// This is a mock API endpoint. In production, you would:
// 1. Connect to your database
// 2. Integrate with DinePlan API for reservations
// 3. Pull data from your CMS or admin panel
// 4. Integrate with POS system for real-time table status

export async function GET() {
  try {
    // Generate all tables for the floor plan
    const generateTables = (): Table[] => {
      const tables: Table[] = []
      
      // MDA Tables 1-12
      for (let i = 1; i <= 12; i++) {
        let waiterId: string | undefined
        let waiterName: string | undefined
        if (i <= 4) {
          waiterId = 'waiter-sanele'
          waiterName = 'Sanele'
        } else if (i <= 8) {
          waiterId = 'waiter-george'
          waiterName = 'George'
        } else if (i <= 12) {
          waiterId = 'waiter-carlos'
          waiterName = 'Carlos'
        }
        
        tables.push({
          id: `mda-${i}`,
          number: i,
          section: 'MDA',
          status: i <= 3 ? 'reserved' : i === 4 ? 'occupied' : 'available',
          waiterId,
          waiterName,
        })
      }
      
      // Outside Tables 21-25
      for (let i = 21; i <= 25; i++) {
        let waiterId: string | undefined
        let waiterName: string | undefined
        if (i <= 23) {
          waiterId = 'waiter-leon'
          waiterName = 'Leon'
        } else {
          waiterId = 'waiter-kiara'
          waiterName = 'Kiara'
        }
        
        tables.push({
          id: `outside-${i}`,
          number: i,
          section: 'Outside',
          status: i === 21 ? 'reserved' : 'available',
          waiterId,
          waiterName,
        })
      }
      
      // Library Tables 61-66
      for (let i = 61; i <= 66; i++) {
        tables.push({
          id: `library-${i}`,
          number: i,
          section: 'Library',
          status: i === 61 ? 'cleaning' : 'available',
          waiterId: i >= 61 ? 'waiter-sibs' : undefined,
          waiterName: i >= 61 ? 'Sibs' : undefined,
        })
      }
      
      return tables
    }

    const tables = generateTables()

    // Mock reservations
    const reservations: Reservation[] = [
      {
        id: '1',
        guestName: 'John Smith',
        partySize: 4,
        time: '6:00 PM',
        tableNumber: 1,
        section: 'MDA',
        specialRequests: 'Anniversary celebration',
        notes: 'Prefers window seating',
      },
      {
        id: '2',
        guestName: 'Sarah Johnson',
        partySize: 2,
        time: '6:00 PM',
        tableNumber: 2,
        section: 'MDA',
        notes: 'Vegetarian',
      },
      {
        id: '3',
        guestName: 'Michael Chen',
        partySize: 6,
        time: '7:30 PM',
        tableNumber: 3,
        section: 'MDA',
        specialRequests: 'Birthday party',
      },
      {
        id: '4',
        guestName: 'Emily Davis',
        partySize: 2,
        time: '8:00 PM',
        tableNumber: 21,
        section: 'Outside',
      },
    ]

    // Link reservations to tables
    tables.forEach((table) => {
      const reservation = reservations.find(
        (r) => r.tableNumber === table.number && r.section === table.section
      )
      if (reservation) {
        table.reservation = reservation
      }
    })

    // Mock data - replace with actual data fetching logic
    const briefingData: BriefingData = {
      date: new Date().toISOString(),
      saladOfTheDay: {
        id: '1',
        name: 'Pear, Walnuts, Gorgonzola, Arugula',
        description: 'Fresh pear, walnuts, gorgonzola cheese, arugula, drizzled with honey and pesto dressing',
        price: 'R135 / R250',
        ingredients: ['Pear', 'Walnuts', 'Gorgonzola', 'Arugula', 'Honey', 'Pesto Dressing'],
      },
      dessertOfTheDay: {
        id: '1',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa powder',
        price: 'R120',
      },
      missingMenuItems: [
        {
          id: '1',
          name: 'Oysters',
          category: 'To Share',
          reason: 'Supplier delay - expected tomorrow',
        },
        {
          id: '2',
          name: 'Heirloom tomato, burrata salad',
          category: 'Insalate',
          reason: 'Out of heirloom tomatoes',
        },
        {
          id: '3',
          name: 'Vongole',
          category: 'Pasta',
          reason: 'Out of fresh clams',
        },
        {
          id: '4',
          name: 'Decadent Chocolate mousse',
          category: 'Dessert',
          reason: 'Kitchen preparation time',
        },
      ],
      waiterAllocation: {
        mda: [
          {
            id: 'waiter-sanele',
            name: 'Sanele',
            tables: [1, 2, 3, 4],
            section: 'MDA',
          },
          {
            id: 'waiter-george',
            name: 'George',
            tables: [5, 6, 7, 8],
            section: 'MDA',
          },
          {
            id: 'waiter-carlos',
            name: 'Carlos',
            tables: [9, 10, 11, 12],
            section: 'MDA',
          },
        ],
        outside: [
          {
            id: 'waiter-leon',
            name: 'Leon',
            tables: [21, 22, 23],
            section: 'Outside',
          },
          {
            id: 'waiter-kiara',
            name: 'Kiara',
            tables: [24, 25],
            section: 'Outside',
          },
        ],
        library: [
          {
            id: 'waiter-sibs',
            name: 'Sibs',
            tables: [61, 62, 63, 64, 65, 66],
            section: 'Library',
          },
        ],
      },
      tables,
      reservations,
      serviceReminders: [
        {
          id: '1',
          title: 'New Spring Menu Items',
          description: 'All staff must review new spring menu items before service starts',
          priority: 'high',
        },
        {
          id: '2',
          title: 'Table 61 Cleaning',
          description: 'Table 61 is being cleaned - avoid seating until 6:30 PM',
          priority: 'medium',
        },
        {
          id: '3',
          title: 'Special Dietary Requests',
          description: 'Reminder to check for vegetarian and gluten-free options when taking orders',
          priority: 'low',
        },
      ],
      // Calculate section capacity from tables
      sectionCapacity: [
        {
          section: 'MDA',
          totalTables: 12,
          availableTables: tables.filter(
            (t) => t.section === 'MDA' && t.status === 'available'
          ).length,
          reservedTables: tables.filter(
            (t) => t.section === 'MDA' && t.status === 'reserved'
          ).length,
          occupiedTables: tables.filter(
            (t) => t.section === 'MDA' && t.status === 'occupied'
          ).length,
          capacityPercentage: Math.round(
            ((tables.filter(
              (t) => t.section === 'MDA' && (t.status === 'reserved' || t.status === 'occupied')
            ).length /
              12) *
              100)
          ),
        },
        {
          section: 'Outside',
          totalTables: 5,
          availableTables: tables.filter(
            (t) => t.section === 'Outside' && t.status === 'available'
          ).length,
          reservedTables: tables.filter(
            (t) => t.section === 'Outside' && t.status === 'reserved'
          ).length,
          occupiedTables: tables.filter(
            (t) => t.section === 'Outside' && t.status === 'occupied'
          ).length,
          capacityPercentage: Math.round(
            ((tables.filter(
              (t) =>
                t.section === 'Outside' &&
                (t.status === 'reserved' || t.status === 'occupied')
            ).length /
              5) *
              100)
          ),
        },
        {
          section: 'Library',
          totalTables: 6,
          availableTables: tables.filter(
            (t) => t.section === 'Library' && t.status === 'available'
          ).length,
          reservedTables: tables.filter(
            (t) => t.section === 'Library' && t.status === 'reserved'
          ).length,
          occupiedTables: tables.filter(
            (t) => t.section === 'Library' && t.status === 'occupied'
          ).length,
          capacityPercentage: Math.round(
            ((tables.filter(
              (t) =>
                t.section === 'Library' &&
                (t.status === 'reserved' || t.status === 'occupied')
            ).length /
              6) *
              100)
          ),
        },
      ],
      peakHours: [
        {
          start: '18:00',
          end: '19:30',
          intensity: 'high',
          expectedCoverCount: 45,
        },
        {
          start: '19:30',
          end: '21:00',
          intensity: 'critical',
          expectedCoverCount: 65,
        },
        {
          start: '21:00',
          end: '22:30',
          intensity: 'high',
          expectedCoverCount: 50,
        },
      ],
      serviceTimingGuidelines: [
        {
          id: '1',
          stage: 'Greet & Seating',
          targetTime: '2 min',
          description: 'Welcome guests and seat them promptly',
          tips: [
            'Have menus ready at host stand',
            'Confirm table readiness before seating',
            'Brief guests on any specials immediately',
          ],
        },
        {
          id: '2',
          stage: 'Order Taking',
          targetTime: '5-7 min',
          description: 'Take orders efficiently after guests are seated',
          tips: [
            'Approach table within 2 minutes of seating',
            'Know menu items and ingredients',
            'Suggest wine pairings to speed up decisions',
            'Enter orders immediately into system',
          ],
        },
        {
          id: '3',
          stage: 'Food Delivery',
          targetTime: '15-20 min',
          description: 'Deliver appetizers and mains in timely manner',
          tips: [
            'Run food as soon as it hits the window',
            'Coordinate with kitchen on timing',
            'Check table before delivering (drinks, cutlery ready)',
          ],
        },
        {
          id: '4',
          stage: 'Dessert & Check',
          targetTime: '5 min',
          description: 'Present dessert menu and process payment quickly',
          tips: [
            'Pre-print checks during dessert course',
            'Offer dessert menu proactively',
            'Process payment immediately when requested',
          ],
        },
        {
          id: '5',
          stage: 'Table Turn',
          targetTime: '90 min total',
          description: 'Complete service from seating to next guest',
          tips: [
            'Clear tables immediately after guests leave',
            'Reset tables within 5 minutes',
            'Communicate table availability to host',
            'Coordinate with kitchen on timing for next reservation',
          ],
        },
      ],
      preRushChecklist: [
        {
          id: '1',
          item: 'All tables set with clean linens, cutlery, and glassware',
          category: 'setup',
          completed: false,
        },
        {
          id: '2',
          item: 'Menus are clean and presentable',
          category: 'setup',
          completed: false,
        },
        {
          id: '3',
          item: 'Host stand has reservation list and floor plan',
          category: 'setup',
          completed: false,
        },
        {
          id: '4',
          item: 'Waiter stations stocked with napkins, pens, and order pads',
          category: 'equipment',
          completed: false,
        },
        {
          id: '5',
          item: 'POS systems tested and working',
          category: 'equipment',
          completed: false,
        },
        {
          id: '6',
          item: 'Kitchen briefed on expected covers and timing',
          category: 'communication',
          completed: false,
        },
        {
          id: '7',
          item: 'Bar stocked and ready for service',
          category: 'preparation',
          completed: false,
        },
        {
          id: '8',
          item: 'Daily specials and missing items communicated to all staff',
          category: 'communication',
          completed: false,
        },
        {
          id: '9',
          item: 'Waiter assignments confirmed and understood',
          category: 'communication',
          completed: false,
        },
        {
          id: '10',
          item: 'Bathrooms checked and stocked',
          category: 'setup',
          completed: false,
        },
      ],
      tableTurnOptimization: {
        averageTurnTime: '105 min',
        targetTurnTime: '90 min',
        tips: [
          'Pre-bus tables during dessert course to speed up reset',
          'Have next reservation table ready 5 minutes before arrival',
          'Coordinate with kitchen on timing - don\'t rush orders but maintain flow',
          'Use downtime to reset tables proactively',
          'Communicate table status clearly between host and floor staff',
          'Offer dessert menu while guests are finishing mains',
          'Process payment as soon as requested - don\'t wait for dessert',
        ],
        bottlenecks: [
          'Table reset time averaging 8 minutes (target: 5 min)',
          'Order entry delays during peak hours',
          'Dessert presentation taking longer than expected',
        ],
      },
    }

    return NextResponse.json(briefingData)
  } catch (error) {
    console.error('Error fetching briefing data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch briefing data' },
      { status: 500 }
    )
  }
}

