import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Bell,
  Check,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Moon,
  Package,
  PanelLeftClose,
  Plus,
  Search,
  SearchX,
  Settings,
  ShieldOff,
  Sun,
  User,
  Warehouse,
} from 'lucide-react'
import { Brand } from '#/components/brand/Logo'
import { OverviewDashboard } from '#/components/admin/overview-dashboard'
import { ProfilePanel } from '#/components/admin/profile-panel'
import {
  RecordFormSheet,
  type RecordFormData,
} from '#/components/admin/record-form-sheet'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Input } from '#/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { APP_NAME, APP_TAGLINE } from '#/lib/app'
import {
  DEMO_DATE_LABEL,
  demoOperator,
  records as seedRecords,
  type DemoRecord,
} from '#/lib/demo'
import { FlagIcon, LOCALES, getLocale } from '#/lib/locale'
import {
  setLocalePref,
  toggleShellTheme,
  useLocalePref,
  useShellTheme,
} from '#/lib/shell-prefs'
import { ShowToast } from '#/lib/toast'

const views = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Records', icon: Package },
  { name: 'Inventory', icon: Warehouse },
] as const

type AdminView = (typeof views)[number]['name'] | 'Settings'

/**
 * Admin workspace — light shell by default; charcoal dark toggle.
 * Charts (Recharts), profile menu, and create Sheet (demo data).
 * Theme/locale via useSyncExternalStore (SSR-safe).
 */
export function AdminPage() {
  const [view, setView] = useState<AdminView>('Dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const shellTheme = useShellTheme()
  const locale = useLocalePref()
  const [globalSearch, setGlobalSearch] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [detail, setDetail] = useState<DemoRecord | null>(null)
  const [saved, setSaved] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [recordSheetOpen, setRecordSheetOpen] = useState(false)
  const [rows, setRows] = useState<DemoRecord[]>(seedRecords)

  const currentLocale = getLocale(locale)

  const filtered = rows.filter(
    (s) =>
      (status === 'All statuses' || s.status === status) &&
      `${s.id} ${s.name} ${s.from} ${s.to}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  )

  const handleCreateRecord = (data: RecordFormData) => {
    const id = `REC-${24019 + rows.length}`
    const next: DemoRecord = {
      id,
      name: data.name,
      from: data.from,
      to: data.to,
      category: data.category || 'General',
      status: data.status,
      due: 'TBD',
      size: '—',
    }
    setRows((prev) => [next, ...prev])
    setView('Records')
    ShowToast.success('Record created', { description: id })
  }

  return (
    <main className="admin-shell" data-theme={shellTheme}>
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          <Brand to="/app" size="sm" />
          <Brand to="/app" size="sm" variant="icon" />
          <Button
            variant="ghost"
            size="icon"
            className="admin-shell-icon"
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PanelLeftClose />
          </Button>
        </div>

        <p className="sidebar-label">Main</p>
        <nav className="admin-nav" aria-label="Workspace navigation">
          {views.map((v) => (
            <Button
              key={v.name}
              variant="ghost"
              title={v.name}
              className={view === v.name ? 'selected' : ''}
              onClick={() => {
                setView(v.name)
                setSearch('')
                setStatus('All statuses')
                setDetail(null)
              }}
            >
              <v.icon />
              <span className="nav-text">{v.name}</span>
            </Button>
          ))}
        </nav>

        <div className="sidebar-bottom admin-nav">
          <Button
            variant="ghost"
            title="Settings"
            className={view === 'Settings' ? 'selected' : ''}
            onClick={() => {
              setView('Settings')
              setSearch('')
              setStatus('All statuses')
              setDetail(null)
            }}
          >
            <Settings />
            <span className="nav-text">Settings</span>
          </Button>
          <Button asChild variant="ghost" title="Not found (404)">
            <a href="/this-page-does-not-exist">
              <SearchX />
              <span className="nav-text">Not found</span>
            </a>
          </Button>
          <Button asChild variant="ghost" title="Forbidden (403)">
            <Link to="/forbidden">
              <ShieldOff />
              <span className="nav-text">Forbidden</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" title="Sign out">
            <Link to="/login">
              <LogOut />
              <span className="nav-text">Logout</span>
            </Link>
          </Button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-search">
            <Search aria-hidden />
            <input
              type="search"
              aria-label={`Search ${APP_NAME}`}
              placeholder={`Search ${APP_NAME}...`}
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="admin-topbar-actions">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="admin-shell-icon admin-topbar-lang"
                  title={`Language: ${currentLocale.label}`}
                  aria-label={`Language: ${currentLocale.label}`}
                >
                  <FlagIcon country={currentLocale.flagCountry} title={currentLocale.flagCountry} />
                  <span className="admin-topbar-lang-label">{currentLocale.badge}</span>
                  <ChevronDown size={14} aria-hidden className="opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-[11px] font-normal text-muted-foreground">
                  Language
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {LOCALES.map((opt) => (
                  <DropdownMenuItem
                    key={opt.code}
                    className="gap-2 text-[12px]"
                    onClick={() => setLocalePref(opt.code)}
                  >
                    <FlagIcon country={opt.flagCountry} title={opt.flagCountry} />
                    <span className="flex-1">{opt.label}</span>
                    <span className="text-muted-foreground tabular-nums">{opt.badge}</span>
                    {locale === opt.code ? (
                      <Check size={14} className="text-primary" aria-hidden />
                    ) : (
                      <span className="inline-block size-3.5" aria-hidden />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="admin-shell-icon"
              aria-label={
                shellTheme === 'light' ? 'Switch to dark shell' : 'Switch to light shell'
              }
              title={shellTheme === 'light' ? 'Dark shell' : 'Light shell'}
              onClick={toggleShellTheme}
            >
              {shellTheme === 'light' ? <Moon /> : <Sun />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="admin-shell-icon"
              aria-label="Notifications"
              onClick={() =>
                ShowToast.info('No new notifications', {
                  description: 'Wire this to your API later.',
                })
              }
            >
              <Bell />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="avatar ml-2 cursor-pointer border-0"
                  aria-label="Account menu"
                >
                  {demoOperator.initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-[11px] font-normal">
                  <div className="text-[12px] font-semibold text-foreground">
                    {demoOperator.name}
                  </div>
                  <div className="text-muted-foreground">{demoOperator.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 text-[12px]"
                  onClick={() => setProfileOpen(true)}
                >
                  <User size={14} /> My profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 text-[12px]"
                  onClick={() => setView('Settings')}
                >
                  <Settings size={14} /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild variant="destructive" className="text-[12px]">
                  <Link to="/login" className="flex items-center gap-2">
                    <LogOut size={14} /> Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="admin-workspace">
          <div className="admin-content">
            {view !== 'Dashboard' ? (
              <div className="admin-title-row">
                <div>
                  <h2>{view}</h2>
                  <p>{APP_TAGLINE}</p>
                </div>
                {view === 'Records' ? (
                  <Button
                    size="sm"
                    className="bg-foreground text-background hover:bg-foreground/90"
                    onClick={() => setRecordSheetOpen(true)}
                  >
                    <Plus className="size-3.5" />
                    New record
                  </Button>
                ) : (
                  <span className="preview-label">{DEMO_DATE_LABEL}</span>
                )}
              </div>
            ) : null}

            {view === 'Dashboard' ? (
              <OverviewDashboard
                onNewRecord={() => setRecordSheetOpen(true)}
                onViewRecords={() => setView('Records')}
                onViewInventory={() => setView('Inventory')}
              />
            ) : view === 'Records' ? (
              <section className="admin-panel">
                <div className="table-tools">
                  <div className="relative w-full max-w-xs">
                    <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                    <Input
                      aria-label="Search records"
                      className="pl-9"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search id, name or route"
                      maxLength={100}
                    />
                  </div>
                  <select
                    aria-label="Record status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {['All statuses', 'In progress', 'Review', 'Completed'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <RecordTable rows={filtered} onSelect={setDetail} />
                {!filtered.length ? (
                  <p className="empty-state">No records match your search.</p>
                ) : null}
              </section>
            ) : view === 'Inventory' ? (
              <InventoryView onSelect={setDetail} />
            ) : view === 'Settings' ? (
              <section className="admin-panel">
                <h3 className="mb-6 font-semibold">Workspace preferences</h3>
                <form
                  className="settings-form max-w-md"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSaved(true)
                    ShowToast.success('Settings saved')
                  }}
                >
                  <label className="form-field">
                    <span>Workspace name</span>
                    <Input defaultValue={`${APP_NAME} workspace`} required maxLength={100} />
                  </label>
                  <label className="form-field">
                    <span>Display name</span>
                    <Input defaultValue={demoOperator.name} required maxLength={100} />
                  </label>
                  <Button type="submit" variant="marine">
                    Save changes
                  </Button>
                  {saved ? (
                    <p role="status" className="mt-4 text-xs text-teal">
                      Changes saved.
                    </p>
                  ) : null}
                </form>
              </section>
            ) : null}

            {detail ? (
              <section className="admin-panel mt-5">
                <div className="panel-heading">
                  <h3>Record {detail.id}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setDetail(null)}>
                    Close
                  </Button>
                </div>
                <dl className="detail-grid grid grid-cols-2 gap-5 text-sm">
                  {Object.entries({
                    Name: detail.name,
                    Status: detail.status,
                    From: detail.from,
                    To: detail.to,
                    Category: detail.category,
                    Due: detail.due,
                    Size: detail.size,
                  }).map(([k, v]) => (
                    <div key={k}>
                      <dt className="mb-1 text-xs text-muted-foreground">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <ProfilePanel open={profileOpen} onOpenChange={setProfileOpen} />
      <RecordFormSheet
        open={recordSheetOpen}
        onOpenChange={setRecordSheetOpen}
        onSave={handleCreateRecord}
      />
    </main>
  )
}

function RecordTable({
  rows,
  onSelect,
}: {
  rows: DemoRecord[]
  onSelect: (s: DemoRecord) => void
}) {
  return (
    <div className="table-scroll">
      <Table className="shipment-table">
        <TableHeader>
          <TableRow>
            <TableHead>Record</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((s) => (
            <TableRow key={s.id}>
              <TableCell>
                <Button
                  variant="link"
                  className="h-auto p-0 text-[11px]"
                  onClick={() => onSelect(s)}
                >
                  {s.id}
                </Button>
              </TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>
                {s.from} → {s.to}
              </TableCell>
              <TableCell>
                <span className={`status ${s.status.toLowerCase().replace(' ', '-')}`}>
                  {s.status}
                </span>
              </TableCell>
              <TableCell>{s.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function InventoryView({ onSelect }: { onSelect: (s: DemoRecord) => void }) {
  const rows = [
    ['WH-001', 'Primary stock', 'Site A', '246 packages'],
    ['WH-002', 'Inbound handling', 'Site B', '84 packages'],
    ['WH-003', 'Final distribution', 'Site C', '62 packages'],
  ] as const

  return (
    <section className="admin-panel">
      <div className="panel-heading">
        <h3>Inventory locations</h3>
        <span className="preview-label">Locations</span>
      </div>
      <div className="table-scroll">
        <Table className="shipment-table">
          <TableHeader>
            <TableRow>
              {['Location', 'Operation', 'Site', 'Stock'].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row[0]}>
                {row.map((cell, j) => (
                  <TableCell key={j}>
                    {j === 0 ? (
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs"
                        onClick={() => onSelect(seedRecords[i] ?? seedRecords[0])}
                      >
                        {cell}
                      </Button>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
