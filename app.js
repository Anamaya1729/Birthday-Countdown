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

// 2026-09-14: this was hardcoded to 27 November 2023, so the page had spent
// three years saying the birthday was "expired". The date is fixed; the YEAR is
// not, so it is worked out each load: this year's if it is still ahead of us,
// otherwise next year's. Nothing to maintain and it can never expire again.
const BIRTH_MONTH = 10   // November, zero-indexed the way Date wants it
const BIRTH_DAY = 27

function nextBirthday() {
  const now = new Date()
  let d = new Date(now.getFullYear(), BIRTH_MONTH, BIRTH_DAY, 0, 0, 0)
  // Strictly in the past means we want next year's. On the day itself the
  // countdown is allowed to sit at zero rather than jumping a whole year.
  if (d.getTime() < now.getTime() - 24 * 60 * 60 * 1000) {
    d = new Date(now.getFullYear() + 1, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0)
  }
  return d
}

const target = nextBirthday()
const year = target.getFullYear()
const month = target.getMonth()
const date = target.getDate()
const day = target.getDay()
birthday.innerText = `My birthday is on ${weekdays[day]} ${date} ${months[month]}, ${year}`

const futureTime = target.getTime()

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
  // On the day itself, say so instead of counting down past zero. The next
  // load rolls the target to next year on its own.
  if (diff < 0)
  {
    time.forEach((t) => { t.innerHTML = "00" })
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class="today">It is today. You had a whole year of warning.</h4>`
  }
}

let countdown = setInterval(getRemainingTime,1000)
getRemainingTime()
