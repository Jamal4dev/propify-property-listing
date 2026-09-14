# Propify

[![React](https://img.shields.io/badge/React-19.3.0-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.24.4-880000?logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

A full-stack real estate property listing platform built with the MERN stack. Propify gives users a focused marketplace experience for browsing, searching, creating, updating, and removing property listings backed by MongoDB persistence.

The project solves a common property discovery problem: keeping listing data, search and price filters, detail views, and CRUD workflows in one responsive application rather than scattering those tasks across disconnected tools.

## Live Demo

- **Frontend:** `[Netlify URL]`
- **Backend API:** `https://propify-api-81qi.onrender.com`

These placeholders are intentionally left for the deployed URLs to be added later.

## Screenshots

Replace the following placeholders with screenshots from the deployed application:

| View | Screenshot |
| --- | --- |
| Homepage and property listings | ![Propify homepage and property listings](docs/screenshots/homepage.png) |
| Property details | ![Propify property details page](docs/screenshots/property-details.png) |
| Add property form | ![Propify add property form](docs/screenshots/add-property.png) |
| Mobile responsive view | ![Propify mobile responsive layout](docs/screenshots/mobile.png) |

## Features

### Property workflows

- Browse all available property listings.
- Open a dedicated details page for a property.
- Create a property with title, price, location, description, and image URL fields.
- Edit existing property information.
- Delete properties after confirmation.
- Persist property records in MongoDB through the Express API.

### Search and usability

- Search by title, location, or description.
- Filter by minimum and maximum price.
- Sort by newest, lowest price, or highest price.
- Responsive layouts for desktop, tablet, and mobile screens.
- Loading, empty, and API error states.
- Toast feedback for update and delete workflows.
- Client-side and server-side validation for property data.
- Image URL preview and fallback handling.
- Accessible labels, navigation states, confirmation dialogs, and live status feedback.

## Tech Stack

### Frontend

| Technology | Role |
| --- | --- |
| React | Component-based user interface |
| React Router | Client-side routing for listing, details, add, edit, and not-found views |
| Vite | Frontend development server and production bundler |
| Axios | HTTP requests to the backend API |
| CSS | Custom responsive design system and UI styling |

### Backend and data

| Technology | Role |
| --- | --- |
| Node.js | JavaScript runtime for the API server |
| Express | REST API framework |
| Mongoose | MongoDB object modeling and schema validation |
| MongoDB Atlas | Hosted persistence for property records |
| Helmet | HTTP security headers |
| CORS | Configurable frontend origin access |
| dotenv | Environment variable loading |

### Deployment

| Platform | Role |
| --- | --- |
| Netlify | Planned frontend hosting target |
| Render | Planned backend hosting target |
| MongoDB Atlas | Hosted database |

## Application Architecture

```text
User
  |
  v
React + Vite frontend
  |
  | Axios requests to /api/properties
  v
Express REST API
  |
  | Mongoose models and validation
  v
MongoDB Atlas
```

- **React frontend:** renders the marketplace interface, handles routing and form interaction, and manages loading, errors, filters, and local UI state.
- **Express API:** exposes property CRUD endpoints, validates request data, applies search/filter/sort query logic, and returns consistent JSON responses.
- **Mongoose and MongoDB Atlas:** define and persist property records with timestamps and schema validation.

## Project Structure

```text
propify-property-listing/
├── client/
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   ├── ConfirmModal.jsx
│       │   ├── Loading.jsx
│       │   ├── Navbar.jsx
│       │   ├── PropertyCard.jsx
│       │   ├── PropertyForm.jsx
│       │   ├── SearchFilter.jsx
│       │   └── Toast.jsx
│       ├── pages/
│       │   ├── AddProperty.jsx
│       │   ├── EditProperty.jsx
│       │   ├── Home.jsx
│       │   ├── NotFound.jsx
│       │   └── PropertyDetails.jsx
│       └── services/
│           ├── api.js
│           └── propertyService.js
├── server/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── propertyController.js
│   ├── models/
│   │   └── property.js
│   └── routes/
│       └── propertyRoutes.js
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Jamal4dev/propify-property-listing.git
cd propify-property-listing
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

Open a second terminal from the repository root:

```bash
cd client
npm install
```

## Environment Variables

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

Create `client/.env` from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` should point to the API base path ending in `/api`, not the individual `/properties` resource path.

`CORS_ORIGIN` accepts a comma-separated list of allowed frontend origins when more than one deployment origin is required.

> Never commit `.env` files or database credentials. Environment files are ignored by Git. Store production secrets in the Render, Netlify, or other deployment platform environment-variable dashboards.

## Running Locally

### Start the backend

From `server/`:

```bash
npm run dev
```

For a production-style local start:

```bash
npm start
```

The API listens on `http://localhost:5000` by default.

### Start the frontend

From `client/`:

```bash
npm run dev
```

The Vite development server listens on `http://localhost:5173` by default.

## API Documentation

The API uses a consistent response envelope:

```json
{
  "success": true,
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "message": "Description of the error"
}
```

### Health check

```http
GET /
```

Returns a basic API health response.

### Property endpoints

Base resource: `/api/properties`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/properties` | Return all properties. Supports `search`, `minPrice`, `maxPrice`, and `sort` query parameters. |
| `GET` | `/api/properties/:id` | Return one property by MongoDB ID. |
| `POST` | `/api/properties` | Create a property. |
| `PUT` | `/api/properties/:id` | Update one or more property fields. |
| `DELETE` | `/api/properties/:id` | Delete a property. |

Property records contain these fields:

- `_id`
- `title`
- `price`
- `location`
- `description`
- `imageUrl`
- `createdAt`
- `updatedAt`

## Quality Checks

The current project has been validated with:

```bash
cd client
npm run lint
npm run build
```

A manual Playwright browser validation was also performed against the running frontend and real MongoDB-backed API. It covered property creation, homepage loading, search/filtering, details navigation, editing, deletion, deletion persistence after refresh, mobile navigation, and unknown-route handling.

There is currently no automated Playwright test script or test suite committed in the repository.

## Future Improvements

The following are roadmap ideas and are **not currently implemented**:

- User authentication and protected property management.
- Image upload and hosted media storage.
- Favorites or saved listings.
- Property categories and amenities.
- More advanced search and location filtering.
- Pagination for larger datasets.
- Automated unit, integration, and end-to-end test suites.
- Analytics or an administrative moderation dashboard.

## Author

**Samuel Ayomide Adeniyi**  
Frontend Developer | MERN Stack Developer

- GitHub: `[GitHub profile link]`
- LinkedIn: `[LinkedIn profile link]`

---

Propify is intended as a portfolio and learning project demonstrating full-stack CRUD workflows, API integration, MongoDB persistence, responsive UI design, and deployment-ready configuration.
