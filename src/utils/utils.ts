import { DATE_FORMATTER } from '~/config.mjs'

const formatter
  = DATE_FORMATTER
    || new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })

export const getFormattedDate = (date: Date) => (date ? formatter.format(date) : '')

export function trim(str = '', ch?: string) {
  let start = 0
  let end = str.length || 0
  while (start < end && str[start] === ch) {
    ++start
  }
  while (end > start && str[end - 1] === ch) {
    --end
  }
  return (start > 0 || end < str.length) ? str.substring(start, end) : str
}
