'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Zap, SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { products, isMounted } = useApp();
  
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [onlyFull, setOnlyFull] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevant' | 'priceAsc' | 'priceDesc'>('relevant');

  useEffect(() => {
    const queryLower = query.toLowerCase();
    const categories = Array.from(new Set(products.map((p) => p.category)));
    const matchedCategory = categories.find((c) => c.toLowerCase() === queryLower);
    
    if (matchedCategory) {
      setSelectedCategory(matchedCategory);
    } else {
      setSelectedCategory('');
    }
    
    setOnlyFreeShipping(false);
    setOnlyFull(false);
    setMaxPrice('');
    setSortBy('relevant');
  }, [query, products]);

  if (!isMounted) return null;

  let filtered = products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(query.toLowerCase());
    const catMatch = product.category.toLowerCase().includes(query.toLowerCase());
    const descMatch = product.description.toLowerCase().includes(query.toLowerCase());
    return titleMatch || catMatch || descMatch;
  });

  if (selectedCategory) {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (onlyFreeShipping) {
    filtered = filtered.filter((p) => p.freeShipping);
  }

  if (onlyFull) {
    filtered = filtered.filter((p) => p.isFull);
  }

  if (maxPrice !== '') {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  if (sortBy === 'priceAsc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceDesc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const allCategories = Array.from(new Set(products.map((p) => p.category)));

  const resetAllFilters = () => {
    setOnlyFreeShipping(false);
    setOnlyFull(false);
    setMaxPrice('');
    setSelectedCategory('');
    setSortBy('relevant');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar: Filters */}
      <aside className="w-full md:w-[260px] flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-5 h-fit shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
          <h2 className="font-bold text-slate-700 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <SlidersHorizontal size={14} className="text-gray-400" />
            Filtros
          </h2>
          {(onlyFreeShipping || onlyFull || maxPrice !== '' || selectedCategory !== '') && (
            <button
              onClick={resetAllFilters}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-0.5"
            >
              <RefreshCw size={8} />
              Limpiar
            </button>
          )}
        </div>

        {/* Filter: Categories */}
        <div className="mb-6">
          <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3">Categorías</h3>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setSelectedCategory('')}
              className={`text-xs text-left py-1.5 px-3 rounded-lg transition-all ${
                selectedCategory === ''
                  ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              Todas las categorías
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs text-left py-1.5 px-3 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter: Shipping */}
        <div className="mb-6 border-t border-slate-100 pt-4">
          <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3.5">Envío</h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyFreeShipping}
                onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Envío gratis</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyFull}
                onChange={(e) => setOnlyFull(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-0.5 font-semibold text-slate-700">
                Envío <span className="text-[#00A650] flex items-center font-black uppercase italic tracking-tighter"><Zap size={10} className="fill-[#00A650]" />Full</span>
              </span>
            </label>
          </div>
        </div>

        {/* Filter: Max Price */}
        <div className="border-t border-slate-100 pt-4">
          <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3">Precio Máximo</h3>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 focus-within:border-gray-300">
            <span className="text-xs text-slate-400 font-bold">$</span>
            <input
              type="number"
              placeholder="Ej: 800000"
              value={maxPrice === '' ? '' : maxPrice}
              onChange={(e) => {
                const val = e.target.value;
                setMaxPrice(val === '' ? '' : Number(val));
              }}
              className="w-full py-2 bg-transparent border-0 outline-none text-xs text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>
      </aside>

      {/* Main Results area */}
      <section className="flex-grow">
        {/* Results Info & Sorter Header */}
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
          <div>
            {query ? (
              <span>
                Resultados para "<span className="font-bold text-slate-800">{query}</span>":{' '}
                <span className="font-bold text-blue-600">{filtered.length}</span> productos.
              </span>
            ) : (
              <span>
                Mostrando todo el catálogo:{' '}
                <span className="font-bold text-blue-600">{filtered.length}</span> productos.
              </span>
            )}
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="flex items-center gap-1 font-semibold text-slate-400">
              <ArrowUpDown size={12} />
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 outline-none text-blue-600 font-bold cursor-pointer py-1 text-xs"
            >
              <option value="relevant" className="bg-white text-slate-700">Más relevantes</option>
              <option value="priceAsc" className="bg-white text-slate-700">Menor precio</option>
              <option value="priceDesc" className="bg-white text-slate-700">Mayor precio</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-800 font-extrabold text-lg mb-2">No encontramos coincidencias</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
              Te sugerimos revisar la ortografía, buscar términos más generales o eliminar filtros del lateral.
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all border-0 shadow-sm"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function SearchFallback() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-20 text-center text-slate-500 font-bold">
      Buscando productos...
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <main className="flex-grow pb-16">
        <Suspense fallback={<SearchFallback />}>
          <SearchResultsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
