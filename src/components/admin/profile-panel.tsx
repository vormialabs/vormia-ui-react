import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '#/components/ui/sheet'
import { Field, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { demoOperator } from '#/lib/demo'

type ProfilePanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Stub profile sheet — wire to your API later. */
export function ProfilePanel({ open, onOpenChange }: ProfilePanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 sm:max-w-md" showCloseButton>
        <SheetHeader>
          <SheetTitle>My profile</SheetTitle>
          <SheetDescription>Demo operator — not saved to the API yet.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-6 flex items-center gap-3">
            <div className="avatar !m-0 size-12 text-sm">{demoOperator.initials}</div>
            <div>
              <p className="text-[13px] font-semibold">{demoOperator.name}</p>
              <p className="text-[11px] text-muted-foreground">{demoOperator.role}</p>
            </div>
          </div>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="prof-name">Display name</FieldLabel>
              <Input
                id="prof-name"
                className="h-11"
                defaultValue={demoOperator.name}
                readOnly
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="prof-email">Email</FieldLabel>
              <Input
                id="prof-email"
                className="h-11"
                type="email"
                defaultValue={demoOperator.email}
                readOnly
              />
            </Field>
          </FieldGroup>
        </div>
      </SheetContent>
    </Sheet>
  )
}
