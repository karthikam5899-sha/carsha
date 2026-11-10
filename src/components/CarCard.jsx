import { Link } from 'react-router-dom'
import { Users, Fuel, Settings2, ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import { money } from '../data/cars'
export default function CarCard({ car }) {
  return <article className="car-card">
    <Link to={`/cars/${car.id}`} className="car-image-wrap"><img src={car.image} alt={car.name} className="car-image"/>{car.tag && <span className="car-tag">{car.tag}</span>}<span className={`availability ${car.available ? 'available' : 'unavailable'}`}>{car.available ? 'Available' : 'Booked'}</span></Link>
    <div className="car-card-body"><div className="car-card-heading"><div><p className="eyebrow">{car.brand} · {car.category}</p><h3>{car.name}</h3></div><div className="rating">★ {car.rating}</div></div>
      <div className="car-specs"><span><Users size={15}/>{car.seats} seats</span><span><Fuel size={15}/>{car.fuel}</span><span><Settings2 size={15}/>{car.transmission}</span><span><BriefcaseBusiness size={15}/>{car.bags} bags</span></div>
      <div className="car-card-bottom"><div><strong>{money(car.price)}</strong><small> / day</small></div><Link to={`/cars/${car.id}`} className="circle-link" aria-label={`View ${car.name}`}><ArrowUpRight size={19}/></Link></div>
    </div>
  </article>
}