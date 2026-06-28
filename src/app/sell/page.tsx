'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency } from '@/components/ProductCard';
import { 
  PlusCircle, 
  CheckCircle, 
  Image as ImageIcon, 
  Zap, 
  TrendingUp, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  AlertCircle,
  Briefcase,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { Product } from '@/types';

const MOCK_IMAGE_PRESETS = [
  { name: 'Celular', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80' },
  { name: 'Laptop', url: 'https://images.unsplash.com/photo-1496181130204-7552cc145cdb?w=600&auto=format&fit=crop&q=80' },
  { name: 'Auriculares', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Televisor', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80' },
  { name: 'Consola', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80' },
];

const MOCK_SALES_DATA = [
  { day: 'Lun', sales: 250000 },
  { day: 'Mar', sales: 380000 },
  { day: 'Mié', sales: 150000 },
  { day: 'Jue', sales: 420000 },
  { day: 'Vie', sales: 580000 },
  { day: 'Sáb', sales: 650000 },
  { day: 'Dom', sales: 490000 },
];

export default function SellPage() {
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct, isMounted } = useApp();

  const [view, setView] = useState<'dashboard' | 'new' | 'edit'>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Computación');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('5');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(MOCK_IMAGE_PRESETS[1].url);
  const [freeShipping, setFreeShipping] = useState(true);
  const [isFull, setIsFull] = useState(true);

  // Alert feedback state
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <main className="flex-grow pb-16 pt-6">
          <div className="max-w-[1200px] mx-auto px-4 animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col gap-2">
                <div className="h-7 w-48 bg-slate-250 rounded"></div>
                <div className="h-4 w-64 bg-slate-250 rounded"></div>
              </div>
              <div className="h-10 w-44 bg-slate-250 rounded-xl"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl h-24 p-5"></div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl h-[220px] p-6 mb-6"></div>
            <div className="bg-white border border-slate-200 rounded-3xl h-[300px]"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const triggerAlert = (type: 'success' | 'info', text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const startPublishing = () => {
    setTitle('');
    setCategory('Computación');
    setPrice('');
    setStock('5');
    setDescription('');
    setImageUrl(MOCK_IMAGE_PRESETS[1].url);
    setFreeShipping(true);
    setIsFull(true);
    setView('new');
  };

  const startEditing = (p: Product) => {
    setSelectedProduct(p);
    setTitle(p.title);
    setCategory(p.category);
    setPrice(p.price.toString());
    setStock(p.stock.toString());
    setDescription(p.description);
    setImageUrl(p.image);
    setFreeShipping(p.freeShipping);
    setIsFull(p.isFull);
    setView('edit');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar la publicación de "${name}"?`)) {
      deleteProduct(id);
      triggerAlert('info', 'Publicación eliminada correctamente.');
    }
  };

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

    if (view === 'new') {
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
      triggerAlert('success', '¡Producto publicado con éxito!');
    } else if (view === 'edit' && selectedProduct) {
      updateProduct(selectedProduct.id, {
        title,
        category,
        price: priceNum,
        stock: stockNum,
        description,
        image: imageUrl,
        freeShipping,
        isFull,
      });
      triggerAlert('success', 'Publicación actualizada correctamente.');
    }

    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <Navbar />

      <main className="flex-grow pb-16 pt-6">
        <div className="max-w-[1200px] mx-auto px-4">
          
          {/* Notification Alert */}
          {alertMsg && (
            <div className={`border rounded-2xl p-4 flex items-center gap-3 mb-6 shadow-sm animate-fadeIn text-xs font-bold ${
              alertMsg.type === 'success' ? 'bg-[#EBF7EE] border-green-200 text-green-600' : 'bg-blue-50 border-blue-200 text-blue-600'
            }`}>
              <CheckCircle size={20} className="flex-shrink-0" />
              <span>{alertMsg.text}</span>
            </div>
          )}

          {/* DASHBOARD VIEW */}
          {view === 'dashboard' && (
            <div className="flex flex-col gap-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Portal del Vendedor</h1>
                  <p className="text-xs text-slate-400 mt-1">Administra tus publicaciones y monitorea tus métricas de ventas</p>
                </div>
                <button
                  onClick={startPublishing}
                  className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 border-0 cursor-pointer"
                >
                  <PlusCircle size={16} />
                  Publicar nuevo producto
                </button>
              </div>

              {/* Analytics Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Revenue */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ventas Totales (Semana)</span>
                    <p className="text-lg font-extrabold text-slate-800 mt-0.5">{formatCurrency(2920000)}</p>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                      +12.4% vs. anterior
                    </span>
                  </div>
                </div>

                {/* Card 2: Active listings */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#3483FA] flex items-center justify-center flex-shrink-0">
                    <Layers size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Publicaciones Activas</span>
                    <p className="text-lg font-extrabold text-slate-800 mt-0.5">{products.length} productos</p>
                    <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                      Actualizado en tiempo real
                    </span>
                  </div>
                </div>

                {/* Card 3: Simulated Visits */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Visitas Totales</span>
                    <p className="text-lg font-extrabold text-slate-800 mt-0.5">14.280 visitas</p>
                    <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5 mt-0.5">
                      +8.2% de conversión
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic SVG Analytics Chart */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Rendimiento Semanal</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Facturación simulada por día de la semana</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    +15.2% vs. semana anterior
                  </span>
                </div>

                <div className="h-[200px] w-full flex items-end justify-between pt-6 px-4">
                  {MOCK_SALES_DATA.map((item, idx) => {
                    const maxVal = 700000;
                    const pct = (item.sales / maxVal) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 flex-grow group">
                        <div className="relative w-8 sm:w-12 bg-slate-50 rounded-lg h-[140px] flex items-end shadow-inner">
                          {/* Glowing bar on hover */}
                          <div
                            style={{ height: `${pct}%` }}
                            className="w-full bg-[#3483FA]/90 hover:bg-[#3483FA] rounded-md transition-all duration-300 relative group-hover:shadow-[0_0_12px_rgba(52,131,250,0.4)] flex justify-center cursor-pointer"
                          >
                            {/* Tooltip */}
                            <div className="absolute -top-8 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              {formatCurrency(item.sales)}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">{item.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Listings Table */}
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Tus Publicaciones</h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {products.length} productos
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-100">
                        <th className="p-4 pl-6">Producto</th>
                        <th className="p-4">Categoría</th>
                        <th className="p-4">Precio</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Logística</th>
                        <th className="p-4 pr-6 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-lg p-0.5 flex-shrink-0 flex items-center justify-center">
                                <img src={p.image} alt={p.title} className="object-contain max-h-full max-w-full" />
                              </div>
                              <span className="font-bold text-slate-800 line-clamp-1 max-w-[250px]">{p.title}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-500 font-medium">{p.category}</td>
                          <td className="p-4 font-extrabold text-slate-800">{formatCurrency(p.price)}</td>
                          <td className="p-4">
                            <span className={`font-bold ${p.stock <= 2 ? 'text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100' : 'text-slate-650'}`}>
                              {p.stock} u.
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {p.freeShipping && (
                                <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                  Envío Gratis
                                </span>
                              )}
                              {p.isFull && (
                                <span className="bg-blue-50 text-[#3483FA] border border-blue-100 text-[9px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-0.5">
                                  <Zap size={8} className="fill-[#3483FA]" /> Full
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 pr-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => startEditing(p)}
                                className="h-8 w-8 rounded-full bg-slate-50 hover:bg-blue-50 hover:text-[#3483FA] text-slate-450 flex items-center justify-center transition-all cursor-pointer border-0"
                                title="Editar"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id, p.title)}
                                className="h-8 w-8 rounded-full bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-450 flex items-center justify-center transition-all cursor-pointer border-0"
                                title="Eliminar"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* NEW / EDIT PRODUCT FORM VIEW */}
          {(view === 'new' || view === 'edit') && (
            <div>
              {/* Back Button */}
              <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 transition-colors font-bold text-xs uppercase mb-6 bg-transparent border-0 cursor-pointer"
              >
                <ArrowLeft size={14} />
                Volver al Panel
              </button>

              <h1 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-1.5">
                <PlusCircle size={20} className="text-[#3483FA]" />
                {view === 'new' ? 'Publicar nuevo producto' : 'Editar publicación'}
              </h1>

              {/* Form Card */}
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8">
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
                      className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm text-slate-800 font-medium"
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
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm text-slate-700 cursor-pointer font-medium"
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
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm text-slate-800 font-medium"
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
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm text-slate-800 font-medium"
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
                          className={`px-3 py-1.5 border rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
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
                      className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-xs text-slate-600 font-mono mt-2"
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
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm text-slate-800 resize-none font-sans font-medium"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="bg-[#3483FA] hover:bg-[#2c6fd1] text-white text-xs sm:text-sm font-bold py-3.5 rounded-xl shadow-sm transition-all mt-4 border-0 cursor-pointer"
                  >
                    {view === 'new' ? 'Publicar Producto' : 'Guardar Cambios'}
                  </button>

                </form>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
