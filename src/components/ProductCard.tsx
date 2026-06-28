'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Zap, Star, Heart, GitCompare } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite, toggleComparison, isInComparison } = useApp();
  const favorited = isFavorite(product.id);
  const compared = isInComparison(product.id);
  const installmentAmount = Math.round(product.price / 6);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleComparison(product.id);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-2xl p-4 flex flex-col h-full group border border-slate-200/60 premium-shadow hover:premium-shadow-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Area */}
      <div className="relative h-[240px] w-full bg-white rounded-xl p-4 flex items-center justify-center border border-slate-100 overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain max-h-full max-w-full group-hover:scale-102 transition-transform duration-300"
        />
        
        {/* Comparison Checkbox Button */}
        <button
          onClick={handleComparisonClick}
          className={`absolute top-2.5 left-2.5 p-1.5 rounded-full border transition-all hover:scale-110 shadow-sm z-10 flex items-center justify-center cursor-pointer ${
            compared
              ? 'bg-blue-50/95 border-blue-200 text-[#3483FA]'
              : 'bg-white/95 border-slate-100 text-slate-400 hover:text-[#3483FA]'
          }`}
          aria-label={compared ? "Quitar de comparación" : "Comparar producto"}
          title={compared ? "Quitar de comparación" : "Comparar producto"}
        >
          <GitCompare size={14} className="active:scale-95 duration-205" />
        </button>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/95 border border-slate-100 hover:bg-white text-slate-400 hover:text-[#e0245e] transition-all hover:scale-110 shadow-sm z-10 flex items-center justify-center"
          aria-label={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart size={14} className={`transition-all duration-205 active:scale-90 ${favorited ? 'fill-[#e0245e] text-[#e0245e]' : 'stroke-current hover:text-slate-600'}`} />
        </button>

        {product.isFull && (
          <span className="absolute bottom-2 left-2 bg-[#00A650] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm flex items-center gap-0.5 shadow-sm">
            <Zap size={8} className="fill-white" />
            Full
          </span>
        )}
      </div>

      {/* Info details */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xs sm:text-sm text-slate-700 font-medium line-clamp-2 mb-2 group-hover:text-[#3483FA] transition-colors leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={10} className="fill-amber-400 stroke-amber-400" />
            <span className="text-[10px] text-slate-500 font-bold">{product.rating}</span>
            <span className="text-[9px] text-slate-400 font-normal">({product.reviewsCount})</span>
          </div>
        )}

        {/* Pricing area */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          {/* Original price */}
          {product.originalPrice && (
            <span className="text-[10px] text-slate-400 line-through block mb-0.5">
              {formatCurrency(product.originalPrice)}
            </span>
          )}

          {/* Current price & discount */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900 group-hover:text-black transition-colors">
              {formatCurrency(product.price)}
            </span>
            {product.discount && (
              <span className="text-[10px] font-bold text-[#00A650]">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Installments */}
          <p className="text-[10px] text-[#00A650] font-semibold mt-1">
            Mismo precio en <span className="font-bold">6 cuotas de {formatCurrency(installmentAmount)}</span>
          </p>

          {/* Shipping status */}
          {product.freeShipping ? (
            <p className="text-[10px] text-[#00A650] font-bold mt-2 flex items-center gap-1">
              Envío gratis
            </p>
          ) : (
            <p className="text-[10px] text-slate-400 mt-2">
              Envío a acordar
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
