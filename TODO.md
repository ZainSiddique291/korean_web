# Error Removal & Modernization TODO

## Status: [In Progress]

### Plan Steps:
1. [✅] Create new ProductContext.jsx for products/data/filter/loading/search (migrate from legacy Data).
2. [✅] Update main.jsx to include ProductProvider wrapping App (fixed JSX nesting).
3. [✅] Migrate & fix Cart.jsx to use useCart/useAuth, remove console/logs, fix updates.
4. [ ] Migrate & fix Shipping.jsx to use useCart/useAuth/useProduct, fix conditionals/consoles.
5. [ ] Migrate Filters.jsx, FetchProducts.jsx, Products.jsx to useProductContext, remove consoles/disable.
6. [✅] Update CartPage.jsx to render Cart component properly.
7. [✅] Update ShippingPage.jsx to render Shipping component properly.
8. [ ] Migrate other legacy users (ProductDetails, Login, SignUp, MsgBox, etc.) to new contexts.
9. [ ] Delete legacy ContextApi/Data/ProviderComp.
10. [ ] Fix throw error messages in contexts.
11. [ ] Run `npm run lint` verify clean.
12. [ ] Test UI: login/signup, add to cart, shipping, products fetch/filter.

Next: ProductContext creation.

