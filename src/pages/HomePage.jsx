import Hero from '../Components/Hero';
import Filters from '../Components/Filters';
import Products from '../Components/Products';

const HomePage = () => (
  <div>
    <Hero />
    <section id="products" className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Our Products</h2>
      <p className="text-gray-500 text-center mb-8">Browse our curated collection</p>
      <Filters />
      <Products />
    </section>
  </div>
);
export default HomePage;
