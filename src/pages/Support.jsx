import { Link } from 'react-router-dom'
import { ArrowRight, CarFront, CircleHelp, Mail, MessageCircle, ShieldCheck } from 'lucide-react'

const faqs = [
  {
    question: 'How do I book a car?',
    answer: 'Choose a car from the collection, open its details, and select Book now. Add your contact details, pickup and return locations, dates, and times, then submit the request.'
  },
  {
    question: 'Will I be charged when I submit a booking?',
    answer: 'No. CarSha is currently a frontend demo. Booking requests are shown on a confirmation screen only; no payment is taken and no real reservation is created.'
  },
  {
    question: 'How is the rental total calculated?',
    answer: 'The estimate uses the selected car’s daily rate in Indian rupees multiplied by the number of rental days. Taxes and optional extras are not included in this demo estimate.'
  },
  {
    question: 'What does the included mileage mean?',
    answer: 'Mileage allowance is listed on each car’s details page. Some cars show a daily kilometre allowance, while others are listed with unlimited mileage.'
  },
  {
    question: 'Can I book a car marked as booked?',
    answer: 'Cars marked as booked are unavailable in the demo and cannot be booked. Use the availability filter on the car listing to show available cars only.'
  },
  {
    question: 'Can I change my pickup or return location?',
    answer: 'Yes. Enter the pickup and return locations separately in the booking form. The trip summary and confirmation screen display both stops.'
  }
]

export default function Support() {
  return <main className="support-page">
    <div className="container">
      <header className="support-hero">
        <span className="eyebrow">CARSHA, HERE TO HELP</span>
        <h1>A little help for<br/><em>the road ahead.</em></h1>
        <p>Find answers about booking, rental estimates and this CarSha demo.</p>
        <a className="btn btn-lime" href="#faqs">Browse FAQs <ArrowRight size={16}/></a>
      </header>

      <section className="support-section" id="help">
        <div className="support-section-heading"><span className="eyebrow">QUICK HELP</span><h2>Start with the basics.</h2><p>Useful details for planning a rental in the CarSha demo.</p></div>
        <div className="help-card-grid">
          <article className="help-card"><span className="help-card-icon"><CarFront size={20}/></span><h3>Finding a car</h3><p>Browse the collection, search by model or brand, or filter by type, daily budget, transmission and availability.</p><Link to="/cars">Explore cars <ArrowRight size={15}/></Link></article>
          <article className="help-card"><span className="help-card-icon"><ShieldCheck size={20}/></span><h3>Booking & payments</h3><p>Booking submissions are for demonstration only. No payment is processed and no real reservation is made.</p><Link to="/cars">Choose a car <ArrowRight size={15}/></Link></article>
          <article className="help-card"><span className="help-card-icon"><CircleHelp size={20}/></span><h3>Rental estimates</h3><p>Rates are displayed in Indian rupees. The booking estimate is the daily rate multiplied by rental days.</p><a href="#faqs">Read common questions <ArrowRight size={15}/></a></article>
        </div>
      </section>

      <section className="support-faq-section" id="faqs">
        <div className="support-section-heading"><span className="eyebrow">GOOD TO KNOW</span><h2>Frequently asked questions.</h2><p>Quick answers to common questions about using CarSha.</p></div>
        <div className="faq-list">{faqs.map(({ question, answer }) => <details className="faq-item" key={question}>
          <summary>{question}<span>+</span></summary>
          <p>{answer}</p>
        </details>)}</div>
      </section>

      <section className="contact-panel" id="contact">
        <div className="contact-panel-icon"><MessageCircle size={23}/></div>
        <div><span className="eyebrow">CONTACT US</span><h2>Still need a hand?</h2><p>This is a demo site and does not have a live support desk. You can email the demo contact address, or browse the help topics above.</p><a className="contact-email" href="mailto:hello@carsha.example"><Mail size={16}/> hello@carsha.example</a></div>
        <Link className="btn btn-dark" to="/cars">Browse cars <ArrowRight size={16}/></Link>
      </section>
    </div>
  </main>
}
