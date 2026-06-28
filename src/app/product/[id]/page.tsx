'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency } from '@/components/ProductCard';
import { Zap, Shield, RotateCcw, Award, Star, MessageSquare, MapPin, Check, Plus, Minus, Send, Heart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { products, addToCart, addQuestionToProduct, user, toggleFavorite, isFavorite, isMounted } = useApp();
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  const favorited = product ? isFavorite(product.id) : false;
  const [quantity, setQuantity] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [shippingDays, setShippingDays] = useState(1);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isMounted) return;
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setActiveImage(found.image);
      setGalleryIndex(0);
    }
  }, [id, products, isMounted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsGalleryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isMounted) return null;

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-12 text-slate-500 font-bold">
          Producto no encontrado
        </main>
        <Footer />
      </div>
    );
  }

  const installmentAmount = Math.round(product.price / 6);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleZipCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      const code = parseInt(zipCode) || 1000;
      const days = (code % 3) + 1;
      setShippingDays(days);
      setShippingCalculated(true);
    }
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestionText.trim()) {
      addQuestionToProduct(product.id, newQuestionText.trim());
      setNewQuestionText('');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !product) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${activeImage || product.image})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[1200px] mx-auto px-4">
          
          {/* Back link */}
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-4">
            Volver al listado | <span className="text-slate-600">{product.category}</span>
          </div>

          {/* Main Grid */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Column 1 */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Image Area */}
                {(() => {
                  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
                  return (
                    <div className="w-full md:w-[62%] flex flex-col sm:flex-row gap-4">
                      {/* Vertical Thumbnails List */}
                      <div className="flex sm:flex-col gap-2 order-2 sm:order-1 justify-center sm:justify-start">
                        {productImages.map((imgUrl: string, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveImage(imgUrl);
                              setGalleryIndex(idx);
                            }}
                            className={`h-14 w-14 border-2 rounded-xl p-1 bg-white transition-all cursor-pointer overflow-hidden flex items-center justify-center flex-shrink-0 ${
                              activeImage === imgUrl ? 'border-[#3483FA]' : 'border-slate-200 hover:border-slate-350'
                            }`}
                          >
                            <img src={imgUrl} alt={`thumb-${idx}`} className="object-contain max-h-full max-w-full" />
                          </button>
                        ))}
                      </div>

                      {/* Main Display Image */}
                      <div className="flex-grow order-1 sm:order-2 flex flex-col gap-4">
                        <div 
                          className="relative h-[400px] w-full border border-slate-200/60 rounded-2xl bg-white p-4 flex items-center justify-center cursor-zoom-in overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => setIsGalleryOpen(true)}
                        >
                          <img
                            ref={imageRef}
                            src={activeImage || product.image}
                            alt={product.title}
                            className="object-contain max-h-full max-w-full"
                          />
                          <div 
                            className="absolute inset-0 pointer-events-none border border-blue-400/20 bg-no-repeat transition-opacity duration-150 rounded-xl"
                            style={zoomStyle}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Specs Summary */}
                <div className="flex-grow flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Nuevo | {product.reviewsCount * 4} vendidos</span>
                  <h1 className="text-xl font-extrabold text-slate-800 mt-1 leading-snug">{product.title}</h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2 mb-4">
                    <Star size={12} className="fill-amber-400 stroke-amber-400" />
                    <span className="text-xs text-slate-700 font-bold">{product.rating}</span>
                    <span className="text-[10px] text-slate-400">({product.reviewsCount} opiniones)</span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex flex-col gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-50 text-blue-600 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-blue-100">Oficial</span>
                      <span>Garantía oficial de fábrica por 12 meses.</span>
                    </div>
                    {product.isFull && (
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5"><Zap size={8} className="fill-emerald-600" />Full</span>
                        <span>Se despacha protegido desde las bodegas de la plataforma.</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Description */}
              <div className="border-t border-slate-100 pt-6">
                <h2 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4">Descripción</h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Q&A */}
              <div className="border-t border-slate-100 pt-6">
                <h2 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4">Preguntas y respuestas</h2>
                
                {/* Form */}
                <form onSubmit={handleAskQuestion} className="flex gap-2.5 mb-6">
                  <input
                    type="text"
                    placeholder="Preguntale al vendedor..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-500/50 placeholder-slate-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white font-bold text-xs px-5 rounded-xl shadow-sm transition-all flex items-center gap-1 border-0"
                  >
                    <Send size={11} />
                    Preguntar
                  </button>
                </form>

                {/* Questions List */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1">Últimas preguntas</h3>
                  {product.questions.length > 0 ? (
                    <div className="flex flex-col gap-4 text-xs">
                      {product.questions.map((q: any) => (
                        <div key={q.id} className="flex flex-col gap-1.5 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-800 font-medium leading-relaxed">{q.text}</span>
                          </div>
                          {q.answer ? (
                            <div className="flex items-start gap-2 pl-4 text-slate-500 border-l-2 border-slate-200">
                              <span className="text-[10px] text-yellow-500 mt-0.5">↳</span>
                              <p className="leading-relaxed">
                                {q.answer}{' '}
                                <span className="text-[9px] text-slate-400 pl-1">
                                  ({new Date(q.date).toLocaleDateString()})
                                </span>
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 pl-4 text-slate-400 italic text-[11px]">
                              <span className="animate-pulse inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                              <span>Esperando respuesta de la tienda...</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No hay preguntas registradas todavía.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Column 2: Buy panel */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              
              {addedToCartToast && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs font-bold text-emerald-600 shadow-sm">
                  <Check size={14} className="bg-[#00A650] text-white rounded-full p-0.5" />
                  <span>¡Producto agregado al carrito!</span>
                </div>
              )}

              {/* Main Buy Box */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                
                <div className="flex lg:hidden flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Nuevo | {product.reviewsCount * 4} vendidos</span>
                  <h1 className="text-base font-bold text-slate-800 mt-1">{product.title}</h1>
                </div>

                {/* Price */}
                <div>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-extrabold text-slate-850">
                      {formatCurrency(product.price)}
                    </span>
                    {product.discount && (
                      <span className="text-[10px] font-bold text-[#00A650] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    Pagá en <span className="font-bold text-[#00A650]">6 cuotas de {formatCurrency(installmentAmount)} sin interés</span>
                  </p>
                </div>

                {/* Shipping */}
                <div className="flex flex-col gap-2 text-xs border-t border-b border-slate-100 py-4">
                  {product.freeShipping ? (
                    <div>
                      <p className="text-[#00A650] font-bold flex items-center gap-1">
                        Envío gratis a todo el país
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Llega gratis mañana por Mercado Envíos.
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-500">Envío a acordar con el vendedor.</p>
                  )}

                  {/* Zip Calculator */}
                  <form onSubmit={handleZipCalculate} className="flex gap-2 mt-2">
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg w-full focus-within:border-gray-300">
                      <MapPin size={12} className="text-slate-400 absolute left-2.5" />
                      <input
                        type="text"
                        placeholder="Código Postal (ej. 1425)"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="pl-7 pr-2 py-1.5 bg-transparent outline-none w-full text-xs text-slate-700 placeholder-slate-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold px-3 rounded-lg text-xs transition-colors"
                    >
                      Calcular
                    </button>
                  </form>

                  {shippingCalculated && (
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2 text-[11px]">
                      <p className="text-slate-800 font-bold">
                        Entrega estimada en <span className="text-[#00A650]">{shippingDays} {shippingDays === 1 ? 'día hábil' : 'días hábiles'}</span>.
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Servicio express prioritario.</p>
                    </div>
                  )}
                </div>

                {/* Stock Controls */}
                <div className="text-xs text-slate-700">
                  <p className="font-bold text-sm">Disponibilidad</p>
                  <p className="text-slate-400 mt-0.5">({product.stock} unidades disponibles)</p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-slate-500">Unidades:</span>
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="p-2 hover:bg-slate-100 text-slate-500 disabled:opacity-20"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-3.5 font-bold text-sm text-slate-700">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        disabled={quantity >= product.stock}
                        className="p-2 hover:bg-slate-100 text-slate-500 disabled:opacity-20"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#3483FA] hover:bg-[#2c6fd1] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all border-0 cursor-pointer"
                  >
                    Comprar ahora
                  </button>
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={handleAddToCart}
                      className="flex-grow bg-[#E3EDFB] hover:bg-[#d6e5f8] text-[#3483FA] font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      Agregar al carrito
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer hover:scale-102 active:scale-95 ${
                        favorited
                          ? 'bg-red-50/70 border-red-200 text-[#e0245e] hover:bg-red-50'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      aria-label={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
                      title={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                      <Heart size={18} className={favorited ? 'fill-[#e0245e]' : ''} />
                    </button>
                  </div>
                </div>

                {/* Warranties */}
                <div className="flex flex-col gap-3.5 text-[11px] text-slate-400 border-t border-slate-100 pt-4 mt-2">
                  <div className="flex gap-2">
                    <RotateCcw size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-600 font-semibold">Devolución gratis</p>
                      <p className="text-[10px] text-slate-400">Tenés 30 días para arrepentirte.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Shield size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-600 font-semibold">Compra Protegida</p>
                      <p className="text-[10px] text-slate-400">Recibí tu artículo o te devolvemos el dinero.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Seller info */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3.5 shadow-sm text-xs">
                <h3 className="font-bold text-sm text-slate-800">Sobre el vendedor</h3>
                
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-700">{product.sellerName}</p>
                    <p className="text-[10px] text-slate-400">MercadoLíder Platinum</p>
                  </div>
                </div>

                {/* reputation scale */}
                <div className="flex gap-1.5 h-1.5 w-full mt-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="flex-grow bg-red-200"></div>
                  <div className="flex-grow bg-amber-200"></div>
                  <div className="flex-grow bg-yellow-200"></div>
                  <div className="flex-grow bg-emerald-200"></div>
                  <div className="flex-grow bg-[#00A650]"></div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 mt-2">
                  <div className="border-r border-slate-100 last:border-r-0">
                    <p className="text-slate-800 text-xs font-bold font-mono">+{product.reviewsCount * 4}</p>
                    <p className="mt-0.5 leading-snug">Ventas despachadas</p>
                  </div>
                  <div className="border-r border-slate-100 last:border-r-0">
                    <p className="text-slate-800 text-xs font-bold flex items-center justify-center gap-0.5"><MessageSquare size={10} className="text-emerald-600" />Excelente</p>
                    <p className="mt-0.5 leading-snug">Atención y soporte posventa</p>
                  </div>
                  <div>
                    <p className="text-emerald-600 text-xs font-bold">Entrega puntual</p>
                    <p className="mt-0.5 leading-snug">Despachos express sin demoras</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />

      {/* Fullscreen Zoom Gallery Modal */}
      {isGalleryOpen && (() => {
        const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
        return (
          <div className="fixed inset-0 bg-black/90 z-[999] flex flex-col justify-between p-4 sm:p-6 animate-fadeIn animate-duration-200">
            {/* Header */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Galería - {galleryIndex + 1} de {productImages.length}
              </span>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="text-white hover:text-slate-300 font-bold text-xs px-3 py-1.5 bg-white/10 rounded-lg transition-colors cursor-pointer border-0"
              >
                Cerrar (Esc)
              </button>
            </div>

            {/* Body: Slideshow */}
            <div className="flex-grow flex items-center justify-between gap-4 max-w-5xl mx-auto w-full relative">
              {/* Prev Button */}
              <button
                onClick={() => {
                  const nextIdx = (galleryIndex - 1 + productImages.length) % productImages.length;
                  setGalleryIndex(nextIdx);
                  setActiveImage(productImages[nextIdx]);
                }}
                className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none border-0 text-xl"
              >
                &#x276E;
              </button>

              {/* Main Fullscreen Image */}
              <div className="flex-grow h-[65vh] flex items-center justify-center p-4">
                <img
                  src={productImages[galleryIndex]}
                  alt={`gallery-${galleryIndex}`}
                  className="object-contain max-h-full max-w-full rounded-lg shadow-2xl transition-all duration-300 transform scale-100 hover:scale-102"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  const nextIdx = (galleryIndex + 1) % productImages.length;
                  setGalleryIndex(nextIdx);
                  setActiveImage(productImages[nextIdx]);
                }}
                className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none border-0 text-xl"
              >
                &#x276F;
              </button>
            </div>

            {/* Footer: Thumbnails navigation */}
            <div className="flex justify-center gap-2 border-t border-white/10 pt-4 overflow-x-auto max-w-md mx-auto w-full">
              {productImages.map((imgUrl: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setGalleryIndex(idx);
                    setActiveImage(imgUrl);
                  }}
                  className={`h-12 w-12 rounded-lg p-0.5 bg-white overflow-hidden transition-all flex-shrink-0 flex items-center justify-center border-0 cursor-pointer ${
                    galleryIndex === idx ? 'ring-2 ring-[#3483FA]' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={imgUrl} alt="thumb" className="object-contain max-h-full max-w-full" />
                </button>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
