'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ChevronLeft, ChevronRight, Zap, Shield, CreditCard, Award, Sparkles, Smartphone, Laptop, Tv, Disc, Headphones } from 'lucide-react';
import Link from 'next/link';

const BANNERS = [
  {
    id: 1,
    title: 'Tecnología a tu alcance',
    subtitle: 'Lanzamiento del iPhone 15 Pro Max con cuotas sin interés y envíos gratis express.',
    bg: 'from-[#0F172A] to-[#1E293B]',
    btnText: 'Ver celulares',
    link: '/search?q=Celulares',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Edición Custom ModKey',
    subtitle: 'Descubrí la acústica HANDMADE de nuestros teclados mecánicos premium.',
    bg: 'from-[#3B0764] to-[#581C87]',
    btnText: 'Explorar teclados',
    link: '/product/prod-6',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'El mejor rendimiento Gaming',
    subtitle: 'Notebooks ROG Zephyrus y consolas de última generación con despacho Full.',
    bg: 'from-[#7F1D1D] to-[#991B1B]',
    btnText: 'Ver consolas',
    link: '/search?q=Consolas',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80'
  }
];

export default function Home() {
  const { products, user, login, isMounted } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  if (!isMounted) return null;

  const discountProducts = products.filter((p) => p.discount && p.discount > 0).slice(0, 4);
  const fullProducts = products.filter((p) => p.isFull).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow pb-16">
        
        {/* Banner Slider */}
        <section className="relative w-full h-[250px] md:h-[350px] overflow-hidden bg-slate-900 border-b border-slate-200/20">
          {BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full bg-gradient-to-r ${
                banner.bg
              } transition-opacity duration-1000 flex items-center justify-between px-6 md:px-20 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Text info */}
              <div className="text-white max-w-[55%] flex flex-col gap-2 md:gap-4 select-none">
                <span className="bg-yellow-400 text-gray-950 text-[10px] md:text-xs font-black uppercase px-2.5 py-0.5 rounded w-max tracking-wide">
                  Envíos Gratis
                </span>
                <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-tight">
                  {banner.title}
                </h1>
                <p className="text-xs md:text-base text-gray-200 hidden sm:block font-medium">
                  {banner.subtitle}
                </p>
                <Link
                  href={banner.link}
                  className="bg-white hover:bg-slate-50 text-slate-900 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-md w-max mt-2 transition-all"
                >
                  {banner.btnText}
                </Link>
              </div>

              {/* Product Photo */}
              <div className="relative h-[80%] w-[38%] flex items-center justify-center">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="object-contain h-full max-w-full rounded-2xl shadow-xl transform hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          ))}

          {/* Carousel Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2.5 rounded-full z-20 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2.5 rounded-full z-20 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </section>

        <div className="max-w-[1200px] mx-auto px-4 mt-8 flex flex-col gap-10">
          
          {/* Quick Info Alerts / Welcome banner */}
          {!user.isLoggedIn && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3.5">
                <div className="bg-blue-50 p-2.5 rounded-xl text-[#3483FA] border border-blue-100">
                  <Sparkles size={18} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">¡Te damos la bienvenida a MercadoLibre Pro!</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Para probar los flujos interactivos de compra, simular envíos y ver tu historial de compras, ingresá a tu cuenta.
                  </p>
                </div>
              </div>
              <button
                onClick={login}
                className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm transition-colors border-0"
              >
                Ingresar a mi cuenta
              </button>
            </div>
          )}

          {/* Highlights benefits */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-3.5">
              <div className="bg-blue-50 p-2.5 rounded-xl text-[#3483FA]">
                <CreditCard size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Cuotas sin interés</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Hasta 6 cuotas bancarias</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 border-l border-slate-100 pl-4">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                <Zap size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Envíos express</p>
                <p className="text-[10px] text-slate-400 mt-0.5">En el día por Mercado Envíos</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 border-l border-slate-100 pl-4">
              <div className="bg-blue-50 p-2.5 rounded-xl text-[#3483FA]">
                <Shield size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Compra Protegida</p>
                <p className="text-[10px] text-slate-400 mt-0.5">30 días de garantía oficial</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 border-l border-slate-100 pl-4">
              <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
                <Award size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Garantía oficial</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Respaldo directo de marcas</p>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest">Categorías principales</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <Link
                href="/search?q=Celulares"
                className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="p-3 bg-slate-50 text-[#3483FA] rounded-xl group-hover:scale-105 transition-transform border border-slate-100">
                  <Smartphone size={20} />
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-[#3483FA] transition-colors">Celulares</span>
              </Link>
              <Link
                href="/search?q=Computación"
                className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="p-3 bg-slate-50 text-purple-600 rounded-xl group-hover:scale-105 transition-transform border border-slate-100">
                  <Laptop size={20} />
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-[#3483FA] transition-colors">Computación</span>
              </Link>
              <Link
                href="/search?q=Televisores"
                className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="p-3 bg-slate-50 text-red-600 rounded-xl group-hover:scale-105 transition-transform border border-slate-100">
                  <Tv size={20} />
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-[#3483FA] transition-colors">Televisores</span>
              </Link>
              <Link
                href="/search?q=Audio"
                className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="p-3 bg-slate-50 text-emerald-600 rounded-xl group-hover:scale-105 transition-transform border border-slate-100">
                  <Headphones size={20} />
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-[#3483FA] transition-colors">Audio</span>
              </Link>
              <Link
                href="/search?q=Consolas"
                className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="p-3 bg-slate-50 text-indigo-600 rounded-xl group-hover:scale-105 transition-transform border border-slate-100">
                  <Disc size={20} />
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-[#3483FA] transition-colors">Consolas</span>
              </Link>
            </div>
          </section>

          {/* Section: Discounts */}
          {discountProducts.length > 0 && (
            <section className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-black text-slate-800 tracking-tight">Ofertas imperdibles</h2>
                <Link href="/search?q=" className="text-xs text-[#3483FA] hover:underline font-bold">
                  Ver todas
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {discountProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Section: FULL envios */}
          {fullProducts.length > 0 && (
            <section className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                  Despachados con Envío <span className="text-[#00A650] flex items-center font-black uppercase italic text-base"><Zap size={11} className="fill-[#00A650]" />Full</span>
                </h2>
                <Link href="/search?q=" className="text-xs text-[#3483FA] hover:underline font-bold">
                  Ver productos Full
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {fullProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Section: General Catalog */}
          <section className="flex flex-col gap-4 font-semibold">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">Descubrí tu próximo producto</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
