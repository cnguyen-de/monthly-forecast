import Calendar from 'react-calendar'
import { ReactNode, useState } from 'react'

const WorkingCalendar = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const daysInMonth = getAllDaysInMonth(currentYear, currentMonth)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const firstDay = daysInMonth[0].getDay()
  const defaultWorkingDay = daysInMonth
    .filter((day) => isWorkingDay(day.getFullYear(), day.getMonth(), day.getDate()))
    .map((day) => {
      return day.getDate()
    })
  const [selectedDays, setDays] = useState(defaultWorkingDay)

  const onClickDay = (e) => {
    const index = selectedDays.findIndex((selectedDay) => selectedDay === Number(e.target.innerText))
    if (index === -1) {
      setDays([...selectedDays, Number(e.target.innerText)])
    } else {
      const newSelectedDays = [...selectedDays]
      newSelectedDays.splice(index, 1)
      setDays(newSelectedDays)
    }
    setEmailBody(`Mein Forecast für ${currentMonth + 1}.${currentYear} ist ${dailyRate * selectedDays.length}€`)
  }

  const [dailyRate, setDailyRate] = useState(940)
  const onDailyRateChange = (e) => {
    setDailyRate(e.target.value)
    setEmailBody(`Mein Forecast für ${currentMonth + 1}.${currentYear} ist ${e.target.value * selectedDays.length}€`)
  }

  const [email, setEmail] = useState('')
  const [emailBody, setEmailBody] = useState(
    `Mein Forecast für ${currentMonth + 1}.${currentYear} ist ${dailyRate * selectedDays.length}€`
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full">
        <label htmlFor="dailyRate">Daily Rate</label>
        <input
          type="number"
          id="dailyRate"
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0;"
          value={dailyRate}
          min="1"
          step="any"
          onChange={onDailyRateChange}></input>
      </div>

      <h3 className="font-bold text-xl text-right">
        {currentMonth + 1}.{currentYear}
      </h3>
      <div className="grid grid-cols-7 grid-flow-row w-full gap-2">
        {weekDays.map((weekday, i) => (
          <span className="uppercase text-sm font-medium" key={i}>
            {weekday}
          </span>
        ))}
        {Array.from({ length: firstDay - 1 }).map((_, i) => (
          <span key={i}> </span>
        ))}
        {daysInMonth.map((dayInMonth, i) => (
          <span
            className={`p-2 cursor-pointer hover:bg-blue-100 text-gray-900 hover:text-black rounded text-center ${
              selectedDays.includes(dayInMonth.getDate()) ? 'bg-blue-200' : ''
            }`}
            key={i}
            onClick={onClickDay}>
            {dayInMonth.getDate()}
          </span>
        ))}
      </div>
      {/* <div className="mt-8 uppercase font-bold">Forecast: {dailyRate * selectedDays.length}€</div> */}
      <div className="w-full">
        <label className="relative inset-0 m-0 p-0" htmlFor="email">
          Email
        </label>
        <input
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0;"
          type="email"
          id="email"
          value={email}
          placeholder="someone@email.com"
          onChange={(e) => setEmail(e.target.value)}></input>
      </div>

      <textarea
        className="block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0;"
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}></textarea>
      <a
        className="px-4 py-2 rounded bg-blue-600 text-white"
        href={`mailto:${email}?subject=Forecast ${currentMonth + 1}.${currentYear}&body=${encodeURI(emailBody)}`}>
        Create Email
      </a>
    </div>
  )
}

function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1)

  const dates = []

  while (date.getMonth() === month) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

const isWorkingDay = (year, month, day) => {
  day = new Date(year, month, day).getDay()
  return day != 0 && day != 6 && day !== 5
}

export default WorkingCalendar
