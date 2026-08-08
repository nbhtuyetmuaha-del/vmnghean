import { client } from '@/sanity/lib/client';
import { safeUrlFor } from '@/sanity/lib/image';
import DirectoryClient from './DirectoryClient';

export const revalidate = 60;

export default async function DirectoryPage() {
  // Lấy tất cả mẫu xe từ Sanity bao gồm trường category
  let carsRaw = [];
  try {
    carsRaw = await client.fetch(`*[_type == "carModel"]{
      name,
      slug,
      category,
      heroImage,
      startingPrice
    }`);
  } catch (e) {
    console.error('Lỗi fetch Sanity DirectoryPage:', e);
  }

  // Chuyển đổi heroImage từ Object của Sanity sang URL string chuẩn an toàn
  const cars = Array.isArray(carsRaw) ? carsRaw.map((car: any) => ({
    ...car,
    heroImage: safeUrlFor(car.heroImage, '')
  })) : [];

  return <DirectoryClient cars={cars} />;
}
