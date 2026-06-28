'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency } from '@/components/ProductCard';
import { Truck, CheckCircle2, Package, Calendar, MapPin, Zap, ArrowRight, Play, Eye, X } from 'lucide-react';
import { Order } from '@/types';

export default function OrdersPage() {
  const { orders, simulateDeliveryStep, isMounted } = useApp();
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <main className="flex-grow pb-16 pt-6">
          <div className="max-w-[1000px] mx-auto px-4 animate-pulse">
            <div className="h-7 w-40 bg-slate-250 rounded mb-6"></div>
            <div className="flex flex-col gap-6">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl h-[240px] p-5 flex flex-col gap-4">
                  <div className="h-10 bg-slate-100 rounded w-full"></div>
                  <div className="flex gap-4 items-center mt-2">
                    <div className="h-12 w-12 bg-slate-100 rounded-lg"></div>
                    <div className="flex-grow flex flex-col gap-2">
                      <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
    <>
      <div className="flex flex-col min-h-screen bg-[#F5F7FA] print:hidden">
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
                        
                        {/* Printable Invoice Button */}
                        <button
                          onClick={() => {
                            setSelectedInvoiceOrder(order);
                            setIsInvoiceOpen(true);
                          }}
                          className="flex items-center gap-1 hover:text-[#3483FA] text-slate-500 transition-colors font-bold text-[10px] cursor-pointer bg-slate-100 hover:bg-slate-200/60 px-2 py-1 rounded border-0"
                          title="Ver Factura de Compra"
                        >
                          <Eye size={11} />
                          Factura
                        </button>

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

    {/* Invoice modal outside wrapper for clean printing */}
    {isInvoiceOpen && selectedInvoiceOrder && (
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 overflow-y-auto print:fixed print:inset-0 print:bg-white print:p-0 print:z-[9999] animate-fadeIn animate-duration-200">
        <div className="bg-white rounded-3xl w-full max-w-[650px] shadow-2xl p-6 md:p-8 flex flex-col gap-6 print:rounded-none print:shadow-none print:p-0 print:max-w-none print:w-full print:h-full">
          
          {/* Header / Actions (Hidden on print) */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 print:hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Factura de Compra</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer border-0"
              >
                Imprimir Factura
              </button>
              <button
                onClick={() => setIsInvoiceOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-450 hover:text-slate-700 transition-colors border-0 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Invoice Sheet */}
          <div className="flex flex-col gap-6 font-sans text-slate-800">
            {/* Top info grid */}
            <div className="flex justify-between border-b border-slate-200 pb-6 items-start">
              {/* Logo & Company info */}
              <div>
                <h2 className="font-black text-xl italic text-slate-900 tracking-tighter leading-none">
                  mercado<span className="text-[#3483FA] not-italic">libre</span>
                </h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">pro e-commerce</p>
                <p className="text-[10px] text-slate-400 mt-2.5">MercadoLibre Pro S.R.L.</p>
                <p className="text-[10px] text-slate-450">Av. Caseros 3039, Parque Patricios, CABA</p>
                <p className="text-[10px] text-slate-450">CUIT: 30-70304910-9</p>
                <p className="text-[10px] text-slate-450">IVA Responsable Inscripto</p>
              </div>

              {/* Invoice Meta */}
              <div className="text-right">
                <div className="inline-block border-2 border-slate-900 px-3 py-1 font-black text-lg text-slate-905 mb-2 leading-none">
                  B
                </div>
                <p className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">FACTURA DE COMPRA</p>
                <p className="text-[10px] text-slate-450 mt-1">Nº 0005-00084729</p>
                <p className="text-[10px] text-slate-450">Fecha: {new Date(selectedInvoiceOrder.date).toLocaleDateString('es-AR')}</p>
                <p className="text-[10px] text-slate-450">CUIT País: 30-70304910-9</p>
              </div>
            </div>

            {/* Client & Billing Info */}
            <div className="grid grid-cols-2 justify-between border-b border-slate-100 pb-5 text-[10px]">
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider mb-1.5">Cliente</p>
                <p className="font-extrabold text-slate-850 text-xs">Agustin Pollan</p>
                <p className="text-slate-500 mt-0.5">Domicilio: {selectedInvoiceOrder.address}</p>
                <p className="text-slate-500">Condición frente al IVA: Consumidor Final</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-400 uppercase tracking-wider mb-1.5">Pago y Envío</p>
                <p className="text-slate-500"><span className="font-semibold text-slate-700">Método:</span> {selectedInvoiceOrder.paymentMethod}</p>
                <p className="text-slate-500 mt-0.5"><span className="font-semibold text-slate-700">Logística:</span> Mercado Envíos Express</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left text-[10px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[9px] bg-slate-50/50">
                  <th className="py-2.5 px-3">Detalle del Producto</th>
                  <th className="py-2.5 px-3 text-center">Cant.</th>
                  <th className="py-2.5 px-3 text-right">Unitario</th>
                  <th className="py-2.5 px-3 text-right">Importe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoiceOrder.items.map((item) => (
                  <tr key={item.product.id} className="text-slate-700">
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-850">{item.product.title}</span>
                      <span className="block text-[8px] text-slate-400 mt-0.5">Categoría: {item.product.category}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 px-3 text-right">{formatCurrency(item.product.price)}</td>
                    <td className="py-3 px-3 text-right font-bold">{formatCurrency(item.product.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Breakdown */}
            <div className="flex flex-col items-end gap-1.5 border-t border-slate-200 pt-5 mt-3">
              <div className="flex justify-between w-[200px] text-[10px] text-slate-400">
                <span>Subtotal Neto:</span>
                <span>{formatCurrency(selectedInvoiceOrder.total / 1.21)}</span>
              </div>
              <div className="flex justify-between w-[200px] text-[10px] text-slate-400">
                <span>Alícuota IVA (21%):</span>
                <span>{formatCurrency(selectedInvoiceOrder.total - (selectedInvoiceOrder.total / 1.21))}</span>
              </div>
              <div className="flex justify-between w-[200px] text-xs font-black text-slate-900 border-t border-slate-100 pt-2 mt-1">
                <span>Total Facturado:</span>
                <span>{formatCurrency(selectedInvoiceOrder.total)}</span>
              </div>
            </div>

            {/* Barcode & Signature */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-5">
              <div>
                {/* Mock Barcode */}
                <div className="h-6 w-48 bg-slate-50 border-r border-l border-slate-350 flex items-center justify-between px-2 font-mono text-[7px] text-slate-400 tracking-[3px] select-none">
                  ||||| | |||| ||| || | ||||| | ||
                </div>
                <span className="text-[7px] text-slate-400 block mt-1 tracking-wider text-center w-48 font-semibold">
                  (01)077983049109(10)000500084729
                </span>
              </div>
              <div className="text-right text-[8px] text-slate-400 italic">
                CAE Nº: 74258903429185<br />
                Vencimiento CAE: {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR')}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )}
  </>
);
}
