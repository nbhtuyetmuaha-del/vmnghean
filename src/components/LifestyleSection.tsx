'use client';

import { motion } from 'framer-motion';
import { CarModel } from '@/data/cms';
import Image from 'next/image';

export default function LifestyleSection({ data }: { data: CarModel }) {
  // Trích xuất hình ảnh đầu tiên trong Gallery làm ảnh nền phụ (hoặc dùng heroImage nếu gallery trống)
  const lifestyleImage = data.gallery && data.gallery.length > 0 ? data.gallery[0] : data.heroImage;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
      {/* Hình nền mờ ảo phía sau để tạo chiều sâu */}
      <div className="absolute inset-0 z-0">
        <Image
          src={lifestyleImage}
          alt="Lifestyle Background"
          fill
          className="object-cover opacity-20 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-light text-slate-300 mb-6 tracking-wide">
            Kiệt tác vượt thời gian
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest mb-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Đẳng cấp không giới hạn
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--color-vw-light)] to-transparent mx-auto mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 font-light leading-relaxed px-4 md:px-12"
        >
          {data.name} không chỉ là một chiếc xe, đó là bản tuyên ngôn của sự thành đạt. 
          Sự hòa quyện hoàn hảo giữa nghệ thuật chế tác thủ công tinh xảo và công nghệ kỹ thuật số tương lai. 
          Mọi giác quan của bạn sẽ được đánh thức ngay từ khoảnh khắc chạm tay vào vô lăng.
        </motion.p>
      </div>
    </section>
  );
}
