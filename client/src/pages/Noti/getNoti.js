export function getNum(value) {
  var num = value.toString().substring(1)
  var num1 = num.split(":")
  return num1
}

export function getNoti(data) {
  var noti = { T: [], H: [], L: [], M: [] }
  var i = 0
  var j = 0
  while (i < 4 && j < data.length) {
    if (data[j].value[0] == "T" && noti.T.length==0) {
      noti.T = getNum(data[j].value)
      i++
    } else if (data[j].value[0] == "H" && noti.H.length==0) {
      noti.H = getNum(data[j].value)
      i++
    } else if (data[j].value[0] == "L" && noti.L.length==0) {
      noti.L = getNum(data[j].value)
      i++
    } else if (data[j].value[0] == "M" && noti.M.length==0) {
      noti.M = getNum(data[j].value)
      i++
    }
    j++
  }
  return noti
}

