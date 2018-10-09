const formatTime = (time) => {
  if (time === '00:00'){
    time = 'midnight'
  } else if (Number(time.slice(0, 2)) < 12){
      if (Number(time.slice(0, 2)) < 10){
        time = time.slice(1) + 'am'
      } else {
      time = time + 'am'
      }
  } else {
    if (Number(time.slice(0, 2)) === 12){
      time = time + 'pm'
    } else {
   let hour = Number(time.slice(0, 2)) - 12
    time = hour + time.slice(2) + 'pm'
    }
  }
  return time
}

export default formatTime
