import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter } from 'lucide-react'
export default function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><Link to="/" className="brand footer-brand" aria-label="CarSha home"><img className="brand-logo" src="/CarSha.png" alt="CarSha"/></Link><p>Good trips start with a great ride.<br/>Find the car that takes you there.</p><div className="socials"><Instagram/><Facebook/><Twitter/></div></div>
    <div><h4>Explore</h4><Link to="/cars">Browse cars</Link><Link to="/#how-it-works">How it works</Link><Link to="/cars?collection=popular">Popular Rentals</Link></div>
    <div><h4>Support</h4><Link to="/support#contact">Contact Us</Link><Link to="/support#help">Help centre</Link><Link to="/support#faqs">FAQs</Link></div>
    <div><h4>Get in touch</h4><p>Have a question? Our team is here to help.</p><a className="footer-email" href="mailto:hello@carsha.example">hello@carsha.example</a></div>
  </div><div className="container footer-bottom"><span>© 2026 CarSha. Demo project.</span><span>Privacy · Terms · Cookies</span></div></footer>
}