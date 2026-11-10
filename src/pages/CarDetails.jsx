import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Users, Fuel, Settings2, BriefcaseBusiness, Gauge, ShieldCheck, Check, CalendarDays, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cars, money } from '../data/cars'

const galleryPhotos = [
  'photo-1492144534655-ae79c964c9d7',
  'photo-1519641471654-76ce0107ad1b'
]

export default function CarDetails() {
  const { id } = useParams()
  const car = cars.find(c => c.id === Number(id))
  const [period, setPeriod] = useState('daily')
  const [photoIndex, setPhotoIndex] = useState(0)
  if (!car) return <main className="container not-found"><h2>Car not found</h2><Link to="/cars">Back to cars</Link></main>

  const photos = [car.image, ...galleryPhotos.map(photo => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1400&q=85`).filter(photo => photo !== car.image)]
  const prices = { daily: car.price, weekly: car.weekly, monthly: car.monthly }
  const priceUnit = { daily: 'day', weekly: 'week', monthly: 'month' }

  const changePhoto = direction => setPhotoIndex(current => (current + direction + photos.length) % photos.length)

  return <main className="details-page"><div className="container">
    <Link to="/cars" className="back-link"><ArrowLeft size={16}/> Browse all cars</Link>
    <header className="details-top">
      <div>
        <span className="eyebrow">{car.brand} <span className="detail-eyebrow-dot">/</span> {car.category} <span className="detail-eyebrow-dot">/</span> {car.fuel}</span>
        <h1>{car.name}</h1>
        <div className="details-subtitle"><span className="detail-rating"><Star size={15} fill="currentColor"/> {car.rating}</span><span className="detail-separator">·</span>{car.seats} seats<span className="detail-separator">·</span>{car.transmission}</div>
      </div>
      <span className={`availability details-availability ${car.available ? 'available' : 'unavailable'}`}><span className="status-dot"/> {car.available ? 'Ready to book' : 'Currently booked'}</span>
    </header>

    <section className="details-gallery" aria-label={`${car.name} image gallery`}>
      <div className="gallery-main">
        <img src={photos[photoIndex]} alt={`${car.name} rental photo ${photoIndex + 1}`}/>
        <span className="gallery-count">{String(photoIndex + 1).padStart(2, '0')} <span>/</span> {String(photos.length).padStart(2, '0')}</span>
        <div className="gallery-controls">
          <button type="button" onClick={() => changePhoto(-1)} aria-label="Previous photo"><ChevronLeft size={19}/></button>
          <button type="button" onClick={() => changePhoto(1)} aria-label="Next photo"><ChevronRight size={19}/></button>
        </div>
      </div>
      <div className="gallery-rail">
        {photos.map((photo, index) => <button type="button" key={photo} className={`gallery-thumb ${photoIndex === index ? 'gallery-thumb-active' : ''}`} onClick={() => setPhotoIndex(index)} aria-label={`Show photo ${index + 1}`} aria-pressed={photoIndex === index}>
          <img src={photo} alt=""/>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </button>)}
        <div className="gallery-message"><span>A GOOD FIT FOR</span><b>Your next little escape.</b><small>Flexible pickup. Plenty of open road.</small></div>
      </div>
    </section>

    <div className="details-columns">
      <section className="details-info">
        <div className="detail-section-heading"><span className="eyebrow">THE GOOD STUFF</span><h2>A little more about this ride.</h2><p>{car.description}</p></div>
        <h2 className="detail-subhead">At a glance</h2>
        <div className="spec-grid">
          <div><Users/><span><b>{car.seats} seats</b><small>Passenger space</small></span></div>
          <div><Fuel/><span><b>{car.fuel}</b><small>Fuel type</small></span></div>
          <div><Settings2/><span><b>{car.transmission}</b><small>Transmission</small></span></div>
          <div><BriefcaseBusiness/><span><b>{car.bags} bags</b><small>Luggage capacity</small></span></div>
          <div><Gauge/><span><b>{car.mileage}</b><small>Included mileage</small></span></div>
          <div><ShieldCheck/><span><b>Included</b><small>Basic protection</small></span></div>
        </div>

        <h2 className="detail-subhead">Nice touches</h2>
        <div className="feature-chips">{car.features.map(feature => <span key={feature}><Check size={15}/>{feature}</span>)}</div>

        <div className="included-card"><div className="included-card-icon"><ShieldCheck size={20}/></div><div><b>More road, less worry.</b><p>Clean, inspected and ready for pickup, with roadside assistance included.</p></div></div>
      </section>

      <aside className="price-card">
        <span className="eyebrow">MAKE IT YOURS</span>
        <h3>Pick your pace.</h3>
        <div className="period-options" role="group" aria-label="Rental pricing period">
          {[['daily', 'Daily'], ['weekly', 'Weekly'], ['monthly', 'Monthly']].map(([value, label]) => <button type="button" key={value} className={period === value ? 'selected' : ''} aria-pressed={period === value} onClick={() => setPeriod(value)}>{label}</button>)}
        </div>
        <div className="price-display"><strong>{money(prices[period])}</strong><span> / {priceUnit[period]}</span></div>
        <p className="price-caption">{period === 'daily' ? 'A simple daily rate, with no surprises.' : `A special rate for a full ${period === 'weekly' ? 'week' : 'month'} on the road.`}</p>
        <Link to={`/booking/${car.id}`} className={`btn btn-dark full-btn details-book-btn ${!car.available ? 'disabled-link' : ''}`} aria-disabled={!car.available} onClick={event => !car.available && event.preventDefault()}>{car.available ? 'Book now' : 'Currently unavailable'} <ArrowRight size={17}/></Link>
        <div className="secure-note"><ShieldCheck size={16}/> Secure booking · No hidden fees</div>
        <div className="price-foot"><CalendarDays size={16}/><span>Free cancellation up to 24 hours before pickup.</span></div>
        <div className="price-card-note"><span>★</span> Loved by renters like you</div>
      </aside>
    </div>
  </div></main>
}
