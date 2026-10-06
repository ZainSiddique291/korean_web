# MyShop Ecommerce

A modern, responsive e-commerce web application built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router**. Features product browsing, shopping cart, user authentication, product details, and checkout flow.


## ✨ Features

- **Product Catalog**: Browse products with filters, search, and grid/list views
- **Product Details**: View detailed product information, images, and add to cart
- **Shopping Cart**: Add/remove items, update quantities, view totals
- **User Authentication**: Login/Signup with protected routes
- **Checkout Flow**: Cart → Shipping → Order confirmation
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Scrolling Navigation**: HashLink for section jumps + page transitions
- **Smooth Animations**: Framer Motion and Tailwind animations
- **Toast Notifications**: User feedback for actions
- **Modern UI**: Custom Tailwind theme with Poppins font
- **State Management**: React Context API

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 19, React Router DOM 7 |
| **Build Tool** | Vite (with React plugin) |
| **Styling** | Tailwind CSS 3.4, clsx, Tailwind Merge |
| **UI Components** | Headless UI, Lucide React icons |
| **Animations** | Framer Motion, AOS |
| **Linting** | ESLint 9 |
| **PostCSS** | Autoprefixer |

## 🚀 Monorepo Architecture & Quick Start

This project is organized as an **npm workspaces Monorepo** where the frontend and backend can run simultaneously in development and on a **single unified server** in production:

```
KoreanWeb/ (Monorepo Root)
├── package.json              # Workspaces orchestrator + concurrently scripts
├── README.md
├── client/                   # Frontend Workspace (React 19 + Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   ├── public/
│   └── src/
└── server/                   # Backend Workspace (Node.js + Express + MongoDB)
    ├── .env
    ├── .env.example
    ├── nodemon.json
    ├── package.json
    ├── server.js             # API routes + static client/dist host
    ├── seed.js
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    └── routes/
```

### 🛠️ Root Scripts (Run from project root):

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs **both** Express backend (port 5000) and Vite frontend (port 5173) concurrently |
| `npm run dev:server` | Runs backend only with hot reload (nodemon) |
| `npm run dev:client` | Runs frontend only with Vite dev server |
| `npm run build` | Builds production frontend bundle into `client/dist` |
| `npm start` | **Single-Server Mode**: Boots Express to serve **both** the `/api` and the React frontend on `http://localhost:5000` |
| `npm run seed` | Seeds MongoDB with authentic Korean skincare products, admin, and sample orders |

## 🌐 Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Home / Products | No |
| `/product/:id` | Product Details | No |
| `/login` | User Login | No |
| `/signup` | User Signup | No |
| `/cart` | Shopping Cart | Yes |
| `/shipping` | Shipping Details | Yes |

## 🎨 Design System

- **Primary Color**: `#3B82F6` (Blue 500)
- **Secondary Color**: `#F59E0B` (Amber 500)
- **Accent Color**: `#10B981` (Emerald)
- **Font**: Poppins (Google Fonts)
- **Animations**: Fade-in, slide-up, bounce effects

## 🔮 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] User profiles & order history
- [ ] Wishlist/Favorites
- [ ] Product reviews & ratings
- [ ] Admin dashboard
- [ ] Search with filtering
- [ ] Email notifications
- [ ] PWA support
- [ ] Dark mode
- [ ] Internationalization (i18n)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙌 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://framer.com/motion/)
- [Headless UI](https://headlessui.com/)

---

⭐ **Star this repo if you found it helpful!**  
📢 **Made with ❤️ using React + Vite + Tailwind**
