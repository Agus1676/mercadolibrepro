'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { products, favorites, isMounted } = useApp();

  if (!isMounted) return null;

  const favoritedProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Breadcrumb / Back Link */}
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-600 flex items-center gap-1 transition-colors">
              <ArrowLeft size={10} />
              Volver al inicio
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Favoritos</h1>
              <p className="text-xs text-slate-400 mt-1">
                {favoritedProducts.length === 1
                  ? 'Tienes 1 producto guardado'
                  : `Tienes ${favoritedProducts.length} productos guardados`}
              </p>
            </div>

            {/* Empty State */}
            {favoritedProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] min-h-[350px]">
                <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center text-[#e0245e]">
                  <Heart size={28} className="stroke-2" />
                </div>
                <div className="max-w-md">
                  <h2 className="text-lg font-bold text-slate-800">Tu lista está vacía</h2>
                  <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                    ¿Viste algo que te gustó? Guardalo haciendo clic en el corazón de cada producto para tenerlo siempre a mano y seguirle el rastro.
                  </p>
                </div>
                <Link
                  href="/"
                  className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer mt-2"
                >
                  Descubrir productos
                </Link>
              </div>
            ) : (
              /* Wishlist Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {favoritedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
