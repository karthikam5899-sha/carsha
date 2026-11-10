# CarSha — Rental Car Booking Website

A responsive React + Vite + Tailwind CSS rental-car booking frontend.

## Features
- Home page with responsive navigation, hero, booking search and featured cars
- Cars listing with search, car-type/brand/price/transmission filters, availability toggle and sorting
- Car details with gallery, specs and daily/weekly/monthly prices
- Booking form with validation, rental duration and total calculation
- Demo confirmation screen (no real payment or reservation)
- Responsive layouts for desktop, tablet and mobile

## Requirements
- Node.js 18+ (recommended)
- npm

## Setup
1. Extract the ZIP.
2. Open the extracted `carsha-booking` folder in VS Code.
3. Open a terminal in that folder.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Folder structure
```text
carsha-booking/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── cars.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── BookingSearch.jsx
    │   └── CarCard.jsx
    └── pages/
        ├── Home.jsx
        ├── Cars.jsx
        ├── CarDetails.jsx
        └── Booking.jsx
```

## Notes
- Car information and bookings are frontend demo data in `src/data/cars.js`.
- Images are loaded from Unsplash, so an internet connection is needed to display them.
- Rental rates and the `money` helper in `src/data/cars.js` use Indian rupees (INR).
- To connect a backend, replace the local `cars` array and demo booking confirmation with API calls and persistent booking records.
