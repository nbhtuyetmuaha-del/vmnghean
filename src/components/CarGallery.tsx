'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CarModel } from '@/data/cms';

export default function CarGallery({ data }: { data: CarModel }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data.gallery || data.gallery.length === 0) return null;

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider text-white">Thư viện hình ảnh</h2>
          <div className="w-20 h-1 bg-[var(--color-vw-light)] mx-auto"></div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Ảnh lớn hiển thị chính với hiệu ứng Liquid Glass */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl bg-slate-900/50 backdrop-blur-md">
            {data.gallery.map((img, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 1.1,
                  filter: activeIndex === index ? 'blur(0px)' : 'blur(20px)'
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={img}
                  alt={`${data.name} main gallery image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>
            ))}
            {/* Lớp phủ Gradient mỏng để tăng cảm giác chiều sâu (Glass effect) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent"></div>
          </div>

          {/* Dải ảnh nhỏ (Thumbnails) lựa chọn bên dưới */}
          {data.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-4 pt-4 px-1 custom-scrollbar">
              {data.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-500 ${
                    activeIndex === index 
                      ? 'ring-2 ring-[var(--color-vw-light)] ring-offset-2 ring-offset-slate-900 opacity-100 scale-105 shadow-[0_0_15px_rgba(0,176,240,0.4)]' 
                      : 'opacity-40 hover:opacity-100 saturate-50 hover:saturate-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${data.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {/* Lớp kính mờ cho các ảnh chưa chọn */}
                  {activeIndex !== index && (
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] transition-all duration-500 group-hover:backdrop-blur-0"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
