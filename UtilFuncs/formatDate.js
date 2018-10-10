const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

const formatDate = date => {
  let numArr = date.split('-')
  return months[numArr[1]] + ' ' + numArr[0] + ' ' + numArr[2]
}

export const getMonthFromDate = date => {
  let numArr = date.split('-')
  return months[numArr[1]].substring(0, 3).toUpperCase()
}

export default formatDate
