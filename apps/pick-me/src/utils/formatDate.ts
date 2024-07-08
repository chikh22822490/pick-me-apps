export default function formatDate(date: Date | undefined): string {
  if (!date) {
    return ''
  }
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: "2-digit",
    minute: "2-digit",
  }

  const formatedDateTimeString = new Date(date).toLocaleTimeString('fr-FR', dateFormatOptions)
  return formatedDateTimeString
}
