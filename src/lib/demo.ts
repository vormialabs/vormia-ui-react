/** Demo records for Admin UI — replace with API data later. */
export const records = [
  {
    id: 'REC-24018',
    name: 'Eastline Trading',
    from: 'Shanghai',
    to: 'Mombasa',
    category: 'Consumer goods',
    status: 'In progress',
    due: '28 Oct 2026',
    size: '4,250 units',
  },
  {
    id: 'REC-24017',
    name: 'Apex Industries',
    from: 'Dubai',
    to: 'Nairobi',
    category: 'Industrial parts',
    status: 'Review',
    due: '19 Oct 2026',
    size: '1,800 units',
  },
  {
    id: 'REC-24016',
    name: 'Kijani Retail',
    from: 'Guangzhou',
    to: 'Mombasa',
    category: 'Retail stock',
    status: 'In progress',
    due: '24 Oct 2026',
    size: '6,420 units',
  },
  {
    id: 'REC-24015',
    name: 'Medlink Supplies',
    from: 'Mumbai',
    to: 'Nairobi',
    category: 'Healthcare supplies',
    status: 'Completed',
    due: '14 Oct 2026',
    size: '850 units',
  },
  {
    id: 'REC-24014',
    name: 'Coastal Motors',
    from: 'Singapore',
    to: 'Mombasa',
    category: 'Automotive parts',
    status: 'Completed',
    due: '13 Oct 2026',
    size: '2,600 units',
  },
  {
    id: 'REC-24013',
    name: 'Savanna Exports',
    from: 'Shenzhen',
    to: 'Dar es Salaam',
    category: 'Equipment',
    status: 'In progress',
    due: '30 Oct 2026',
    size: '3,120 units',
  },
]

export type DemoRecord = (typeof records)[number]

/** Monthly volume for Recharts line (created vs completed) */
export const recordTrend = [
  { m: 'Apr', created: 72, completed: 58 },
  { m: 'May', created: 81, completed: 64 },
  { m: 'Jun', created: 90, completed: 78 },
  { m: 'Jul', created: 95, completed: 82 },
  { m: 'Aug', created: 105, completed: 88 },
  { m: 'Sep', created: 118, completed: 96 },
  { m: 'Oct', created: 128, completed: 110 },
]

export const recordStatusPie = [
  { name: 'In progress', value: 64 },
  { name: 'Completed', value: 24 },
  { name: 'Review', value: 12 },
]

export const inventoryProgress = [
  { name: 'Site A', progress: 86 },
  { name: 'Site B', progress: 62 },
  { name: 'Site C', progress: 48 },
  { name: 'Site D', progress: 71 },
]

export const demoOperator = {
  initials: 'JL',
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  role: 'Admin',
}

/** Fixed demo date string — avoids SSR/client locale mismatch */
export const DEMO_DATE_LABEL = 'Thursday, 15 October 2026'
