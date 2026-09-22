# Closet & Core

A web-based e-commerce platform for a clothing retailer. Customers can browse, search, and order products; the retailer manages products, orders, and contact details from a dashboard.

## Tech Stack

- **Frontend:** React 19 (Vite), React Router 7, Tailwind CSS 4
- **Backend:** PHP (plain scripts, one per endpoint, `mysqli`)
- **Database:** MySQL / MariaDB (InnoDB)

## Architecture

Three-tier client-server:

- **Presentation** — React SPA. Handles routing, forms, and rendering; never talks to the database directly.
- **Application** — PHP API in `backend/api/`. One file per operation (login, place order, add product, ...), each returning JSON. Holds all business logic, validation, and role checks.
- **Data** — MySQL. Tables: `users`, `category`, `products`, `product_variant`, `cart_items`, `orders`, `order_items`, `retailer_contacts`.

## Authentication & Authorization

- **Session-based auth:** on login, PHP stores `uid`, `role`, and name in `$_SESSION` . Every protected endpoint calls `session_start()` (via `config/session.php`) to reload that session, so the server is the source of truth for who's logged in.
- **Passwords:** hashed with `password_hash`, checked with `password_verify`.
- **Role-based access control (RBAC):** roles are `customer` and `retailer` (guests have no session). `requireRole([...])` on each endpoint returns 401 if not logged in, 403 if the role doesn't match. Frontend route guards (`CustomerOnlyRoute`, `RetailerRoute`) re-routes the user if failed to verify respective role.

## Key Features

- **Catalog:** categories, products, variants (color/size/stock), image stored as MEDIUMBLOB and served by `productImage.php`.
- **Cart:** stored per user in the database with stock checks on add/update(increasing/decreasing qty).
- **Checkout:** `placeOrder.php` runs in a single transaction — locks the cart, recomputes the total server-side from DB prices, decrements stock without overselling, snapshots item details into `order_items`, then clears the cart.
- **Order status:** customers can cancel their own pending orders; retailers move orders `pending → processing → delivered` (delivered only once paid).
- **Retailer tools:** add/edit products with duplicate-name and duplicate-image checks, variant validation (unique color+size per product), category management, contact info, and a dashboard with order/stock counts.

## Project Structure

```
backend/
  api/          One PHP file per endpoint (login, placeOrder, addProduct, ...)
  config/       Shared includes: cors.php, session.php, connectDB.php, requireRole.php
  onlineStore.sql  sql dump

frontend/
  src/
    core/       contains App and Main
    routes/     contains routes and role-based route guard
    context/    AuthContext, SearchContext
    pages/      home, cart, checkout, orders, dashboard
    components/ Reusable UI (header, product cards, etc.)
    data/       Data-fetching hooks (useProducts, useCartItems, ...)
    api/        fetch wrappers per resource
  public/       .htaccess (SPA rewrite for InfinityFree)
```

## Setup

### Backend
1. Copy this example .env file content and fill in your DB credentials:
   ```
    DB_HOST=
    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    DB_PORT = 
   ```
2. Serve the backend/ folder with PHP. 
XAMPP: place the backend/ folder inside htdocs/,
  start Apache and MySQL from the XAMPP control panel,

### Database
1. Create the database and import backend/onlineStore.sql via phpMyAdmin.

### Frontend
1. `cd frontend && npm install`
2. Set `VITE_API_URL` in `.env.development` / `.env.production` to point at your backend's `api/` folder.
3. Dev: `npm run dev`
4. Build: `npm run build` → deploy the `dist/` folder.
