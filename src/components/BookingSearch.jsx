import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, CalendarDays, Clock3, Search } from 'lucide-react'
const dateInputValue = date => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const today = dateInputValue(new Date())
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
export default function BookingSearch() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ pickup: 'Coimbatore Airport', dropoff: 'Coimbatore Airport', pickupDate: today, pickupTime: '10:00', returnDate: dateInputValue(tomorrow), returnTime: '10:00' })
  const update = e => {
    const { name, value } = e.target
    setForm(current => ({
      ...current,
      [name]: value,
      ...(name === 'pickupDate' && current.returnDate < value ? { returnDate: value } : {})
    }))
  }
  const submit = e => { e.preventDefault(); navigate('/cars', { state: form }) }
  return <form className="booking-search" onSubmit={submit}>
    <div className="search-field"><label><MapPin size={15}/> Pick-up location</label><input name="pickup" value={form.pickup} onChange={update} required placeholder="City, airport or address"/></div>
    <div className="search-field"><label><MapPin size={15}/> Drop-off location</label><input name="dropoff" value={form.dropoff} onChange={update} required placeholder="Same as pick-up"/></div>
    <div className="search-field"><label><CalendarDays size={15}/> Pick-up date</label><input type="date" name="pickupDate" min={today} value={form.pickupDate} onChange={update} required/></div>
    <div className="search-field"><label><Clock3 size={15}/> Time</label><input type="time" name="pickupTime" value={form.pickupTime} onChange={update} required/></div>
    <div className="search-field"><label><CalendarDays size={15}/> Return date</label><input type="date" name="returnDate" min={form.pickupDate} value={form.returnDate} onChange={update} required/></div>
    <div className="search-field"><label><Clock3 size={15}/> Time</label><input type="time" name="returnTime" value={form.returnTime} onChange={update} required/></div>
    <button className="btn btn-lime search-submit" type="submit"><Search size={18}/> Search cars</button>
  </form>
}