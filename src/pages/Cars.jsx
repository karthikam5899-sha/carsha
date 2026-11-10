import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SlidersHorizontal, Search, ArrowUpDown, X } from 'lucide-react'
import CarCard from '../components/CarCard'
import { cars, money, MAX_DAILY_PRICE, MIN_DAILY_PRICE } from '../data/cars'

export default function Cars() {
  const location = useLocation()
  const collection = new URLSearchParams(location.search).get('collection')
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [brand, setBrand] = useState('All')
  const [transmission, setTransmission] = useState('All')
  const [maxPrice, setMaxPrice] = useState(MAX_DAILY_PRICE)
  const [sort, setSort] = useState('recommended')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  useEffect(() => {
    setSearch('')
    setType('All')
    setBrand('All')
    setTransmission('All')
    setMaxPrice(MAX_DAILY_PRICE)
    setAvailableOnly(false)
  }, [collection])
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const collectionCars = collection === 'popular' ? cars.filter(car => car.available && ['Popular', 'Great value', 'Family pick', 'Weekend ready'].includes(car.tag)) : cars
    let list = collectionCars.filter(c => (type === 'All' || c.type === type) && (brand === 'All' || c.brand === brand) && (transmission === 'All' || c.transmission === transmission) && c.price <= maxPrice && (!availableOnly || c.available) && `${c.name} ${c.brand} ${c.category} ${c.type} ${c.transmission} ${c.fuel}`.toLowerCase().includes(query))
    if (sort === 'price-low') list.sort((a,b)=>a.price-b.price)
    if (sort === 'price-high') list.sort((a,b)=>b.price-a.price)
    if (sort === 'rating') list.sort((a,b)=>b.rating-a.rating)
    return list
  }, [search,type,brand,transmission,maxPrice,sort,availableOnly,collection])
  const reset = () => {setSearch('');setType('All');setBrand('All');setTransmission('All');setMaxPrice(MAX_DAILY_PRICE);setAvailableOnly(false)}
  return <main className="listing-page"><div className="container"><div className="page-intro"><span className="eyebrow">{collection === 'popular' ? 'RENTER FAVOURITES' : 'THE CARSHA COLLECTION'}</span><h1>{collection === 'popular' ? <>Popular cars for <em>good trips.</em></> : <>Find the car for <em>every road.</em></>}</h1><p>{collection === 'popular' ? 'A handpicked collection of available cars renters love.' : 'From everyday essentials to something a little special.'}</p></div>
    {location.state?.pickup && <div className="trip-notice">Your trip: {location.state.pickup} · {location.state.pickupDate} to {location.state.returnDate}</div>}
    <div className="listing-toolbar"><div className="listing-search"><Search size={18}/><input aria-label="Search cars" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by model, brand, or feature..."/></div><button className="filter-toggle" onClick={()=>setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}><SlidersHorizontal size={17}/> Filters</button><label className="sort-select"><ArrowUpDown size={16}/><select aria-label="Sort cars" value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div>
    <div className="listing-layout"><aside className={`filters ${filtersOpen?'filters-open':''}`} aria-label="Car filters"><div className="filter-title"><h3>Filters</h3><button onClick={reset}>Clear all</button><button className="filter-close" onClick={()=>setFiltersOpen(false)} aria-label="Close filters"><X/></button></div>
      <div className="filter-group"><h4>Car type</h4>{['All','Economy','Sedan','SUV'].map(v=><label className="radio-row" key={v}><input type="radio" name="type" checked={type===v} onChange={()=>setType(v)}/>{v}</label>)}</div>
      <div className="filter-group"><h4 id="brand-filter-label">Brand</h4><select aria-labelledby="brand-filter-label" className="filter-select" value={brand} onChange={e=>setBrand(e.target.value)}>{['All',...new Set(cars.map(car=>car.brand))].map(v=><option key={v}>{v}</option>)}</select></div>
      <div className="filter-group"><h4 id="transmission-filter-label">Transmission</h4><select aria-labelledby="transmission-filter-label" className="filter-select" value={transmission} onChange={e=>setTransmission(e.target.value)}><option>All</option><option>Automatic</option><option>Manual</option></select></div>
      <div className="filter-group"><h4 id="price-filter-label">Daily budget <b>{money(maxPrice)}</b></h4><input aria-labelledby="price-filter-label" className="price-range" type="range" min={MIN_DAILY_PRICE} max={MAX_DAILY_PRICE} step="100" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><div className="range-labels"><span>{money(MIN_DAILY_PRICE)}</span><span>{money(MAX_DAILY_PRICE)}+</span></div></div>
      <label className="available-check"><input type="checkbox" checked={availableOnly} onChange={e=>setAvailableOnly(e.target.checked)}/> Available cars only</label>
    </aside><div className="results-area"><div className="results-count" aria-live="polite"><b>{filtered.length} {filtered.length === 1 ? 'car' : 'cars'} found</b><span>Prices shown per day</span></div>{filtered.length ? <div className="car-grid">{filtered.map(car=><CarCard key={car.id} car={car}/>)}</div> : <div className="empty-state"><h3>No cars match those filters</h3><p>Try adjusting your search or clearing a filter.</p><button className="btn btn-dark" onClick={reset}>Clear filters</button></div>}</div></div>
  </div></main>
}