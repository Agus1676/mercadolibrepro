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

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <main className="flex-grow pb-16 pt-6">
          <div className="max-w-[1000px] mx-auto px-4 animate-pulse">
            <div className="h-6 w-48 bg-slate-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="h-[250px] bg-white border border-slate-200 rounded-2xl"></div>
              </div>
              <div className="lg:col-span-4 h-[200px] bg-white border border-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[1000px] mx-auto px-4">
          <h1 className="text-xl font-extrabold text-slate-800 mb-6">Carrito de compras</h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Items */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                
                {/* Items List container */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Productos agregados
                  </div>

                  <div className="divide-y divide-slate-100">
                    {cart.map((item) => {
                      const totalItemPrice = item.product.price * item.quantity;
                      return (
                        <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {/* Image */}
                          <Link href={`/product/${item.product.id}`} className="h-16 w-16 flex-shrink-0 bg-white p-1 border border-slate-100 rounded-xl flex items-center justify-center">
                            <img src={item.product.image} alt={item.product.title} className="object-contain max-h-full max-w-full" />
                          </Link>

                          {/* Details */}
                          <div className="flex-grow flex flex-col gap-1 min-w-0">
                            <Link href={`/product/${item.product.id}`} className="text-xs sm:text-sm text-slate-800 font-bold hover:text-[#3483FA] transition-colors truncate block">
                              {item.product.title}
                            </Link>
                            <span className="text-[9px] text-slate-400">Vendido por {item.product.sellerName}</span>
                            
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[10px] text-red-500 hover:text-red-650 font-bold flex items-center gap-1 mt-2.5 hover:underline text-left w-max transition-colors border-0 bg-transparent cursor-pointer"
                            >
                              <Trash2 size={11} />
                              Eliminar
                            </button>
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2.5 self-end sm:self-auto">
                            <div className="flex items-center border border-slate-250 rounded-lg bg-slate-50">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 border-0 bg-transparent cursor-pointer"
                              >
                                <Minus size={9} />
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-700">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 disabled:opacity-20 border-0 bg-transparent cursor-pointer"
                              >
                                <Plus size={9} />
                              </button>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono">({item.product.stock} disp.)</span>
                          </div>

                          {/* Total item price */}
                          <div className="text-right sm:min-w-[120px] self-end sm:self-auto mt-2 sm:mt-0">
                            <p className="text-sm font-bold text-slate-800">{formatCurrency(totalItemPrice)}</p>
                            <p className="text-[9px] text-slate-400">({formatCurrency(item.product.price)} c/u)</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Promo Alert */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs text-slate-500 flex items-center gap-3 shadow-sm">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg border border-blue-200">
                    <Sparkles size={14} className="animate-pulse" />
                  </div>
                  <span>
                    ¿Tenés cupones? Ingresá el cupón de pruebas <span className="font-bold text-blue-600 font-mono bg-blue-100/50 px-1.5 py-0.5 rounded border border-blue-200/65">`MELIPRO10`</span> para aplicar un 10% de descuento.
                  </span>
                </div>
              </div>

              {/* Right Column: Summary Box */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                
                <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm text-xs">
                  <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3.5 uppercase tracking-wider">
                    Resumen de compra
                  </h3>

                  <div className="flex flex-col gap-3.5 border-b border-slate-100 pb-4">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal ({cart.length} productos)</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span className="flex items-center gap-1"><Ticket size={12} /> Descuento (10%)</span>
                        <span>- {formatCurrency(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>Envío</span>
                      {isFreeShipping ? (
                        <span className="text-[#00A650] font-bold">✓ Gratis</span>
                      ) : (
                        <span className="text-slate-400">A acordar</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>Total</span>
                    <span className="text-lg text-slate-900 font-extrabold">{formatCurrency(total)}</span>
                  </div>

                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2 mt-2 pt-4 border-t border-slate-100">
                    <label className="text-slate-500 font-bold">¿Tenés un cupón?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ej: MELIPRO10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                        className="flex-grow px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-xs text-slate-800 outline-none focus:border-blue-500/30 disabled:opacity-50 font-mono font-medium"
                      />
                      <button
                        type="submit"
                        disabled={couponApplied || !couponCode.trim()}
                        className="bg-slate-50 hover:bg-slate-100 disabled:opacity-30 border border-slate-200 text-slate-650 font-bold px-3 rounded-lg transition-all text-[10px] cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Cupón aplicado correctamente.</p>
                    )}
                    {couponError && (
                      <p className="text-[10px] text-red-500 font-bold mt-1">Cupón inválido. Intentá con MELIPRO10.</p>
                    )}
                  </form>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    className="w-full bg-[#3483FA] hover:bg-[#2c6fd1] text-white text-center font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all mt-4 flex items-center justify-center gap-1.5 border-0 group"
                  >
                    Continuar compra
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform animate-pulse" />
                  </Link>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center mt-2.5">
                    <ShieldCheck size={14} className="text-[#00A650]" />
                    <span>Compra Protegida por MercadoLibre Pro</span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <p className="text-slate-800 font-extrabold text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
                Tenemos los mejores productos tecnológicos esperándote. ¡Explorá el inicio y cargá tu carrito!
              </p>
              <Link
                href="/"
                className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-all border-0 inline-block"
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
