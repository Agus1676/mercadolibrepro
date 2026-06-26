'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency } from '@/components/ProductCard';
import { Truck, CheckCircle2, Package, Calendar, MapPin, Zap, ArrowRight, Play, Eye } from 'lucide-react';

export default function OrdersPage() {
  const { orders, simulateDeliveryStep, isMounted } = useApp();

  if (!isMounted) return null;

  const getTruckPosition = (step: number) => {
    switch (step) {
      case 0:
        return { x: 50, y: 155 };
      case 1:
        return { x: 135, y: 110 };
      case 2:
        return { x: 245, y: 120 };
      case 3:
        return { x: 330, y: 45 };
      default:
        return { x: 50, y: 155 };
    }
  };

  const getStepLabel = (step: number) => {
    switch (step) {
      case 0:
        return 'Pago Aprobado (Preparando en depósito)';
      case 1:
        return 'En viaje (Camino al centro de distribución)';
      case 2:
        return 'En distribución (Cerca de tu domicilio)';
      case 3:
        return 'Entregado';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[1000px] mx-auto px-4">
          <h1 className="text-xl font-extrabold text-slate-800 mb-6">Mis compras</h1>

          {orders.length > 0 ? (
            <div className="flex flex-col gap-6">
              {orders.map((order) => {
                const truckPos = getTruckPosition(order.trackingStep);
                const isDelivered = order.status === 'delivered';
                
                return (
                  <div key={order.id} className="bg-white border border-slate-250/60 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    
                    {/* Header bar */}
                    <div className="p-4 bg-slate-50 border-b border-slate-200/60 flex flex-wrap justify-between items-center gap-2.5 text-[11px] text-slate-500 font-medium">
                      <div className="flex gap-4">
                        <span>
                          Fecha:{' '}
                          <span className="font-bold text-slate-700">
                            {new Date(order.date).toLocaleDateString('es-AR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </span>
                        <span>
                          Compra:{' '}
                          <span className="font-bold text-slate-700">#{order.id.split('-')[1] || order.id}</span>
                        </span>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="font-bold text-slate-700">Total: {formatCurrency(order.total)}</span>
                        <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                          isDelivered 
                            ? 'bg-[#EBF7EE] text-[#00A650] border border-green-200' 
                            : 'bg-blue-50 text-[#3483FA] border border-blue-150'
                        }`}>
                          {isDelivered ? 'Entregado' : 'En camino'}
                        </span>
                      </div>
                    </div>

                    {/* Split details & tracker */}
                    <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Items */}
                      <div className="lg:col-span-6 flex flex-col gap-4">
                        <h4 className="font-extrabold text-[10px] uppercase tracking-widest text-slate-400">Productos comprados</h4>
                        <div className="flex flex-col gap-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex gap-3.5 items-center">
                              <div className="h-12 w-12 bg-white border border-slate-100 rounded-lg p-0.5 flex items-center justify-center flex-shrink-0">
                                <img src={item.product.image} alt={item.product.title} className="object-contain max-h-full max-w-full" />
                              </div>
                              <div className="flex-grow min-w-0 text-xs">
                                <Link href={`/product/${item.product.id}`} className="font-bold text-slate-700 hover:text-[#3483FA] truncate block transition-colors leading-tight">
                                  {item.product.title}
                                </Link>
                                <p className="text-slate-400 text-[10px] mt-0.5">Cantidad: {item.quantity}</p>
                                <p className="text-[#3483FA] font-bold mt-0.5">{formatCurrency(item.product.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Ship address details */}
                        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 flex flex-col gap-3">
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-slate-400 mt-0.5" />
                            <div>
                              <p className="font-bold text-slate-700">Dirección de entrega</p>
                              <p className="text-slate-500 mt-0.5">{order.address}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Package size={14} className="text-slate-400 mt-0.5" />
                            <div>
                              <p className="font-bold text-slate-700">Método de pago</p>
                              <p className="text-slate-500 mt-0.5">{order.paymentMethod}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: GPS Map */}
                      <div className="lg:col-span-6 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-6">
                        
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-[10px] uppercase tracking-widest text-slate-400">Logística de Envío</h4>
                          {!isDelivered && (
                            <button
                              onClick={() => simulateDeliveryStep(order.id)}
                              className="flex items-center gap-1 bg-[#FFF159] hover:bg-[#ffe733] text-slate-800 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all shadow-sm border-0"
                            >
                              <Play size={10} className="fill-slate-800" />
                              Acelerar envío
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
                          <div className={`p-2 rounded-lg ${
                            isDelivered 
                              ? 'bg-emerald-50 text-[#00A650] border border-green-200' 
                              : 'bg-blue-50 text-[#3483FA] border border-blue-100'
                          } animate-pulse`}>
                            <Truck size={14} />
                          </div>
                          <div>
                            <p className="text-slate-400 text-[9px] uppercase tracking-widest font-bold leading-none mb-1">Estado de entrega</p>
                            <p className="font-bold text-slate-700">{getStepLabel(order.trackingStep)}</p>
                          </div>
                        </div>

                        {/* Interactive SVG Map */}
                        <div className="relative w-full aspect-[2/1] border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center shadow-inner">
                          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                          <svg className="w-full h-full p-4 select-none" viewBox="0 0 400 200">
                            {/* Road paths */}
                            <path
                              d="M 50 155 Q 135 110 245 120 T 330 45"
                              fill="none"
                              stroke="#E2E8F0"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 50 155 Q 135 110 245 120 T 330 45"
                              fill="none"
                              stroke={isDelivered ? '#00A650' : '#3483FA'}
                              strokeWidth="2.5"
                              strokeDasharray="5 5"
                              strokeLinecap="round"
                            />

                            {/* Node 0: Depot */}
                            <circle cx="50" cy="155" r="5" fill="#3483FA" />
                            <text x="50" y="173" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#64748B">Depósito</text>

                            {/* Node 1: Checkpoint 1 */}
                            <circle cx="135" cy="110" r="4.5" fill={order.trackingStep >= 1 ? '#3483FA' : '#94A3B8'} />

                            {/* Node 2: Checkpoint 2 */}
                            <circle cx="245" cy="120" r="4.5" fill={order.trackingStep >= 2 ? '#3483FA' : '#94A3B8'} />

                            {/* Node 3: Home Destination */}
                            <circle cx="330" cy="45" r="6.5" fill={order.trackingStep >= 3 ? '#00A650' : '#94A3B8'} className={order.trackingStep >= 3 ? 'animate-pulse' : ''} />
                            <text x="330" y="30" textAnchor="middle" fontSize="7" fontWeight="bold" fill={order.trackingStep >= 3 ? '#00A650' : '#64748B'}>Destino</text>

                            {/* Vehicle Group */}
                            <g
                              transform={`translate(${truckPos.x - 11}, ${truckPos.y - 11})`}
                              className="transition-all duration-1000 ease-in-out"
                            >
                              <rect width="22" height="22" rx="6" fill="#FFF159" className="shadow-md border border-yellow-400" />
                              <svg width="12" height="12" x="5" y="5" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13" />
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                <circle cx="5.5" cy="18.5" r="2.5" />
                                <circle cx="18.5" cy="18.5" r="2.5" />
                              </svg>
                            </g>
                          </svg>

                          <span className="absolute bottom-2.5 left-2.5 text-[7px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-extrabold uppercase tracking-widest">
                            LOGÍSTICA EXPRESO GPS
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <p className="text-slate-800 font-extrabold text-lg mb-2">No registrás compras todavía</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
                Tus compras completadas aparecerán acá junto con el mapa de seguimiento GPS.
              </p>
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-colors border-0"
              >
                Buscar productos para comprar
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
