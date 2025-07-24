# PERN Store

A full-stack e-commerce inventory app built with the PERN stack (PostgreSQL, Express, React, Node.js). It features product management, theme switching, and bot/rate-limit protection.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for server-side code
- **Express**: Web framework for building REST APIs
- **PostgreSQL**: Relational database for storing products
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **dotenv**: Environment variable management
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **cors**: Cross-origin resource sharing
- **Arcjet**: Bot and rate-limit protection

### Frontend
- **React**: UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Tailwind CSS component library
- **React Router**: Routing for React
- **Zustand**: State management
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **React Hot Toast**: Toast notifications

### Dev Tools
- **ESLint**: Linting for code quality
- **Nodemon**: Auto-restart server on changes

## Project Structure

```
.env
package.json
backend/
  server.js
  config/
    db.js
  controllers/
    product.controller.js
  lib/
    arcjet.js
  routes/
    product.routes.js
  seeds/
    products.js
frontend/
  index.html
  package.json
  src/
    App.jsx
    main.jsx
    index.css
    components/
      Navbar.jsx
      ProductCard.jsx
      AddProductModal.jsx
      ThemeSelector.jsx
    constants/
      index.js
    pages/
      HomePage.jsx
      ProductPage.jsx
    store/
      useProductStore.js
      useThemeStore.js
```

## How to Run

1. **Install dependencies**  
   In both `backend` and `frontend` folders:
   ```sh
   npm install
   ```

2. **Configure environment**  
   Edit `.env` with your PostgreSQL and Arcjet credentials.

3. **Start backend**  
   ```sh
   npm run dev
   ```

4. **Seed database (optional)**  
   ```sh
   node backend/seeds/products.js
   ```

5. **Start frontend**  
   ```sh
   npm run dev
   ```

6. **Access the app**  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- Add, edit, delete, and view products
- Responsive UI with multiple themes
- Bot and rate-limit protection on API
- Toast notifications for actions

---
