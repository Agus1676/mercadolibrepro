'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-500 text-xs py-10 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-500">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Trabajá con nosotros</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Términos y condiciones</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Cómo cuidamos tu privacidad</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Accesibilidad</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Información sobre seguros</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Ayuda</span>
        </div>
        <div className="text-center md:text-right">
          <p className="font-bold text-slate-400">MercadoLibre Pro</p>
          <p className="mt-1 text-slate-500">
            Desarrollado por <span className="font-bold text-white hover:text-[#3483FA] transition-colors duration-200 cursor-pointer">Agustin Pollan.</span>
          </p>
          <p className="text-[10px] text-slate-600 italic mt-0.5">
            Proyecto de demostración de alta fidelidad para portafolio personal.
          </p>
        </div>
      </div>
    </footer>
  );
};
