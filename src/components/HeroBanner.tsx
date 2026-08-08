import Image from 'next/image';
import Link from 'next/link';
import { CarModel } from '@/data/cms';

export default function HeroBanner({ data }: { data: CarModel }) {
  return (
    <section className="w-full flex flex-col items-center">
      {/* 1. Phần Ảnh (Hiển thị trọn vẹn không bị che khuất) */}
      <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh]">
        <Image
          src={data.heroImage}
          alt={data.name}
          fill
          priority
          className="object-cover object-bottom"
        />
        {/* Gradient mờ nhẹ ở đáy ảnh để ăn khớp với nền web */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </div>

      {/* 2. Phần Thông Tin (Nằm dưới ảnh) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 uppercase tracking-wider drop-shadow-lg">
          {data.name}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light tracking-wide">
          {data.slogan}
        </p>
        
        {/* Bảng Giá Liquid Glass */}
        <div className="inline-block bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-12 py-6 mb-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/10 hover:-translate-y-1">
          <span className="text-sm text-gray-400 uppercase tracking-widest block mb-2 font-medium">Giá từ</span>
          <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {data.startingPrice ? data.startingPrice : 'LIÊN HỆ'}
          </span>
        </div>

        {/* Nút bấm */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href={`?modal=contact&intent=Nhận báo giá lăn bánh - ${data.name}`} scroll={false} className="relative group overflow-hidden bg-[var(--color-vw-blue)]/80 backdrop-blur-md border border-blue-400/30 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,176,240,0.5)] active:scale-95 uppercase tracking-widest text-sm inline-block text-center">
            <span className="relative z-10">Nhận báo giá lăn bánh</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </Link>
          <Link href={`?modal=contact&intent=Đăng ký lái thử - ${data.name}`} scroll={false} className="bg-white/5 backdrop-blur-md hover:bg-white/15 active:scale-95 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 border border-white/20 uppercase tracking-widest text-sm inline-block text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
            Đăng ký lái thử
          </Link>
        </div>
      </div>
    </section>
  );
}
