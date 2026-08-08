'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ChevronRight, ShieldCheck, Clock, Medal, Layers, CarFront } from 'lucide-react';
import { landingPageData } from '@/data/cms';

interface Car {
  name: string;
  slug?: { current?: string };
  category?: string;
  heroImage: string;
  startingPrice: string;
}

export default function DirectoryClient({ cars }: { cars: Car[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Hàm suy luận thông minh loại xe từ tên xe nếu CMS chưa nhập trường category
  const getCarCategory = (car: Car): string => {
    if (car.category && car.category.trim() !== '') {
      return car.category.trim();
    }
    const name = car.name.toLowerCase();
    if (name.includes('viloran') || name.includes('sharan') || name.includes('multivan')) return 'MPV & Đa Dụng';
    if (name.includes('passat') || name.includes('virtus') || name.includes('jetta') || name.includes('arteon')) return 'Sedan Đẳng Cấp';
    if (name.includes('polo') || name.includes('golf')) return 'Hatchback & Thể Thao';
    return 'SUV Luxury'; // Mặc định cho Teramont, Touareg, Tiguan, T-Cross
  };

  // Trích xuất TẤT CẢ các phân loại DUY NHẤT từ dữ liệu xe thực tế
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    cars.forEach(car => {
      set.add(getCarCategory(car));
    });
    return Array.from(set);
  }, [cars]);

  // Lọc danh sách xe theo Tab được chọn
  const filteredCars = useMemo(() => {
    if (selectedCategory === 'all') return cars;
    return cars.filter((car) => getCarCategory(car) === selectedCategory);
  }, [cars, selectedCategory]);

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-[var(--color-vw-light)] selection:text-white">
      {/* Background Blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-vw-light)]/10 blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={landingPageData.carModel.heroImage} 
            alt="Showroom" 
            fill 
            className="object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider mb-4 text-white drop-shadow-2xl whitespace-nowrap">
              {landingPageData.dealership.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-wide mb-8">
              Tuyệt Tác Công Nghệ Đức - Xứng Tầm Phong Cách Sống
            </p>
            <div className="w-24 h-1 bg-[var(--color-vw-light)] mx-auto shadow-[0_0_15px_rgba(0,176,240,0.5)]"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Showroom Content */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-24">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Phân Loại Tùy Chỉnh
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest leading-relaxed">
              Bộ Sưu Tập <span className="text-[var(--color-vw-light)]">Đẳng Cấp</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Khám phá các dòng sản phẩm đại diện cho đỉnh cao chế tác công nghệ Đức của Volkswagen.
          </p>
        </div>

        {/* Dynamic Category Filter Tabs (Tự động sinh theo phân loại trên Sanity CMS) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none no-scrollbar">
          {/* Tab Tất Cả */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-2 border ${
              selectedCategory === 'all'
                ? 'bg-[var(--color-vw-light)] text-white border-[var(--color-vw-light)] shadow-[0_0_20px_rgba(0,176,240,0.4)] scale-105'
                : 'bg-slate-900/60 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CarFront className="w-4 h-4" />
            Tất Cả Dòng Xe
          </button>

          {/* Các Tab Động sinh ra từ Sanity */}
          {categoriesList.map((catName) => {
            const isActive = selectedCategory === catName;
            return (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap border ${
                  isActive
                    ? 'bg-[var(--color-vw-light)] text-white border-[var(--color-vw-light)] shadow-[0_0_20px_rgba(0,176,240,0.4)] scale-105'
                    : 'bg-slate-900/60 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Showroom Grid */}
        {filteredCars.length > 0 ? (
          <motion.div 
            key={selectedCategory}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCars.map((car, index) => {
              // Xử lý link thông minh
              const fallbackSlug = car.name.toLowerCase().replace(/\s+/g, '-');
              const carUrl = car.slug?.current ? `/${car.slug.current}` : `/${fallbackSlug}`;
              const carCategoryLabel = getCarCategory(car);
              
              return (
                <motion.div variants={item} key={car.name + index} layout>
                  <Link href={carUrl} className="group block relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,176,240,0.15)] hover:border-[var(--color-vw-light)]/40 h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden shrink-0">
                      <Image 
                        src={car.heroImage || landingPageData.carModel.heroImage} 
                        alt={car.name} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      {/* Lớp phủ sáng lên khi hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                      
                      {/* Tag Phân Loại Dòng Xe Tùy Chỉnh */}
                      <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-white/15 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {carCategoryLabel}
                      </div>

                      {/* Nút Khám phá ngay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                        <span className="px-6 py-3 bg-[var(--color-vw-light)] text-white rounded-full font-semibold uppercase tracking-wider text-sm flex items-center shadow-[0_0_20px_rgba(0,176,240,0.6)]">
                          Khám phá ngay <ChevronRight className="w-4 h-4 ml-2" />
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col justify-end relative z-10 border-t border-slate-800/50 group-hover:bg-slate-800/30 transition-colors">
                      <h3 className="text-2xl font-bold uppercase tracking-wide mb-2 text-white group-hover:text-[var(--color-vw-light)] transition-colors">{car.name}</h3>
                      <p className="text-slate-400 font-medium">Từ <span className="text-white text-lg font-bold">{car.startingPrice || 'Liên hệ'}</span></p>
                    </div>
                    
                    {/* Line chạy hiệu ứng */}
                    <div className="absolute bottom-0 left-0 h-1 bg-[var(--color-vw-light)] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-slate-900/30 border border-slate-800 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Đang cập nhật sản phẩm</h3>
            <p className="text-slate-400 max-w-md mx-auto text-sm">Chưa có mẫu xe nào thuộc phân loại "{selectedCategory}". Vui lòng chọn phân loại khác hoặc truy cập Sanity CMS để nhập tên phân loại này.</p>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-blue-900/30 text-[var(--color-vw-light)] flex items-center justify-center mx-auto mb-6 border border-blue-900/50">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold uppercase mb-3 text-white">Bảo Hành Chính Hãng</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Yên tâm tuyệt đối với chính sách bảo hành toàn cầu, xe luôn trong trạng thái hoàn hảo nhất.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-blue-900/30 text-[var(--color-vw-light)] flex items-center justify-center mx-auto mb-6 border border-blue-900/50">
              <Medal className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold uppercase mb-3 text-white">Dịch Vụ Hạng Sang</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Phòng chờ thương gia, giao xe tận nhà và những đặc quyền chỉ dành riêng cho chủ nhân VW.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-blue-900/30 text-[var(--color-vw-light)] flex items-center justify-center mx-auto mb-6 border border-blue-900/50">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold uppercase mb-3 text-white">Hỗ Trợ 24/7</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Đội ngũ chuyên viên và cứu hộ túc trực sẵn sàng xử lý mọi tình huống bất kể ngày đêm.</p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-slate-900 text-slate-400 text-center py-8 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} {landingPageData.dealership.name}. Tinh hoa chế tác Đức.</p>
      </footer>
    </div>
  );
}
