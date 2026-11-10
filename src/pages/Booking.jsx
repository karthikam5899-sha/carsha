import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, ShieldCheck, ArrowLeft, ArrowRight, MapPin, CalendarDays, Clock3, Route, CircleCheck } from 'lucide-react'
import { cars, money } from '../data/cars'

const localDateValue = date => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const today = localDateValue(new Date())
const tomorrowDate = new Date()
tomorrowDate.setDate(tomorrowDate.getDate() + 1)
const tomorrow = localDateValue(tomorrowDate)

export default function Booking() {
  const { id } = useParams()
  const car = cars.find(c => c.id === Number(id))
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    pickupLocation: 'Coimbatore Airport', dropoffLocation: 'Coimbatore Airport',
    pickup: today, dropoff: tomorrow, pickupTime: '10:00', dropoffTime: '10:00', notes: ''
  })
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const update = event => {
    const { name, value } = event.target
    setForm(current => ({
      ...current,
      [name]: value,
      ...(name === 'pickup' && current.dropoff < value ? { dropoff: value } : {})
    }))
    setErrors(current => ({ ...current, [name]: '' }))
  }
  const days = useMemo(() => {
    if (!form.pickup || !form.dropoff) return 1
    const pickup = new Date(`${form.pickup}T00:00:00`)
    const dropoff = new Date(`${form.dropoff}T00:00:00`)
    return Math.max(1, Math.ceil((dropoff - pickup) / 86400000))
  }, [form.pickup, form.dropoff])
  const total = car ? days * car.price : 0

  if (!car) return <main className="container not-found"><h2>Car not found</h2><Link to="/cars">Browse cars</Link></main>
  if (!car.available) return <main className="container not-found"><h2>This car is currently unavailable</h2><p>Please choose another ride for your trip.</p><Link className="btn btn-dark" to="/cars">Browse available cars <ArrowRight size={16}/></Link></main>

  const submit = event => {
    event.preventDefault()
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Enter your first name'
    if (!form.lastName.trim()) next.lastName = 'Enter your last name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!/^[+()\d\s-]{8,}$/.test(form.phone)) next.phone = 'Enter a valid phone number'
    if (!form.pickupLocation.trim()) next.pickupLocation = 'Enter a pickup location'
    if (!form.dropoffLocation.trim()) next.dropoffLocation = 'Enter a return location'
    if (!form.pickup || form.pickup < today) next.pickup = 'Pickup must be today or later'
    if (!form.dropoff || !form.pickup || form.dropoff < form.pickup) next.dropoff = 'Return date must be on or after pickup'
    setErrors(next)
    if (!Object.keys(next).length) setConfirmed(true)
  }

  if (confirmed) return <main className="confirmation-page booking-confirmation">
    <div className="confirmation-card">
      <div className="confirmation-ticket-top"><span className="eyebrow">YOUR NEXT TRIP</span><span className="ticket-code">RD · {String(car.id).padStart(3, '0')}</span></div>
      <span className="success-icon"><CheckCircle2 size={42}/></span>
      <span className="eyebrow">BOOKING REQUEST RECEIVED</span>
      <h1>You're on your way, {form.firstName}.</h1>
      <p>Your demo booking request for the {car.name} is confirmed on this screen.</p>
      <div className="confirmation-summary">
        <img src={car.image} alt={car.name}/>
        <div><b>{car.name}</b><span>{days} {days === 1 ? 'day' : 'days'} · {money(total)}</span></div>
      </div>
      <div className="confirmation-route"><div><MapPin size={16}/><span><small>PICK UP</small><b>{form.pickupLocation}</b><time>{form.pickup} · {form.pickupTime}</time></span></div><div className="route-connector"/><div><MapPin size={16}/><span><small>RETURN</small><b>{form.dropoffLocation}</b><time>{form.dropoff} · {form.dropoffTime}</time></span></div></div>
      <p className="demo-note">Demo experience: no payment was taken and no real reservation was created.</p>
      <Link className="btn btn-dark full-btn" to="/">Back to home <ArrowRight size={16}/></Link>
    </div>
  </main>

  return <main className="booking-page booking-redesign">
    <div className="container">
      <Link to={`/cars/${car.id}`} className="back-link"><ArrowLeft size={16}/> Back to {car.name}</Link>
      <header className="booking-masthead">
        <div><span className="eyebrow">THE FUN PART STARTS HERE</span><h1>Let's get you <em>going.</em></h1><p>A few details, then the open road is yours.</p></div>
        <div className="booking-progress"><span className="progress-active"><CircleCheck size={17}/> Your details</span><i/><span><span className="progress-number">02</span> Confirm</span></div>
      </header>

      <form className="booking-redesign-grid" onSubmit={submit} noValidate>
        <div className="booking-form-card booking-form-redesign">
          <section className="form-section booking-section">
            <div className="booking-section-title"><span>01</span><div><h2>Who's driving?</h2><p>Tell us who we'll be handing the keys to.</p></div></div>
            <div className="form-grid">
              <Field label="First name" name="firstName" value={form.firstName} onChange={update} error={errors.firstName} autoComplete="given-name"/>
              <Field label="Last name" name="lastName" value={form.lastName} onChange={update} error={errors.lastName} autoComplete="family-name"/>
              <Field label="Email address" name="email" type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email"/>
              <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} autoComplete="tel"/>
            </div>
          </section>

          <section className="form-section booking-section">
            <div className="booking-section-title"><span>02</span><div><h2>Map out your trip</h2><p>Choose your pickup and return stops, dates and times.</p></div></div>
            <div className="route-form">
              <Field label="Pick-up location" name="pickupLocation" value={form.pickupLocation} onChange={update} error={errors.pickupLocation} icon={<MapPin size={15}/>} autoComplete="street-address"/>
              <Field label="Return location" name="dropoffLocation" value={form.dropoffLocation} onChange={update} error={errors.dropoffLocation} icon={<MapPin size={15}/>} autoComplete="street-address"/>
              <div className="form-grid">
                <Field label="Pick-up date" name="pickup" type="date" min={today} value={form.pickup} onChange={update} error={errors.pickup} icon={<CalendarDays size={15}/>}/>
                <Field label="Pick-up time" name="pickupTime" type="time" value={form.pickupTime} onChange={update} icon={<Clock3 size={15}/>}/>
                <Field label="Return date" name="dropoff" type="date" min={form.pickup} value={form.dropoff} onChange={update} error={errors.dropoff} icon={<CalendarDays size={15}/>}/>
                <Field label="Return time" name="dropoffTime" type="time" value={form.dropoffTime} onChange={update} icon={<Clock3 size={15}/>}/>
              </div>
            </div>
            <label className="field-label notes-label">A note for your host <textarea name="notes" rows="3" value={form.notes} onChange={update} placeholder="Anything that would make your pickup smoother? (optional)"/></label>
          </section>
          <button className="btn btn-dark full-btn confirm-booking booking-confirm-btn" type="submit">Request this car · {money(total)} <ArrowRight size={17}/></button>
          <p className="form-terms"><ShieldCheck size={13}/> No payment now. This is a demo booking experience.</p>
        </div>

        <aside className="booking-summary booking-summary-redesign">
          <span className="eyebrow">YOUR LITTLE GETAWAY</span>
          <div className="summary-car-photo"><img src={car.image} alt={car.name}/><span className={car.available ? 'summary-status' : 'summary-status summary-status-booked'}>{car.available ? 'Available' : 'Booked'}</span></div>
          <h2>{car.name}</h2>
          <p className="summary-car-meta">{car.brand} <span>·</span> {car.transmission} <span>·</span> {car.seats} seats</p>
          <div className="summary-route">
            <div className="summary-route-line"><span className="route-pin pickup-pin"><MapPin size={14}/></span><div><small>PICK UP</small><b>{form.pickupLocation || 'Choose a pickup location'}</b><span>{form.pickup} · {form.pickupTime}</span></div></div>
            <div className="summary-route-line"><span className="route-pin return-pin"><Route size={14}/></span><div><small>RETURN</small><b>{form.dropoffLocation || 'Choose a return location'}</b><span>{form.dropoff} · {form.dropoffTime}</span></div></div>
          </div>
          <div className="summary-line"><span>{money(car.price)} × {days} {days === 1 ? 'day' : 'days'}</span><b>{money(total)}</b></div>
          <div className="summary-line"><span>Basic protection</span><b>Included</b></div>
          <div className="summary-total"><span>Estimated total</span><strong>{money(total)}</strong></div>
          <small className="summary-disclaimer">Taxes and optional extras may apply at checkout.</small>
          <div className="summary-reassurance"><ShieldCheck size={17}/><span><b>Easy does it.</b><small>Secure booking, no hidden fees.</small></span></div>
        </aside>
      </form>
    </div>
  </main>
}

function Field({ label, name, type = 'text', value, onChange, error, min, icon, autoComplete }) {
  return <label className={`field-label booking-field ${error ? 'booking-field-invalid' : ''}`}>
    <span>{icon}{label}</span>
    <input name={name} type={type} value={value} onChange={onChange} min={min} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined}/>
    {error && <small className="error-text" id={`${name}-error`}>{error}</small>}
  </label>
}
