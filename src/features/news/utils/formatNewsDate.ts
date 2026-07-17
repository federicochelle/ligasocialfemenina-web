const formatters = {
  short: new Intl.DateTimeFormat('es-UY', {
    day: '2-digit',
    month: 'short',
  }),
  shortYear: new Intl.DateTimeFormat('es-UY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }),
  long: new Intl.DateTimeFormat('es-UY', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }),
} as const

export type NewsDateFormat = keyof typeof formatters

export function formatNewsDate(
  value: string,
  format: NewsDateFormat = 'shortYear',
) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return formatters[format].format(date)
}
