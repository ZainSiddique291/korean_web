import { useApp } from '../context/AppContext';

const CATS = [
  { id:1, label:'All', value:'all' }, { id:2, label:'Smartphones', value:'smartphones' },
  { id:3, label:'Laptops', value:'laptops' }, { id:4, label:'Fragrances', value:'fragrances' },
  { id:5, label:'Beauty', value:'beauty' }, { id:6, label:'Groceries', value:'groceries' },
  { id:7, label:'Furniture', value:'furniture' }, { id:8, label:'Kitchen', value:'kitchen-accessories' },
];

const Filters = () => {
  const { filter, setFilter } = useApp();
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-16">
      {CATS.map(c => (
        <button key={c.id} onClick={() => setFilter(c.value)}
          className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${filter === c.value ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-500'}`}>
          {c.label}
        </button>
      ))}
    </div>
  );
};
export default Filters;
