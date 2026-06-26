'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency } from '@/components/ProductCard';
import { ShieldCheck, Lock, CreditCard as CardIcon, Loader2, Check } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, createOrder, isMounted } = useApp();

  const [email, setEmail] = useState('agustinpollanceo@gmail.com');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('AGUSTIN POLLAN');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState('6');
  const [address, setAddress] = useState('Av. Cabildo 2200, Belgrano, CABA');

  const [isFlipped, setIsFlipped] = useState(false);
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'generic'>('generic');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isMounted && cart.length === 0 && !isSuccess) {
      router.push('/cart');
    }
  }, [cart, isMounted, router, isSuccess]);

  if (!isMounted) return null;

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\s+/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    return 'generic';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    setCardType(detectCardType(input));
    
    const limited = input.slice(0, 16);
    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const limited = input.slice(0, 4);
    let formatted = limited;
    if (limited.length > 2) {
      formatted = `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
    setExpiry(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const maxDigits = cardType === 'amex' ? 4 : 3;
    setCvv(input.slice(0, maxDigits));
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !cardNumber || !cardName || !expiry || !cvv) {
      alert('Por favor, completa todos los datos de pago.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const finalPaymentMethod = `Tarjeta de ${cardType.toUpperCase()} (terminada en ${cardNumber.slice(-4)})`;
      createOrder(finalPaymentMethod, address);

      setTimeout(() => {
        router.push('/orders');
      }, 2500);
    }, 2500);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal;
  const installmentCost = Math.round(total / parseInt(installments));

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[900px] mx-auto px-4">
          <h1 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-1.5">
            <Lock size={18} className="text-slate-500" />
            Finalizar compra (Mercado Pago)
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Form & Card */}
            <div className="md:col-span-7 flex flex-col gap-6">
              
              {/* Card visual */}
              <div className="w-full flex justify-center py-2">
                <div className="w-[320px] h-[190px] [perspective:1000px] select-none">
                  <div
                    className={`relative w-full h-full rounded-2xl shadow-lg transition-transform duration-700 [transform-style:preserve-3d] ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white flex flex-col justify-between [backface-visibility:hidden] border border-slate-800 shadow-xl">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <div className="w-10 h-7 bg-amber-400 rounded-md border border-amber-350"></div>
                        </div>
                        <div className="text-right font-black uppercase italic tracking-tighter text-xs">
                          {cardType === 'visa' && <span className="text-[#3483FA] text-lg font-bold">VISA</span>}
                          {cardType === 'mastercard' && <span className="text-red-500 text-lg font-bold">MasterCard</span>}
                          {cardType === 'amex' && <span className="text-emerald-400 text-lg font-bold">AMEX</span>}
                          {cardType === 'generic' && <span className="text-gray-400 text-xs font-semibold uppercase">Tarjeta</span>}
                        </div>
                      </div>

                      <div className="text-lg tracking-[0.2em] font-mono text-center my-2 text-slate-100">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between text-[10px] tracking-wider">
                        <div className="flex flex-col gap-0.5 max-w-[70%]">
                          <span className="text-[8px] text-slate-500 uppercase font-black">Titular</span>
                          <span className="font-bold truncate uppercase">{cardName || 'JUAN PEREZ'}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] text-slate-500 uppercase font-black">Venc.</span>
                          <span className="font-bold">{expiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] border border-slate-800 shadow-xl">
                      <div className="h-10 w-full bg-slate-950 mt-4"></div>
                      
                      <div className="px-5 py-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-grow bg-slate-250 h-8 rounded-md flex items-center justify-end px-3">
                            <span className="font-mono text-slate-900 font-bold text-sm tracking-widest">{cvv || '•••'}</span>
                          </div>
                          <span className="text-[8px] text-slate-400 uppercase font-bold pl-3 leading-tight">Cód. Seguridad</span>
                        </div>
                      </div>

                      <div className="p-3 text-[8px] text-slate-600 text-center leading-none italic font-mono">
                        MercadoLibre Pro Demo Card
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handlePay} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4 text-xs font-semibold text-slate-700">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">Correo electrónico para la factura</label>
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFlipped(false)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-800"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">Número de tarjeta</label>
                  <div className="relative flex items-center border border-slate-200 focus-within:border-blue-500 rounded-lg bg-slate-50">
                    <CardIcon className="text-slate-400 absolute left-3" size={14} />
                    <input
                      type="text"
                      placeholder="4517 8400 1234 5678"
                      required
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      onFocus={() => setIsFlipped(false)}
                      className="w-full pl-10 pr-3 py-2.5 bg-transparent outline-none text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">Nombre del titular</label>
                  <input
                    type="text"
                    placeholder="JUAN PEREZ"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    onFocus={() => setIsFlipped(false)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-800 uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-600">Vencimiento</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      value={expiry}
                      onChange={handleExpiryChange}
                      onFocus={() => setIsFlipped(false)}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-center text-slate-800 font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-600">Código de seguridad (CVV)</label>
                    <input
                      type="password"
                      placeholder="•••"
                      required
                      value={cvv}
                      onChange={handleCvvChange}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-center text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-4 mt-1">
                  <label className="text-slate-600">Dirección de entrega</label>
                  <input
                    type="text"
                    placeholder="Av. Cabildo 2200, Belgrano, CABA"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={() => setIsFlipped(false)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-800"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">Cuotas</label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    onFocus={() => setIsFlipped(false)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-700 cursor-pointer"
                  >
                    <option value="1">1 cuota de {formatCurrency(total)} (sin interés)</option>
                    <option value="3">3 cuotas de {formatCurrency(Math.round(total / 3))} (sin interés)</option>
                    <option value="6">6 cuotas de {formatCurrency(Math.round(total / 6))} (sin interés)</option>
                    <option value="12">12 cuotas de {formatCurrency(Math.round(total / 12 * 1.1))} (con interés)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white text-xs sm:text-sm font-bold py-3.5 rounded-xl shadow-sm transition-all mt-3 w-full border-0"
                >
                  Confirmar Pago
                </button>
              </form>

            </div>

            {/* Right Column: Summaries */}
            <div className="md:col-span-5 flex flex-col gap-4">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm text-xs">
                <h3 className="font-bold text-sm text-slate-750 border-b border-slate-100 pb-3 uppercase tracking-wide">
                  Resumen de compra
                </h3>

                <div className="flex flex-col gap-4 max-h-[220px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 items-center">
                      <div className="h-10 w-10 bg-white border border-slate-100 rounded-lg p-0.5 flex items-center justify-center flex-shrink-0">
                        <img src={item.product.image} alt={item.product.title} className="object-contain max-h-full max-w-full" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-medium text-slate-700 truncate">{item.product.title}</p>
                        <p className="text-slate-400 text-[10px]">Cantidad: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-slate-800 whitespace-nowrap">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary Totals */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Productos ({cart.length})</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Envío</span>
                    <span className="text-[#00A650] font-bold">Gratis</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-800 border-t border-slate-100 pt-3 mt-1">
                    <span>Total a pagar</span>
                    <span className="text-base text-slate-900">{formatCurrency(total)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic text-center mt-1">
                    {installments === '1' ? '1 pago' : `${installments} pagos`} de {formatCurrency(installmentCost)}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center text-gray-800">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center max-w-xs text-center shadow-2xl animate-fade-in text-slate-700">
            <Loader2 size={36} className="text-[#3483FA] animate-spin mb-4" />
            <h3 className="font-bold text-base mb-1 text-slate-800">Procesando pago</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Estamos validando la transacción de forma segura con Mercado Pago. No cierres esta ventana.
            </p>
          </div>
        </div>
      )}

      {/* Success Tick Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 bg-[#F5F7FA] z-50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center p-8 max-w-sm text-center">
            
            <div className="h-20 w-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 mb-6 scale-up-checkmark animate-bounce">
              <Check size={36} className="stroke-[4.5]" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 mb-2">¡Pago Aprobado!</h2>
            <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest mb-3">
              Transacción Exitosa
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tu compra ha sido procesada. Te estamos redirigiendo a tus pedidos para realizar el seguimiento logístico en tiempo real.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
