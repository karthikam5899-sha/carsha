import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['Home', '/'], ['Explore cars', '/cars'], ['How it works', '/#how-it-works']]
  return <header className="nav-wrap">
    <nav className="container nav">
      <Link to="/" className="brand" aria-label="CarSha home"><img className="brand-logo" src="/CarSha.png" alt="CarSha"/></Link>
      <div className="desktop-links">{links.map(([label, href]) => <NavLink key={label} to={href} className={({isActive}) => isActive && href !== '/#how-it-works' ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}</div>
      <div className="nav-actions"><Link className="nav-login" to="/cars">Sign in</Link><Link className="btn btn-dark nav-cta" to="/cars">Find a car <ArrowUpRight size={16}/></Link></div>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    </nav>
    {open && <div className="mobile-links">{links.map(([label, href]) => <Link key={label} to={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link to="/cars" onClick={() => setOpen(false)}>Browse cars</Link></div>}
  </header>
}