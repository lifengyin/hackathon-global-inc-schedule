import styled from 'styled-components'
import { IconChevronDown, IconFilter, IconArrowsSort } from '@tabler/icons-react'
import { Select } from '@base-ui/react/select'

const EVENT_TYPE_OPTIONS = [
  { value: 'all', label: 'All types' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'activity', label: 'Activity' },
  { value: 'tech_talk', label: 'Tech Talk' },
] as const

const SORT_OPTIONS = [
  { value: 'start_time', label: 'Sort by time' },
  { value: 'name', label: 'Sort by name' },
] as const

const FILTER_COLORS: Record<string, string> = {
  workshop: '#008c12',
  activity: '#8044b9',
  tech_talk: '#0079ff',
}

const ToolbarSelects = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const SelectTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 8rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  color: #e4e6eb;
  background: #252830;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  &[data-popup-open] {
    border-color: rgba(255, 255, 255, 0.25);
  }
`

const SelectTriggerIcon = styled.span`
  color: #6b7280;
  display: flex;
  flex-shrink: 0;
`

const SelectIcon = styled(Select.Icon)`
  color: #6b7280;
  display: flex;
`

const FilterSelectTrigger = styled(SelectTrigger)<{ $activeColor?: string }>`
  ${(p) =>
    p.$activeColor
      ? `
    border-color: ${p.$activeColor};
    background: ${p.$activeColor}30;
    & ${SelectTriggerIcon},
    & ${SelectIcon} {
      color: ${p.$activeColor};
    }
    &:hover {
      border-color: ${p.$activeColor};
      background: ${p.$activeColor}40;
    }
    &[data-popup-open] {
      border-color: ${p.$activeColor};
      background: ${p.$activeColor}40;
    }
  `
      : ''}
`

const SelectValue = styled(Select.Value)`
  flex: 1;
  text-align: left;
`

const SelectPopup = styled(Select.Popup)`
  padding: 0.25rem;
  background: #252830;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`

const SelectList = styled(Select.List)`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`

const SelectItem = styled(Select.Item)`
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  color: #e4e6eb;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: rgba(255, 255, 255, 0.08);
  }
`

export type EventsToolbarProps = {
  eventTypeFilter: string
  onEventTypeChange: (value: string) => void
  sortBy: 'start_time' | 'name'
  onSortChange: (value: 'start_time' | 'name') => void
}

export function EventsToolbar({
  eventTypeFilter,
  onEventTypeChange,
  sortBy,
  onSortChange,
}: EventsToolbarProps) {
  return (
    <ToolbarSelects>
      <Select.Root
        items={EVENT_TYPE_OPTIONS}
        value={eventTypeFilter}
        onValueChange={(v) => v != null && onEventTypeChange(v)}
      >
        <FilterSelectTrigger
          $activeColor={eventTypeFilter !== 'all' ? FILTER_COLORS[eventTypeFilter] : undefined}
        >
          <SelectTriggerIcon>
            <IconFilter size={16} stroke={1.5} />
          </SelectTriggerIcon>
          <SelectValue placeholder="Filter by type" />
          <SelectIcon>
            <IconChevronDown size={16} stroke={1.5} />
          </SelectIcon>
        </FilterSelectTrigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4}>
            <SelectPopup>
              <SelectList>
                {EVENT_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <Select.ItemText>{opt.label}</Select.ItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      <Select.Root
        items={SORT_OPTIONS}
        value={sortBy}
        onValueChange={(v) => v != null && onSortChange(v as 'start_time' | 'name')}
      >
        <SelectTrigger>
          <SelectTriggerIcon>
            <IconArrowsSort size={16} stroke={1.5} />
          </SelectTriggerIcon>
          <SelectValue placeholder="Sort by" />
          <SelectIcon>
            <IconChevronDown size={16} stroke={1.5} />
          </SelectIcon>
        </SelectTrigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4}>
            <SelectPopup>
              <SelectList>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <Select.ItemText>{opt.label}</Select.ItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </ToolbarSelects>
  )
}
