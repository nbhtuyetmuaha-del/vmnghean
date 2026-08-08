'use client';

import Image from 'next/image';
import { Consultant } from '@/data/cms';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { landingPageData } from '@/data/cms';
import { motion } from 'framer-motion';

export default function ConsultantContact({ data }: { data: Consultant }) {
  const dealership = landingPageData.dealership;
  
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
        >
          {/* Subtle glow behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent pointer-events-none"></div>
          
          {/* Avatar Area */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
            <Image
              src={data.avatar}
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info Area */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{data.name}</h2>
            <p className="text-[var(--color-vw-light)] font-semibold uppercase tracking-wider mb-6">{data.title}</p>
            
            <p className="text-slate-300 text-lg italic mb-8 border-l-4 border-[var(--color-vw-light)] pl-4">
              "Tận tâm từ tư vấn đến đồng hành sau bán hàng. Không chỉ bán một chiếc xe, tôi đồng hành cùng bạn trên mọi hành trình."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <a 
                href={`tel:${data.phone.replace(/\D/g,'')}`}
                className="flex items-center justify-center gap-2 bg-[var(--color-vw-blue)] hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(0,176,240,0.4)] active:scale-95"
              >
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
              {data.zaloUrl && (
                <a 
                  href={data.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all duration-300 backdrop-blur-md active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat Zalo
                </a>
              )}
            </div>
            
            <div className="flex items-center justify-center md:justify-start text-slate-300 text-sm">
              <MapPin className="w-5 h-5 mr-2 shrink-0" />
              <span><strong>{dealership.name}</strong> - {dealership.address}</span>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
