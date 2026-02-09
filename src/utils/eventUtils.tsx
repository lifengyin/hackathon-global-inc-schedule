import { IconTools, IconPuzzle, IconSpeakerphone } from '@tabler/icons-react'

const dates: Record<string, string> = {
  '12/1/2021': 'Fri',
  '1/12/2021': 'Sat',
  '1/13/2021': 'Sun',
}

export const formatDateAndTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const convertedWeekday = dates[date.toLocaleDateString()]
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return {
    formatted: `${convertedWeekday} ${time}`,
    day: convertedWeekday,
    time: time,
  }
}

export const EVENT_TYPES = {
  'workshop': {
    'name': 'Workshop',
    'color': '#008c1280',
    'icon': <IconTools size={20} stroke={1.5} />,
  },
  'activity': {
    'name': 'Activity',
    'color': '#8044b980',
    'icon': <IconPuzzle size={20} stroke={1.5} />,
  },
  'tech_talk': {
    'name': 'Tech Talk',
    'color': '#0079ff80',
    'icon': <IconSpeakerphone size={20} stroke={1.5} />,
  },
}

const COVER_IMAGES = [
  'https://cover.sli.dev/?1',
  'https://cover.sli.dev/?2',
  'https://cover.sli.dev/?3',
  'https://cover.sli.dev/?4',
  'https://cover.sli.dev/?5',
  'https://cover.sli.dev/?6',
  'https://cover.sli.dev/?7',
  'https://cover.sli.dev/?8',
  'https://cover.sli.dev/?9',
  'https://cover.sli.dev/?10',
  'https://cover.sli.dev/?11',
  'https://cover.sli.dev/?12',
  'https://cover.sli.dev/?13',
  'https://cover.sli.dev/?14',
  'https://cover.sli.dev/?15',
]

export function getCoverImageForEvent(eventId: number): string {
  return COVER_IMAGES[eventId % COVER_IMAGES.length]
}
