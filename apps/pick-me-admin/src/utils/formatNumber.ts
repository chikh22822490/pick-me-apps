export default function formatNumber(number?: number): string {
  if (!number || Number(number.toFixed(3)) === 0) return '0'
  else if (Number(number.toFixed(3)) % 1 === 0) {
    return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  } else {
    return number
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .replace(/\./g, ',')
  }
}
