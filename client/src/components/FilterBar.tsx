import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ALL_SERVICES_FILTER, UI_TEXT, UI_STYLES } from '@/config/constants'

interface FilterBarProps {
  serviceFilter: string
  onServiceFilterChange: (value: string) => void
  showExpiredOnly: boolean
  onShowExpiredChange: (checked: boolean) => void
  services: string[]
}

export function FilterBar({
  serviceFilter,
  onServiceFilterChange,
  showExpiredOnly,
  onShowExpiredChange,
  services
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Select value={serviceFilter} onValueChange={onServiceFilterChange}>
          <SelectTrigger className={UI_STYLES.SERVICE_SELECT_WIDTH}>
            <SelectValue placeholder={UI_TEXT.FILTER.FILTER_BY_SERVICE} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SERVICES_FILTER}>
              {UI_TEXT.FILTER.ALL_SERVICES}
            </SelectItem>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="expired"
          checked={showExpiredOnly}
          onCheckedChange={onShowExpiredChange}
        />
        <Label
          htmlFor="expired"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {UI_TEXT.FILTER.SHOW_EXPIRED_ONLY}
        </Label>
      </div>
    </div>
  )
}
