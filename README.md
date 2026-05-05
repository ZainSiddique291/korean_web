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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (Recommended: 20+)

### Installation
```bash
# Clone the repo (or navigate to project directory)
cd ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev     # Start dev server (localhost:5173)
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## 📁 Project Structure

```
ecommerce/
├── public/
│   └── vite.svg
├── src/
│   ├── Components/      # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Products.jsx
│   │   └── Filters.jsx
│   ├── context/         # App-wide state management
│   │   └── AppContext.jsx
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── CartPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── ProductDetailPage.jsx
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
├── package.json
└── README.md
```

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
