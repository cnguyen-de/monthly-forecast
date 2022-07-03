import { ChangeEvent, useState } from 'react'

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
      setEmailBody(`Mein Forecast für ${currentMonth + 1}.${currentYear} ist ${dailyRate * (selectedDays.length + 1)}€`)
    } else {
      const newSelectedDays = [...selectedDays]
      newSelectedDays.splice(index, 1)
      setDays(newSelectedDays)
      setEmailBody(`Mein Forecast für ${currentMonth + 1}.${currentYear} ist ${dailyRate * newSelectedDays.length}€`)
    }
  }

  const [dailyRate, setDailyRate] = useState(940)
  const onDailyRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDailyRate(Number(e.target.value))
    setEmailBody(
      `Mein Forecast für ${currentMonth + 1}.${currentYear} ist ${Number(e.target.value) * selectedDays.length}€`
    )
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
          className="block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
          value={dailyRate}
          min="1"
          step="any"
          onChange={onDailyRateChange}></input>
      </div>

      <h3 className="text-right text-xl font-bold">
        {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
      </h3>
      <div className="grid w-full grid-flow-row grid-cols-7 gap-2">
        {weekDays.map((weekday, i) => (
          <span className="text-center text-sm font-medium uppercase" key={i}>
            {weekday}
          </span>
        ))}
        {Array.from({ length: firstDay - 1 }).map((_, i) => (
          <span key={i}> </span>
        ))}
        {daysInMonth.map((dayInMonth, i) => (
          <span
            className={`inline-block cursor-pointer rounded p-2 text-center text-gray-900 hover:bg-blue-100 hover:text-black ${
              selectedDays.includes(dayInMonth.getDate())
                ? 'bg-gradient-to-tr from-blue-200 to-teal-300 hover:from-blue-300 hover:to-teal-300'
                : ''
            }`}
            key={i}
            title={selectedDays.includes(dayInMonth.getDate()) ? `Project Day` : 'Non-working Day'}
            onClick={onClickDay}>
            {dayInMonth.getDate()}
          </span>
        ))}
      </div>
      {/* <div className="mt-8 uppercase font-bold">Forecast: {dailyRate * selectedDays.length}€</div> */}
      <div className="w-full">
        <label className="relative inset-0 m-0 p-0" htmlFor="email">
          Email to
        </label>
        <input
          className="block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
          type="email"
          id="email"
          value={email}
          placeholder="someone@email.com"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}></input>
      </div>

      <textarea
        className="block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
        value={emailBody}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEmailBody(e.target.value)}></textarea>
      <a
        className="rounded bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-2 text-white hover:from-blue-700 hover:to-teal-600"
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
