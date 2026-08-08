'use client';

import { CarModel } from '@/data/cms';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function VariantPricing({ data }: { data: CarModel }) {
  return (
    <section id="pricing" className="py-20 relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider">Phiên bản & Bảng giá</h2>
          <div className="w-20 h-1 bg-[var(--color-vw-light)] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.variants.map((variant, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              key={index} 
              className={`rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] ${index === data.variants.length - 1 ? 'border-[var(--color-vw-light)]/50 bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,176,240,0.15)]' : 'border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]'} relative overflow-hidden`}
            >
              {index === data.variants.length - 1 && (
                <div className="absolute top-0 right-0 bg-[var(--color-vw-light)] text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg uppercase tracking-wider shadow-[0_0_15px_rgba(0,176,240,0.5)]">
                  Phiên bản cao cấp
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">{variant.name}</h3>
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-vw-light)] mb-8">
                {variant.price ? variant.price : 'LIÊN HỆ'}
              </div>
              
              <div className="space-y-4 mb-10">
                {variant.highlights && variant.highlights.length > 0 ? (
                  // Nếu Admin có nhập thông tin riêng, hiển thị thông tin đó
                  variant.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[var(--color-vw-light)] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{highlight}</span>
                    </div>
                  ))
                ) : (
                  // Nếu không có thông tin riêng, hiển thị thông tin chung mặc định
                  <>
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-[var(--color-vw-light)] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">Động cơ: <strong className="text-white">{data.specs.engine}</strong> - <strong className="text-white">{data.specs.power}</strong></span>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-[var(--color-vw-light)] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">Hộp số: <strong className="text-white">{data.specs.gearbox}</strong></span>
                    </div>
                    <div className="my-4 border-t border-slate-800"></div>
                    {data.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-400">{feature.title}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <Link href={`?modal=contact&intent=Tư vấn bản ${variant.name} - ${data.name}`} scroll={false} className={`block text-center w-full py-4 rounded-xl font-semibold uppercase tracking-widest transition-all duration-300 active:scale-95 ${index === data.variants.length - 1 ? 'bg-[var(--color-vw-light)] hover:bg-blue-400 text-white shadow-[0_4px_20px_rgba(0,176,240,0.4)]' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.2)]'}`}>
                Tư vấn phiên bản này
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
