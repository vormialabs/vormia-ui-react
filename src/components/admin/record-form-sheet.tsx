import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '#/components/ui/sheet'
import { Field, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'

export type RecordFormData = {
  name: string
  from: string
  to: string
  category: string
  status: string
}

type RecordFormSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: RecordFormData) => void
}

const empty: RecordFormData = {
  name: '',
  from: '',
  to: '',
  category: '',
  status: 'In progress',
}

/**
 * Right-side create/edit sheet — short forms only.
 */
export function RecordFormSheet({
  open,
  onOpenChange,
  onSave,
}: RecordFormSheetProps) {
  const [form, setForm] = useState<RecordFormData>(empty)
  const [error, setError] = useState('')

  const reset = () => {
    setForm(empty)
    setError('')
  }

  const close = () => {
    onOpenChange(false)
    reset()
  }

  const submit = (addAnother: boolean) => {
    if (!form.name.trim() || !form.from.trim() || !form.to.trim()) {
      setError('Name, from, and to are required.')
      return
    }
    onSave(form)
    if (addAnother) {
      reset()
      return
    }
    close()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) reset()
        onOpenChange(v)
      }}
    >
      <SheetContent className="p-0 sm:max-w-lg" showCloseButton>
        <SheetHeader>
          <SheetTitle>New record</SheetTitle>
          <SheetDescription>
            Quick create — replace with your full wizard when needed.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <FieldGroup>
            <Field data-invalid={!!error && !form.name}>
              <FieldLabel htmlFor="rec-name" required>
                Name
              </FieldLabel>
              <Input
                id="rec-name"
                className="h-11"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Company or contact"
                maxLength={100}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="rec-from" required>
                  From
                </FieldLabel>
                <Input
                  id="rec-from"
                  className="h-11"
                  value={form.from}
                  onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                  placeholder="e.g. Location A"
                  maxLength={80}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="rec-to" required>
                  To
                </FieldLabel>
                <Input
                  id="rec-to"
                  className="h-11"
                  value={form.to}
                  onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
                  placeholder="e.g. Location B"
                  maxLength={80}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="rec-category">Category</FieldLabel>
              <Input
                id="rec-category"
                className="h-11"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Description"
                maxLength={120}
              />
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {['In progress', 'Review', 'Completed'].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            {error ? (
              <p className="text-[11px] text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </FieldGroup>
        </div>

        <SheetFooter>
          <Button type="button" variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button type="button" variant="outline" onClick={() => submit(true)}>
            Create and add another
          </Button>
          <Button type="button" variant="default" onClick={() => submit(false)}>
            Create record
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
