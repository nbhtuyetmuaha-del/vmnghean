import HeroBanner from '@/components/HeroBanner';
import LifestyleSection from '@/components/LifestyleSection';
import VariantPricing from '@/components/VariantPricing';
import CarGallery from '@/components/CarGallery';
import ConsultantContact from '@/components/ConsultantContact';
import ContactModal from '@/components/ContactModal';
import Tracking from '@/components/Tracking';
import { Suspense } from 'react';
import { landingPageData } from '@/data/cms';
import { client } from '@/sanity/lib/client';
import { safeUrlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Tự động cập nhật web sau 60 giây khi có thay đổi

export default async function CarLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Lấy dữ liệu xe dựa trên slug với tham số hoá an toàn
  const carQuery = `*[_type == "carModel" && (slug.current == $slug || name == $slug)][0]{
    ...,
    consultant->
  }`;
  let sanityCar = await client.fetch(carQuery, { slug });

  // Fallback: Nếu không tìm thấy bằng slug, tìm bằng tên xe đã được format slug
  if (!sanityCar) {
    try {
      const allCars = await client.fetch(`*[_type == "carModel"]{..., consultant->}`);
      if (Array.isArray(allCars)) {
        sanityCar = allCars.find((c: any) => c && c.name && c.name.toLowerCase().replace(/\s+/g, '-') === slug);
      }
    } catch (e) {
      console.error('Lỗi khi fetch fallback allCars:', e);
    }
  }

  if (!sanityCar && process.env.NODE_ENV === 'production') {
    // Nếu trong production hoàn toàn không tìm thấy mẫu xe này
    notFound();
  }

  // Kết hợp dữ liệu an toàn 100%: Ưu tiên dữ liệu từ Sanity, bọc fallback chống crash server
  const carModel = sanityCar ? {
    name: sanityCar.name || landingPageData.carModel.name,
    slogan: sanityCar.slogan || landingPageData.carModel.slogan,
    heroImage: safeUrlFor(sanityCar.heroImage, landingPageData.carModel.heroImage),
    startingPrice: sanityCar.startingPrice ?? '',
    features: (sanityCar.features && Array.isArray(sanityCar.features) && sanityCar.features.length > 0) 
      ? sanityCar.features 
      : landingPageData.carModel.features,
    variants: (sanityCar.variants && Array.isArray(sanityCar.variants) && sanityCar.variants.length > 0) 
      ? sanityCar.variants 
      : landingPageData.carModel.variants,
    specs: {
      engine: sanityCar.specs?.engine || landingPageData.carModel.specs.engine,
      power: sanityCar.specs?.power || landingPageData.carModel.specs.power,
      gearbox: sanityCar.specs?.gearbox || landingPageData.carModel.specs.gearbox,
    },
    gallery: (sanityCar.gallery && Array.isArray(sanityCar.gallery) && sanityCar.gallery.length > 0) 
      ? sanityCar.gallery.map((img: any) => safeUrlFor(img, landingPageData.carModel.heroImage))
      : landingPageData.carModel.gallery
  } : landingPageData.carModel;

  const sanityConsultant = sanityCar?.consultant;
  
  const consultant = sanityConsultant ? {
    name: sanityConsultant.name || landingPageData.consultant.name,
    title: sanityConsultant.title || landingPageData.consultant.title,
    phone: sanityConsultant.phone || landingPageData.consultant.phone,
    zaloUrl: sanityConsultant.zaloUrl || landingPageData.consultant.zaloUrl,
    avatar: safeUrlFor(sanityConsultant.avatar, landingPageData.consultant.avatar)
  } : landingPageData.consultant;

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-[var(--color-vw-light)] selection:text-white relative overflow-hidden">
      {/* Tracking riêng cho xe này */}
      <Tracking fbPixelId={sanityCar?.fbPixelId} gtmId={sanityCar?.gtmId} />

      {/* Liquid ambient blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-vw-light)]/10 blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <HeroBanner data={carModel} />
        <LifestyleSection data={carModel} />
        <VariantPricing data={carModel} />
        {carModel.gallery && carModel.gallery.length > 0 && <CarGallery data={carModel} />}
        <ConsultantContact data={consultant} />
      </div>

      <footer className="relative z-10 bg-white/5 backdrop-blur-md text-slate-400 text-center py-8 text-sm border-t border-white/10">
        <p>© {new Date().getFullYear()} {landingPageData.dealership.name}. Đẳng cấp Đức - Giá trị bền vững.</p>
      </footer>

      <Suspense fallback={null}>
        {/* Truyền thêm carSlug vào ContactModal để server action biết gửi vào group nào */}
        <ContactModal consultant={consultant} carSlug={slug} />
      </Suspense>
    </main>
  );
}
