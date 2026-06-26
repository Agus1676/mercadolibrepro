'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Search, MapPin, ShoppingCart, LogOut, Briefcase, ChevronDown, User, Heart, Mic } from 'lucide-react';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, login, logout, cart, products, favorites, isMounted } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La búsqueda por voz no está soportada por tu navegador. Probá usando Google Chrome o Microsoft Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-AR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const cleaned = transcript.replace(/\.$/, '');
      setSearchQuery(cleaned);
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(cleaned)}`);
    };

    recognition.start();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((p) => p.title)
      .slice(0, 5);
      
    const filteredCats = Array.from(
      new Set(
        products
          .filter((p) => p.category.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((p) => p.category)
      )
    ).slice(0, 2);

    setSuggestions([...filteredCats, ...filtered]);
  }, [searchQuery, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (val: string) => {
    setSearchQuery(val);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(val)}`);
  };

  if (!isMounted) {
    return <div className="h-[100px] bg-[#FFF159]"></div>;
  }

  return (
    <header className="bg-[#FFF159] text-[#333333] border-b border-yellow-400/30 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 py-2.5 flex flex-col gap-2">
        {/* Row 1: Logo, Search, Session buttons */}
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col select-none flex-shrink-0">
            <span className="font-black text-2xl tracking-tighter text-[#1C1C1C] italic leading-none">
              mercado
            </span>
            <span className="font-medium text-xs tracking-widest text-[#002f6c] leading-none uppercase pl-0.5">
              libre <span className="font-bold text-[#3483FA] normal-case tracking-normal">pro</span>
            </span>
          </Link>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-[600px]">
            <div className="relative flex items-center bg-white rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] border border-transparent focus-within:border-gray-200">
              <input
                type="text"
                placeholder={isListening ? "Escuchando... Hablá ahora" : "Buscar productos, marcas y más..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className={`w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none rounded-l-md ${
                  isListening ? 'font-medium text-blue-600 animate-pulse' : ''
                }`}
                disabled={isListening}
              />
              
              {/* Microphone Voice Search Button */}
              <button
                type="button"
                onClick={startVoiceSearch}
                className={`p-2 transition-all rounded-md flex items-center justify-center mr-1 ${
                  isListening
                    ? 'text-red-500 bg-red-50 border border-red-200 animate-pulse scale-105'
                    : 'text-slate-400 hover:text-[#3483FA]'
                }`}
                title="Buscar por voz"
                aria-label="Buscar por voz"
              >
                <Mic size={16} className={isListening ? 'fill-red-500' : ''} />
              </button>

              <button
                type="submit"
                className="p-2.5 border-l border-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Buscar"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
              >
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50 last:border-b-0"
                  >
                    <Search size={12} className="text-gray-400" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Session settings (standard login links) */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
            {user.isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="hidden lg:inline hover:text-gray-900 cursor-pointer">
                  Hola, {user.username}
                </span>
                <button
                  onClick={logout}
                  title="Cerrar sesión"
                  className="flex items-center gap-1 text-gray-500 hover:text-red-500 font-bold transition-colors"
                >
                  <LogOut size={13} />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={login}
                  className="hover:text-gray-900 transition-colors text-blue-600 font-bold hover:underline"
                >
                  Ingresar
                </button>
                <button
                  onClick={login}
                  className="hidden sm:inline text-gray-500 hover:text-gray-900 transition-colors font-medium"
                >
                  Crear tu cuenta
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Location, Links, Cart */}
        <div className="flex items-center justify-between gap-4 mt-0.5 text-xs text-gray-600 font-medium">
          {/* Location Picker */}
          <div className="flex items-center gap-1 hover:text-gray-900 cursor-pointer max-w-[150px] sm:max-w-none">
            <MapPin size={15} className="text-gray-400 flex-shrink-0" />
            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="text-[9px] text-gray-500">Enviar a</span>
              <span className="truncate text-gray-800">Palermo, CABA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-gray-500 font-medium">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Categorías
            </Link>
            <Link href="/search?q=Celulares" className="hover:text-gray-900 transition-colors">
              Celulares
            </Link>
            <Link href="/search?q=Computación" className="hover:text-gray-900 transition-colors">
              Notebooks
            </Link>
            <Link href="/orders" className="hover:text-gray-900 transition-colors">
              Historial / Envíos
            </Link>
            <Link href="/sell" className="hover:text-[#3483FA] transition-colors font-bold text-[#3483FA]">
              Vender
            </Link>
          </nav>

          {/* Cart Icon & Favorites */}
          <div className="flex items-center gap-4 text-gray-500 ml-auto">
            {user.isLoggedIn && (
              <Link href="/orders" className="hover:text-gray-900 transition-colors">
                Mis compras
              </Link>
            )}

            {/* Wishlist Link */}
            <Link
              href="/favorites"
              className="relative p-1 hover:text-[#e0245e] transition-colors"
              title="Mis favoritos"
            >
              <Heart
                size={18}
                className={`transition-colors ${
                  favorites.length > 0 ? 'fill-[#e0245e] text-[#e0245e]' : 'text-gray-700 hover:text-slate-900'
                }`}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#e0245e] text-white text-[9px] font-black rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative p-1 hover:text-gray-950 transition-colors">
              <ShoppingCart size={18} className="text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#3483FA] text-white text-[9px] font-black rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
