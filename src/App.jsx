import { Routes, Route, useLocation } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageIntro from './components/PageIntro'
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import Booking from './pages/Booking'
import Support from './pages/Support'
function ScrollToTop() { const {pathname, hash} = useLocation(); useEffect(()=>{ if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(); else window.scrollTo(0,0) },[pathname,hash]); return null }
export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const finishIntro = useCallback(() => setShowIntro(false), [])

  return <>
    {showIntro && <PageIntro onComplete={finishIntro}/>}
    <div className={`app-content ${showIntro ? 'app-content-hidden' : ''}`} aria-hidden={showIntro}>
      <ScrollToTop/><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/cars" element={<Cars/>}/><Route path="/cars/:id" element={<CarDetails/>}/><Route path="/booking/:id" element={<Booking/>}/><Route path="/support" element={<Support/>}/><Route path="*" element={<main className="container not-found"><h1>Page not found</h1><a href="/">Go home</a></main>}/></Routes><Footer/>
    </div>
  </>
}