import {
  CalendarDays,
  CheckCircle2,
  FileText,
  Package,
  Plus,
  Truck,
} from 'lucide-react'
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '#/components/ui/button'
import {
  DEMO_DATE_LABEL,
  inventoryProgress,
  recordStatusPie,
  recordTrend,
  records,
} from '#/lib/demo'

type OverviewDashboardProps = {
  onNewRecord: () => void
  onViewRecords: () => void
  onViewInventory: () => void
}

const PIE_COLORS = [
  'var(--foreground)',
  'var(--teal)',
  'var(--destructive)',
]

/**
 * Hub-style dashboard (Recharts) with generic KPIs — demo data only.
 */
export function OverviewDashboard({
  onNewRecord,
  onViewRecords,
  onViewInventory,
}: OverviewDashboardProps) {
  const inProgress = records.filter((s) => s.status === 'In progress').length
  const review = records.filter((s) => s.status === 'Review').length
  const completed = records.filter((s) => s.status === 'Completed').length

  const kpis = [
    {
      label: 'Active records',
      value: String(records.length),
      sub: `${inProgress} in progress`,
      icon: Package,
      onClick: onViewRecords,
    },
    {
      label: 'In progress',
      value: String(inProgress),
      sub: 'Across sample workstreams',
      icon: Truck,
      onClick: onViewRecords,
    },
    {
      label: 'Awaiting review',
      value: String(review),
      sub: 'Items to review',
      icon: FileText,
      onClick: onViewRecords,
    },
    {
      label: 'Completed (sample)',
      value: String(completed),
      sub: 'Closed this cycle',
      icon: CheckCircle2,
      onClick: onViewRecords,
    },
  ]

  const insights = [
    `${review} record${review === 1 ? '' : 's'} awaiting review`,
    `Sprint of ${inProgress} items currently in progress`,
    'Inventory Site B inbound queue is elevated',
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-foreground">Dashboard</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            {DEMO_DATE_LABEL} — here&apos;s what&apos;s happening across your workspace.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 text-[11px]"
            onClick={onViewInventory}
          >
            <CalendarDays className="size-3" />
            Inventory
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 text-[11px]"
            onClick={onViewRecords}
          >
            <Plus className="size-3" />
            View records
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-8 bg-foreground text-[11px] text-background hover:bg-foreground/90"
            onClick={onNewRecord}
          >
            <Plus className="size-3" />
            New record
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <button
            key={k.label}
            type="button"
            onClick={k.onClick}
            className="rounded-xl border border-border bg-card p-4 text-left shadow-[var(--shadow-soft)] transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="font-medium tracking-wide uppercase">{k.label}</span>
              <k.icon className="size-4 text-primary" />
            </div>
            <strong className="mt-3 block font-display text-[28px] font-semibold leading-none">
              {k.value}
            </strong>
            <small className="mt-2 block text-[10px] text-teal">{k.sub}</small>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-border bg-muted/60 px-4 py-2.5 text-[11px] text-muted-foreground">
        <span className="font-semibold tracking-wide text-foreground uppercase">
          Your insights
        </span>
        {insights.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[13px] font-semibold">Created vs completed</h3>
              <p className="text-[11px] text-muted-foreground">
                Last 7 months · sample volume
              </p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={recordTrend}
                margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="m"
                  tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="created"
                  name="Created"
                  stroke="var(--foreground)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke="var(--teal)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <h3 className="text-[13px] font-semibold">Record status</h3>
              <p className="text-[11px] text-muted-foreground">Sample mix</p>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground">
              {recordStatusPie.reduce((s, d) => s + d.value, 0)} TOTAL
            </span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recordStatusPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={42}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {recordStatusPie.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[13px] font-semibold">Inventory progress</h3>
          <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
            % complete
          </span>
        </div>
        <div className="space-y-3">
          {inventoryProgress.map((w) => (
            <div key={w.name}>
              <div className="mb-1 flex justify-between text-[11px]">
                <span>{w.name}</span>
                <span className="text-muted-foreground">{w.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${w.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
