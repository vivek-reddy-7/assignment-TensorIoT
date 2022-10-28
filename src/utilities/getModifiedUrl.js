
export default function getModifiedUrl (url,period, value) {
  const date = new Date()
  if (period === 'months') {
  date.setMonth(date.getMonth()-value)
  } else {
  date.setFullYear(date.getFullYear()-value)

  }
  const start = date.toISOString().split('T')[0]
  const end = new Date().toISOString().split('T')[0]
 return url + `?start=${start}&end=${end}`

}