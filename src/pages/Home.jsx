import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Headphones, BadgeCheck, ChevronRight } from 'lucide-react'
import BookingSearch from '../components/BookingSearch'
import CarCard from '../components/CarCard'
import { cars } from '../data/cars'

export default function Home() {
  return <>
    <section className="hero"><div className="hero-bg"></div><div className="container hero-content">
      <div className="hero-copy"><span className="hero-kicker"><span></span> GOOD CARS. GOOD DAYS.</span><h1>Take the scenic<br/><em>route home.</em></h1><p>Find a car that fits your plans, your people and your budget. Pick up nearby and make the most of the miles ahead.</p><div className="hero-trust"><span><ShieldCheck size={17}/> Straightforward pricing</span><span><BadgeCheck size={17}/> Trusted everyday cars</span></div></div>
      <div className="hero-image-note"><span>DRIVE YOUR WAY</span><div><b>Room for the little detours.</b><small>Reliable rides for wherever life takes you.</small></div></div>
    </div></section>
    <section className="container search-section"><div className="search-heading"><div><span className="eyebrow">PLAN YOUR RIDE</span><h2>Where are you headed?</h2></div><span className="search-caption">Your perfect car is just a few clicks away.</span></div><BookingSearch/></section>
    <section className="section container"><div className="section-heading"><div><span className="eyebrow">GOOD PICKS FOR EVERYDAY PLANS</span><h2>Popular <em>rides.</em></h2><p>Real-world favourites, ready when you are.</p></div><Link to="/cars" className="text-link">View all cars <ArrowRight size={17}/></Link></div><div className="car-grid">{cars.slice(0,3).map(car => <CarCard key={car.id} car={car}/>)}</div></section>
    <section className="how-section" id="how-it-works"><div className="container"><div className="section-heading"><div><span className="eyebrow">NO COMPLICATIONS</span><h2>Hit the road in <em>3 steps.</em></h2><p>Booking a car should be as easy as driving one.</p></div></div><div className="steps-grid">
      {[['01','Choose your ride','Explore our range and find the car that fits your plans.'],['02','Book in a few clicks','Choose your dates, add your details and confirm.'],['03','Pick up & go','Meet your host, grab the keys and enjoy the ride.']].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><div className="step-line"></div><h3>{t}</h3><p>{d}</p></div>)}
    </div></div></section>
    <section className="container benefits"><div><span className="benefit-icon"><ShieldCheck/></span><h3>Peace of mind</h3><p>Transparent pricing and support when you need it.</p></div><div><span className="benefit-icon"><BadgeCheck/></span><h3>Quality you can trust</h3><p>Every vehicle is reviewed before it hits the road.</p></div><div><span className="benefit-icon"><Headphones/></span><h3>Here for the journey</h3><p>Friendly help from booking to drop-off.</p></div></section>
    <section className="container bottom-cta"><div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>Good things happen<br/>when you <em>get moving.</em></h2><p>Find a car that fits your plans and make the most of every mile.</p><Link to="/cars" className="btn btn-lime">Explore all cars <ChevronRight size={17}/></Link></div><div className="cta-car"></div></section>
  </>
}