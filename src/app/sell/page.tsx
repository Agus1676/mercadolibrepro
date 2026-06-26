'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PlusCircle, CheckCircle, Image as ImageIcon, Zap } from 'lucide-react';

const MOCK_IMAGE_PRESETS = [
  { name: 'Celular', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80' },
  { name: 'Laptop', url: 'https://images.unsplash.com/photo-1496181130204-7552cc145cdb?w=600&auto=format&fit=crop&q=80' },
  { name: 'Auriculares', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Televisor', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80' },
  { name: 'Consola', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80' },
];

export default function SellPage() {
  const router = useRouter();
  const { addProduct, isMounted } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Computación');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('5');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(MOCK_IMAGE_PRESETS[1].url); // Default to Laptop
  const [freeShipping, setFreeShipping] = useState(true);
  const [isFull, setIsFull] = useState(true);

  const [published, setPublished] = useState(false);

  if (!isMounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description || !imageUrl) {
      alert('Por favor, completa todos los campos del producto.');
      return;
    }

    const priceNum = Number(price);
    const stockNum = Number(stock);

    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Por favor, ingresa un precio válido mayor a 0.');
      return;
    }

    addProduct({
      title,
      category,
      price: priceNum,
      stock: stockNum,
      description,
      image: imageUrl,
      freeShipping,
      isFull,
      sellerName: 'Mi Tienda Local',
    });

    setPublished(true);

    setTitle('');
    setPrice('');
    setDescription('');
    setFreeShipping(true);
    setIsFull(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[700px] mx-auto px-4">
          <h1 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-1.5">
            <PlusCircle size={20} className="text-[#3483FA]" />
            Publicar producto
          </h1>

          {published && (
            <div className="bg-[#EBF7EE] border border-green-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-sm animate-fade-in text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle size={28} className="text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">¡Tu producto ha sido publicado con éxito!</h4>
                  <p className="text-slate-500 mt-1 leading-relaxed">
                    Ya está disponible en la base de datos local de la tienda. Se integrará inmediatamente a los resultados de búsqueda.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPublished(false)}
                  className="bg-white border border-slate-200 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs transition-colors hover:bg-slate-50"
                >
                  Publicar otro
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm border-0"
                >
                  Ver Catálogo
                </button>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs text-slate-600 font-semibold">
              
              {/* Product Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 font-bold">Título de la publicación</label>
                <input
                  type="text"
                  placeholder="Ej: Teclado Mecánico Custom 60% Redragon"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-800"
                />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 font-bold">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-700 cursor-pointer"
                  >
                    <option value="Celulares" className="bg-white">Celulares</option>
                    <option value="Computación" className="bg-white">Computación</option>
                    <option value="Televisores" className="bg-white">Televisores</option>
                    <option value="Audio" className="bg-white">Audio</option>
                    <option value="Consolas" className="bg-white">Consolas</option>
                  </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 font-bold">Precio (ARS)</label>
                  <input
                    type="number"
                    placeholder="Ej: 180000"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-800"
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 font-bold">Stock disponible</label>
                  <input
                    type="number"
                    placeholder="Ej: 5"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-800"
                  />
                </div>

              </div>

              {/* Image Picker */}
              <div className="flex flex-col gap-2.5 border-t border-b border-slate-100 py-4">
                <label className="text-slate-700 font-bold flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-slate-400" />
                  Imagen del producto
                </label>
                <p className="text-slate-400 text-[10px] font-normal">Seleccioná un preset de imágenes listas para testear o agregá una URL personalizada:</p>
                
                {/* Presets list */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {MOCK_IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`px-3 py-1.5 border rounded-lg text-[11px] font-bold transition-all ${
                        imageUrl === preset.url
                          ? 'border-[#3483FA] bg-blue-50 text-[#3483FA] shadow-sm'
                          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-xs text-slate-600 font-mono mt-2"
                />
              </div>

              {/* Shipping settings */}
              <div className="flex flex-col sm:flex-row gap-5 py-2 text-xs">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={freeShipping}
                    onChange={(e) => setFreeShipping(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-800">Ofrecer Envío Gratis</span>
                    <p className="text-[10px] text-slate-400 font-normal">El producto tendrá el beneficio de envío gratuito.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-5">
                  <input
                    type="checkbox"
                    checked={isFull}
                    onChange={(e) => setIsFull(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-800 flex items-center gap-0.5">
                      Despacho <span className="text-[#00A650] flex items-center font-black uppercase italic tracking-tighter"><Zap size={10} className="fill-[#00A650]" />Full</span>
                    </span>
                    <p className="text-[10px] text-slate-400 font-normal">Despacho logístico inmediato desde depósito.</p>
                  </div>
                </label>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-4">
                <label className="text-slate-700 font-bold">Descripción detallada</label>
                <textarea
                  placeholder="Especificá las características, dimensiones, especificaciones técnicas y detalles del producto."
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm text-slate-800 resize-none font-sans"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white text-xs sm:text-sm font-bold py-3.5 rounded-xl shadow-sm transition-all mt-4 border-0"
              >
                Publicar Producto
              </button>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
