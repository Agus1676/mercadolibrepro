'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency } from '@/components/ProductCard';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Ticket, Sparkles } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, isMounted } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  if (!isMounted) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;
  const freeShippingCount = cart.filter((item) => item.product.freeShipping).length;
  const isFreeShipping = cart.length > 0 && freeShippingCount === cart.length;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'MELIPRO10') {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[1000px] mx-auto px-4">
          <h1 className="text-xl font-extrabold text-slate-100 mb-6">Carrito de compras</h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Items */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                
                {/* Items List container */}
                <div className="glass-panel border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-4 bg-slate-950/60 border-b border-slate-900 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Productos agregados
                  </div>

                  <div className="divide-y divide-slate-900">
                    {cart.map((item) => {
                      const totalItemPrice = item.product.price * item.quantity;
                      return (
                        <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {/* Image */}
                          <Link href={`/product/${item.product.id}`} className="h-16 w-16 flex-shrink-0 bg-slate-950/60 p-1 border border-slate-900 rounded-xl flex items-center justify-center">
                            <img src={item.product.image} alt={item.product.title} className="object-contain max-h-full max-w-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
                          </Link>

                          {/* Details */}
                          <div className="flex-grow flex flex-col gap-1 min-w-0">
                            <Link href={`/product/${item.product.id}`} className="text-xs sm:text-sm text-slate-200 font-semibold hover:text-yellow-400 transition-colors truncate block">
                              {item.product.title}
                            </Link>
                            <span className="text-[9px] text-slate-500">Vendido por {item.product.sellerName}</span>
                            
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1 mt-2.5 hover:underline text-left w-max transition-colors"
                            >
                              <Trash2 size={11} />
                              Eliminar
                            </button>
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2.5 self-end sm:self-auto">
                            <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-slate-900 text-slate-400"
                              >
                                <Minus size={9} />
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-200">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="p-1.5 hover:bg-slate-900 text-slate-400 disabled:opacity-20"
                              >
                                <Plus size={9} />
                              </button>
                            </div>
                            <span className="text-[9px] text-slate-500 font-mono">({item.product.stock} disp.)</span>
                          </div>

                          {/* Total item price */}
                          <div className="text-right sm:min-w-[120px] self-end sm:self-auto mt-2 sm:mt-0">
                            <p className="text-sm font-bold text-slate-200">{formatCurrency(totalItemPrice)}</p>
                            <p className="text-[9px] text-slate-500">({formatCurrency(item.product.price)} c/u)</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Promo Alert */}
                <div className="glass-panel border-blue-500/10 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-3 shadow-md shadow-blue-500/1">
                  <div className="bg-[#3483FA]/10 p-2 rounded-lg text-[#3483FA] border border-blue-500/10">
                    <Sparkles size={14} className="animate-pulse" />
                  </div>
                  <span>
                    ¿Tenés cupones? Ingresá el cupón de pruebas <span className="font-bold text-yellow-400 font-mono bg-yellow-400/5 px-1.5 py-0.5 rounded border border-yellow-400/10">`MELIPRO10`</span> para aplicar un 10% de descuento.
                  </span>
                </div>
              </div>

              {/* Right Column: Summary Box */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                
                <div className="glass-panel border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4 shadow-lg text-xs">
                  <h3 className="font-bold text-sm text-slate-200 border-b border-slate-900 pb-3.5 uppercase tracking-wider">
                    Resumen de compra
                  </h3>

                  <div className="flex flex-col gap-3.5 border-b border-slate-900 pb-4">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal ({cart.length} productos)</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span className="flex items-center gap-1"><Ticket size={12} /> Descuento (10%)</span>
                        <span>- {formatCurrency(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>Envío</span>
                      {isFreeShipping ? (
                        <span className="text-yellow-400 font-bold">✓ Gratis</span>
                      ) : (
                        <span className="text-slate-500">A acordar</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-slate-100">
                    <span>Total</span>
                    <span className="text-lg text-white">{formatCurrency(total)}</span>
                  </div>

                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2 mt-2 pt-4 border-t border-slate-900">
                    <label className="text-slate-400 font-bold">¿Tenés un cupón?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ej: MELIPRO10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                        className="flex-grow px-3 py-2 border border-slate-800 rounded-lg bg-slate-950 text-xs text-white outline-none focus:border-yellow-400/25 placeholder-slate-600 disabled:opacity-50 font-mono"
                      />
                      <button
                        type="submit"
                        disabled={couponApplied || !couponCode.trim()}
                        className="bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-800 text-slate-300 font-bold px-3 rounded-lg transition-colors text-[10px]"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-[10px] text-emerald-400 font-bold mt-1">✓ Cupón aplicado correctamente.</p>
                    )}
                    {couponError && (
                      <p className="text-[10px] text-red-400 font-bold mt-1">Cupón inválido. Intentá con MELIPRO10.</p>
                    )}
                  </form>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-center font-black py-3.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all mt-4 flex items-center justify-center gap-1.5 border-0 group"
                  >
                    Continuar compra
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center mt-2.5">
                    <ShieldCheck size={14} className="text-[#00A650]" />
                    <span>Compra Protegida por MercadoLibre Pro</span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="glass-panel border-slate-800/80 rounded-2xl p-12 text-center shadow-lg">
              <p className="text-slate-200 font-extrabold text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-8 leading-relaxed">
                Tenemos los mejores productos tecnológicos esperándote. ¡Explorá el inicio y cargá tu carrito!
              </p>
              <Link
                href="/"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-md transition-colors border-0"
              >
                Volver a la tienda
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
