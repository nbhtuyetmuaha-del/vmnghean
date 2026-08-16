'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactToTelegram } from '@/app/actions/sendTelegram';

import { Consultant } from '@/data/cms';
import Image from 'next/image';

interface ContactModalProps {
  consultant: Consultant;
  carSlug: string;
}

export default function ContactModal({ consultant, carSlug }: ContactModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  // Check URL params to open/close modal
  useEffect(() => {
    if (searchParams.has('modal') && searchParams.get('modal') === 'contact') {
      setIsOpen(true);
      // Disable background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [searchParams]);

  const closeModal = () => {
    // Remove the ?modal=contact param from URL without reloading
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('modal');
    // Keep any other search params if they exist
    router.replace(newUrl.pathname + newUrl.search, { scroll: false });
    
    // Reset state after animation
    setTimeout(() => {
      setResult(null);
      setIsSubmitting(false);
    }, 300);
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setResult(null);

    // Call Server Action
    const res = await sendContactToTelegram(formData);
    
    setResult(res);
    setIsSubmitting(false);

    if (res.success) {
      // Bắn sự kiện Facebook Pixel Lead nếu có Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      // Bắn sự kiện Google Tag Manager / GA4 Lead
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          form_name: 'Lead Consultation Form'
        });
      }

      // Tự động đóng sau 3 giây nếu thành công
      setTimeout(() => {
        closeModal();
      }, 3000);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Nhận Tư Vấn</h3>
        <p className="text-slate-400 mb-6 text-sm">
          Vui lòng để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
        </p>

        {/* Thông tin Sale */}
        <div className="flex items-center gap-4 p-4 mb-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-600 shrink-0">
            <Image 
              src={consultant.avatar} 
              alt={consultant.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-white font-bold">{consultant.name}</div>
            <div className="text-[var(--color-vw-light)] text-xs font-semibold uppercase tracking-wider">{consultant.title}</div>
          </div>
        </div>

        {result?.success ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Đăng ký thành công!</h4>
            <p className="text-slate-400">{result.message}</p>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            {/* Hidden fields */}
            <input type="hidden" name="variant" value={searchParams.get('intent') || 'Yêu cầu từ Website'} />
            <input type="hidden" name="carSlug" value={carSlug} />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                Họ và Tên <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                placeholder="Nhập họ tên của bạn"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-vw-light)] transition-all placeholder:text-slate-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">
                Số điện thoại <span className="text-red-400">*</span>
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                required
                placeholder="0912 345 678"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-vw-light)] transition-all placeholder:text-slate-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-1">
                Địa chỉ (Không bắt buộc)
              </label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                placeholder="Nhập quận/huyện, tỉnh/thành phố"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-vw-light)] transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Error Message */}
            {result && !result.success && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{result.message}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 mt-2 rounded-lg font-semibold uppercase tracking-widest text-white transition-all duration-200 bg-[var(--color-vw-light)] hover:bg-blue-500 active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Đang Gửi...
                </>
              ) : (
                'Gửi Yêu Cầu'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
