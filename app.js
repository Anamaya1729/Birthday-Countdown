const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const birthday = document.querySelector(".birthday")
const deadline = document.querySelector(".deadline")
const time = document.querySelectorAll(".deadline-format h4")

let pastDate = new Date(2021,10,27,00,00,0)
const year = pastDate.getFullYear()
const hour = pastDate.getHours()
const minutes = pastDate.getMinutes()
const month = pastDate.getMonth()
const date = pastDate.getDate()
const day = pastDate.getDay()
birthday.innerText = `My birthday is on ${weekdays[day]} ${date} ${months[month]}, ${year} 0${hour}:0${minutes}am`

// future time in ms
const futureTime = pastDate.getTime()

function getRemainingTime()
{
  const today = new Date().getTime()
  const diff = futureTime - today

  //values in ms
  const oneDay = 24*60*60*1000
  const oneHour = 60*60*1000
  const oneMinute = 60*1000

  // time remaining
  let days = Math.floor(diff/oneDay)
  let hours = Math.floor((diff%oneDay)/oneHour)
  let minutes = Math.floor((diff%oneHour)/oneMinute)
  let seconds  = Math.floor((diff%oneMinute)/1000)
  const values = [days,hours, minutes, seconds]

  time.forEach((time, index)=>
  {
    let format =(item)=>{
      if (item<10){
        return item = `0${item}`
      }
      return item
    }
    time.innerHTML = format(values[index])
  })
  if (diff < 0)
  {
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class= "expired"> sorry this birthday is expired wait for it next year
    </h4>`
  }
}

let countdown = setInterval(getRemainingTime,1000)
getRemainingTime()
