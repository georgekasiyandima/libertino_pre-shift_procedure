export interface SaladOfTheDay {
  id: string
  name: string
  description: string
  price?: string
  ingredients?: string[]
}

export interface DessertOfTheDay {
  id: string
  name: string
  description: string
  price?: string
}

export interface MissingMenuItem {
  id: string
  name: string
  category: string
  reason?: string
}

export interface Table {
  id: string
  number: number
  section: 'MDA' | 'Outside' | 'Library'
  status: 'available' | 'reserved' | 'occupied' | 'cleaning'
  reservation?: Reservation
  waiterId?: string
  waiterName?: string
}

export interface Reservation {
  id: string
  guestName: string
  partySize: number
  time: string
  tableNumber: number
  section: 'MDA' | 'Outside' | 'Library'
  notes?: string
  specialRequests?: string
}

export interface Waiter {
  id: string
  name: string
  tables: number[]
  section: 'MDA' | 'Outside' | 'Library'
}

export interface WaiterAllocation {
  mda: Waiter[]
  outside: Waiter[]
  library: Waiter[]
}

export interface ServiceReminder {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

export interface PeakHour {
  start: string
  end: string
  intensity: 'low' | 'medium' | 'high' | 'critical'
  expectedCoverCount: number
}

export interface SectionCapacity {
  section: 'MDA' | 'Outside' | 'Library'
  totalTables: number
  availableTables: number
  reservedTables: number
  occupiedTables: number
  capacityPercentage: number
}

export interface ServiceTimingGuideline {
  id: string
  stage: string
  targetTime: string
  description: string
  tips?: string[]
}

export interface PreRushChecklist {
  id: string
  item: string
  category: 'setup' | 'communication' | 'preparation' | 'equipment'
  completed: boolean
}

export interface TableTurnOptimization {
  averageTurnTime: string
  targetTurnTime: string
  tips: string[]
  bottlenecks: string[]
}

export interface SOSMessage {
  id: string
  type: 'location' | 'request' | 'alert' | 'bottleneck'
  title: string
  message: string
  location?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdBy: string
  createdAt: string
  resolved: boolean
  resolvedAt?: string
}

export interface FloorMessage {
  id: string
  type: 'update' | 'warning' | 'info' | 'bottleneck'
  message: string
  section?: 'MDA' | 'Outside' | 'Library' | 'All'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  expiresAt?: string
}

export interface ItemLocation {
  id: string
  item: string
  location: string
  section?: 'MDA' | 'Outside' | 'Library' | 'Kitchen' | 'Storage'
  quantity?: string
  notes?: string
}

export interface SeatingArrangement {
  tableNumber: number
  section: 'MDA' | 'Outside' | 'Library'
  reservation?: Reservation
  partySize: number
  status: 'available' | 'reserved' | 'occupied'
  x?: number
  y?: number
}

export interface Menu {
  id: string
  name: string
  type: 'brunch' | 'dinner' | 'lunch' | 'special'
  imageUrl: string
  pdfUrl?: string
  uploadedAt: string
  uploadedBy: string
  isActive: boolean
}

export interface BriefingData {
  date: string
  saladOfTheDay: SaladOfTheDay | null
  dessertOfTheDay: DessertOfTheDay | null
  missingMenuItems: MissingMenuItem[]
  waiterAllocation: WaiterAllocation
  tables: Table[]
  reservations: Reservation[]
  serviceReminders?: ServiceReminder[]
  peakHours?: PeakHour[]
  sectionCapacity?: SectionCapacity[]
  serviceTimingGuidelines?: ServiceTimingGuideline[]
  preRushChecklist?: PreRushChecklist[]
  tableTurnOptimization?: TableTurnOptimization
  sosMessages?: SOSMessage[]
  floorMessages?: FloorMessage[]
  itemLocations?: ItemLocation[]
  seatingArrangement?: SeatingArrangement[]
  currentMenu?: Menu
}

