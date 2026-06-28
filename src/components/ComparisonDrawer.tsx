'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Product } from '@/types';
import { formatCurrency } from './ProductCard';
import { GitCompare, X, Star, Zap, Check, Shield } from 'lucide-react';
import Link from 'next/link';

export const ComparisonDrawer: React.FC = () => {
  const { comparisonList, products, toggleComparison, clearComparison, isMounted } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isMounted || comparisonList.length === 0) return null;

  const comparedProducts = products.filter((p) => comparisonList.includes(p.id));

  // Helper to extract technical specs from description text
  const getSpecs = (desc: string) => {
    const lines = desc.split('\n');
    const specs: { label: string; value: string }[] = [];
    
    // Parse specs lines starting with "-"
    lines.forEach(line => {
      if (line.trim().startsWith('-')) {
        const parts = line.replace(/^-/, '').split(':');
        if (parts.length >= 2) {
          specs.push({
            label: parts[0].trim(),
            value: parts.slice(1).join(':').trim()
          });
        }
      }
    });

    return specs.slice(0, 5); // Return up to 5 specs
  };

  // Collect all unique spec labels from compared products to build rows
  const allSpecLabels = Array.from(
    new Set(
      comparedProducts.flatMap(p => getSpecs(p.description).map(s => s.label))
    )
  );

  return (
    <>
      {/* Bottom Floating Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-slate-200 shadow-xl rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center gap-5 max-w-[90%] md:max-w-[700px] w-full animate-slideUp">
        <div className="flex items-center gap-3 mr-auto">
          <div className="bg-blue-50 text-[#3483FA] p-2 rounded-xl">
            <GitCompare size={20} />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Comparador ({comparisonList.length}/3)</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Compara precios, calificaciones y especificaciones</p>
          </div>
        </div>

        {/* Selected Product Thumbnails */}
        <div className="flex items-center gap-2">
          {comparedProducts.map((p) => (
            <div key={p.id} className="relative h-10 w-10 border border-slate-100 rounded-lg p-0.5 bg-white group shadow-sm">
              <img src={p.image} alt={p.title} className="object-contain h-full w-full" />
              <button
                onClick={() => toggleComparison(p.id)}
                className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-slate-900/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] cursor-pointer border-0"
                title="Quitar"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
            <div key={idx} className="h-10 w-10 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-300 bg-slate-50 text-[10px] font-bold">
              +
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setIsOpen(true)}
            disabled={comparedProducts.length < 2}
            className="flex-grow md:flex-grow-0 bg-[#3483FA] hover:bg-[#2c6fd1] disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed border-0"
          >
            Comparar ahora
          </button>
          <button
            onClick={clearComparison}
            className="text-slate-450 hover:text-red-500 text-xs font-bold px-3 py-2.5 bg-slate-50 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border-0"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Comparison Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[99] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-[1000px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <GitCompare size={20} className="text-[#3483FA]" />
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest">Comparativa de Productos</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-450 hover:text-slate-700 transition-colors border-0 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Table */}
            <div className="flex-grow overflow-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="p-4 font-bold text-slate-400 uppercase tracking-wider w-[22%] min-w-[150px] border-r border-slate-50">
                      Características
                    </th>
                    {comparedProducts.map((p) => (
                      <th key={p.id} className="p-4 align-top w-[26%] min-w-[200px] border-r border-slate-50 last:border-r-0">
                        <div className="flex flex-col gap-3">
                          <div className="h-[100px] w-full flex items-center justify-center p-2 bg-slate-50 rounded-2xl border border-slate-100">
                            <img src={p.image} alt={p.title} className="object-contain max-h-full max-w-full" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{p.category}</span>
                            <Link
                              href={`/product/${p.id}`}
                              onClick={() => setIsOpen(false)}
                              className="font-bold text-slate-800 hover:text-[#3483FA] line-clamp-2 mt-0.5 leading-snug transition-colors"
                            >
                              {p.title}
                            </Link>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Row: Price */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 border-r border-slate-50">Precio</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-r border-slate-50 last:border-r-0">
                        <span className="text-sm font-extrabold text-slate-900">{formatCurrency(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through block mt-0.5">
                            {formatCurrency(p.originalPrice)}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Rating */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 border-r border-slate-50">Calificación</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-r border-slate-50 last:border-r-0">
                        {p.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-amber-400 stroke-amber-400" />
                            <span className="font-bold text-slate-800">{p.rating}</span>
                            <span className="text-[10px] text-slate-450">({p.reviewsCount} opiniones)</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Sin calificaciones</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Envío */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 border-r border-slate-50">Envío</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-r border-slate-50 last:border-r-0">
                        {p.freeShipping ? (
                          <span className="text-[#00A650] font-bold">Gratis</span>
                        ) : (
                          <span className="text-slate-500 font-medium">A acordar</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Envío Full */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 border-r border-slate-50">Bodega Full</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-r border-slate-50 last:border-r-0">
                        {p.isFull ? (
                          <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                            <Zap size={8} className="fill-emerald-600" /> Full
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Stock */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 border-r border-slate-50">Stock Disponible</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-r border-slate-50 last:border-r-0">
                        <span className="font-semibold text-slate-800">{p.stock} unidades</span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Seller */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-700 border-r border-slate-50">Vendedor</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-r border-slate-50 last:border-r-0">
                        <span className="font-bold text-slate-700 block">{p.sellerName}</span>
                        <span className={`inline-block h-2 w-2 rounded-full mt-1.5 ${
                          p.sellerRating === 'green' ? 'bg-[#00A650]' : p.sellerRating === 'yellow' ? 'bg-amber-400' : 'bg-red-500'
                        }`} title={`Reputación: ${p.sellerRating}`} />
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic Technical Specs Rows */}
                  {allSpecLabels.map((specLabel) => (
                    <tr key={specLabel} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-700 border-r border-slate-50">{specLabel}</td>
                      {comparedProducts.map((p) => {
                        const specs = getSpecs(p.description);
                        const matchedSpec = specs.find(s => s.label === specLabel);
                        return (
                          <td key={p.id} className="p-4 border-r border-slate-50 last:border-r-0 text-slate-600">
                            {matchedSpec ? matchedSpec.value : <span className="text-slate-300">-</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-slate-900 hover:bg-black text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all border-0 cursor-pointer"
              >
                Volver a la tienda
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
